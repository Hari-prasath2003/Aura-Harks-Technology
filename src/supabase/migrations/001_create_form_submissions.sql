-- Create form_submissions table for YourIndiaPartner popup form data
-- This stores all user submissions from the website popup form

CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  services TEXT[] NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('immediate', 'enquiry')),
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes for common queries
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Create index on action_type for filtering
CREATE INDEX IF NOT EXISTS idx_form_submissions_action_type ON form_submissions(action_type);

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public form submissions)
CREATE POLICY "Allow public insert" ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated read" ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE form_submissions IS 'Stores form submissions from YourIndiaPartner website popup form';
COMMENT ON COLUMN form_submissions.services IS 'Array of selected services';
COMMENT ON COLUMN form_submissions.action_type IS 'Type of action: immediate or enquiry';
COMMENT ON COLUMN form_submissions.timestamp IS 'User-submitted timestamp from frontend';
COMMENT ON COLUMN form_submissions.created_at IS 'Server timestamp of when record was created';
