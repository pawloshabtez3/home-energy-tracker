-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create energy_readings table
CREATE TABLE energy_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('electricity', 'gas', 'water')),
  usage NUMERIC(10, 2) NOT NULL CHECK (usage >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX idx_energy_readings_user_date ON energy_readings(user_id, date DESC);
CREATE INDEX idx_energy_readings_user_type ON energy_readings(user_id, type);

-- Enable Row Level Security
ALTER TABLE energy_readings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own readings
CREATE POLICY "Users can view own readings"
  ON energy_readings FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own readings
CREATE POLICY "Users can insert own readings"
  ON energy_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own readings
CREATE POLICY "Users can update own readings"
  ON energy_readings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own readings
CREATE POLICY "Users can delete own readings"
  ON energy_readings FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before updates
CREATE TRIGGER update_energy_readings_updated_at
  BEFORE UPDATE ON energy_readings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
