-- Create community_subscriptions table to track subscriptions to communities
CREATE TABLE IF NOT EXISTS community_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active',
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

-- Add realtime support for community_subscriptions
alter publication supabase_realtime add table community_subscriptions;

-- Create revenue_payouts table to track payouts to community creators
CREATE TABLE IF NOT EXISTS revenue_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  net_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payout_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add realtime support for revenue_payouts
alter publication supabase_realtime add table revenue_payouts;

-- Create revenue_transactions table to track individual revenue transactions
CREATE TABLE IF NOT EXISTS revenue_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES community_subscriptions(id) ON DELETE SET NULL,
  payout_id UUID REFERENCES revenue_payouts(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  net_amount DECIMAL(10, 2) NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add realtime support for revenue_transactions
alter publication supabase_realtime add table revenue_transactions;

-- Add revenue_share_percentage column to communities table
ALTER TABLE communities ADD COLUMN IF NOT EXISTS revenue_share_percentage DECIMAL(5, 2) DEFAULT 98.00;

-- Create function to automatically create community_subscriptions when a user joins a paid community
CREATE OR REPLACE FUNCTION create_community_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create subscription for paid communities
  IF EXISTS (SELECT 1 FROM communities WHERE id = NEW.community_id AND price > 0) THEN
    INSERT INTO community_subscriptions (
      community_id,
      user_id,
      status,
      amount,
      start_date
    ) VALUES (
      NEW.community_id,
      NEW.user_id,
      'active',
      (SELECT price FROM communities WHERE id = NEW.community_id),
      NOW()
    ) ON CONFLICT (community_id, user_id) DO UPDATE
    SET status = 'active',
        updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create community_subscriptions
DROP TRIGGER IF EXISTS create_community_subscription_trigger ON community_members;
CREATE TRIGGER create_community_subscription_trigger
AFTER INSERT ON community_members
FOR EACH ROW
EXECUTE FUNCTION create_community_subscription();

-- Create function to automatically create revenue_transactions when a subscription is created
CREATE OR REPLACE FUNCTION create_revenue_transaction()
RETURNS TRIGGER AS $$
DECLARE
  v_platform_fee DECIMAL(10, 2);
  v_net_amount DECIMAL(10, 2);
  v_revenue_share DECIMAL(5, 2);
BEGIN
  -- Get the revenue share percentage for this community
  SELECT COALESCE(revenue_share_percentage, 98.00) INTO v_revenue_share
  FROM communities
  WHERE id = NEW.community_id;
  
  -- Calculate platform fee (100% - revenue_share%)
  v_platform_fee := NEW.amount * ((100 - v_revenue_share) / 100);
  v_net_amount := NEW.amount - v_platform_fee;
  
  -- Create revenue transaction
  INSERT INTO revenue_transactions (
    community_id,
    subscription_id,
    amount,
    platform_fee,
    net_amount,
    transaction_date
  ) VALUES (
    NEW.community_id,
    NEW.id,
    NEW.amount,
    v_platform_fee,
    v_net_amount,
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create revenue_transactions
DROP TRIGGER IF EXISTS create_revenue_transaction_trigger ON community_subscriptions;
CREATE TRIGGER create_revenue_transaction_trigger
AFTER INSERT ON community_subscriptions
FOR EACH ROW
EXECUTE FUNCTION create_revenue_transaction();
