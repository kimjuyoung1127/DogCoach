-- ============================================
-- Create dog-profiles Storage Bucket
-- ============================================

-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog-profiles', 'dog-profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access policy
CREATE POLICY IF NOT EXISTS "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'dog-profiles');

-- Authenticated users can upload
CREATE POLICY IF NOT EXISTS "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'dog-profiles'
    AND auth.role() = 'authenticated'
);

-- Users can update their own files
CREATE POLICY IF NOT EXISTS "Users can update own files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'dog-profiles')
WITH CHECK (bucket_id = 'dog-profiles');

-- Users can delete their own files
CREATE POLICY IF NOT EXISTS "Users can delete own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'dog-profiles');
