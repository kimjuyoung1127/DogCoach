-- ============================================
-- Fix dog-profiles RLS for Guest Uploads
-- ============================================

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

-- Allow ALL users (including guests) to upload
-- Survey is accessible before login, so we need permissive policy
CREATE POLICY "Allow all uploads to dog-profiles"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'dog-profiles');

-- Allow updates (for re-uploading)
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
CREATE POLICY "Allow all updates to dog-profiles"
ON storage.objects FOR UPDATE
USING (bucket_id = 'dog-profiles')
WITH CHECK (bucket_id = 'dog-profiles');

-- Allow deletes
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
CREATE POLICY "Allow all deletes from dog-profiles"
ON storage.objects FOR DELETE
USING (bucket_id = 'dog-profiles');
