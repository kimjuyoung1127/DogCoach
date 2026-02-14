# Supabase Storage Setup for Dog Profile Photos

## Overview
This document contains instructions for setting up the `dog-profiles` storage bucket in Supabase for storing dog profile photos uploaded during the survey.

## Setup Steps

### 1. Create Storage Bucket

Go to Supabase Dashboard → Storage → Create Bucket:
- Bucket name: `dog-profiles`
- Public bucket: **Yes** (enabled)
- File size limit: 5 MB
- Allowed MIME types: `image/*`

**Or run this SQL in Supabase SQL Editor:**

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog-profiles', 'dog-profiles', true)
ON CONFLICT (id) DO NOTHING;
```

### 2. Set Storage Policies

Run these SQL commands to configure Row Level Security (RLS) policies:

**Option A: Complete SQL Script (Recommended)**

Run the migration files in order:
1. `Backend/migrations/create_dog_profiles_bucket.sql` - Creates bucket and basic policies
2. `Backend/migrations/fix_dog_profiles_rls.sql` - Fixes policies to allow guest uploads

**Option B: Manual SQL Commands**

```sql
-- Allow public read access (anyone can view uploaded photos)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'dog-profiles');

-- ⚠️ IMPORTANT: Allow ALL users (including guests) to upload
-- Survey is accessible before login, so guests must be able to upload
CREATE POLICY "Allow all uploads to dog-profiles"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'dog-profiles');

-- Allow all updates (for re-uploading)
CREATE POLICY "Allow all updates to dog-profiles"
ON storage.objects FOR UPDATE
USING (bucket_id = 'dog-profiles')
WITH CHECK (bucket_id = 'dog-profiles');

-- Allow all deletes
CREATE POLICY "Allow all deletes from dog-profiles"
ON storage.objects FOR DELETE
USING (bucket_id = 'dog-profiles');
```

**Why allow guest uploads?**
- Survey is accessible without login
- Users upload photos during onboarding (before creating account)
- Security: 5MB limit enforced on frontend, random filenames prevent guessing

### 3. Verify Setup

Check that the bucket exists and policies are active:

```sql
-- Check bucket
SELECT * FROM storage.buckets WHERE id = 'dog-profiles';

-- Check policies
SELECT * FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE '%dog-profiles%';
```

## Frontend Integration

The photo upload functionality is already implemented in:
- Survey Step1Profile component: Upload UI with preview
- Dashboard Header: Display dog photo
- Dog Profile page: Display dog photo

## Backend Integration

The `profile_image_url` field is already integrated in:
- `SurveySubmission` schema (Backend/app/features/onboarding/schemas.py)
- `Dog` model (Backend/app/shared/models.py)
- Dashboard API response (Backend/app/features/dashboard/schemas.py)

## File Naming Convention

Uploaded files follow this pattern:
```
{timestamp}-{random}.{extension}
```

Example: `1707936000000-a3b9c2.jpg`

## Security Notes

1. **Public bucket**: Photos are publicly accessible via direct URL (required for display without auth)
2. **File size limit**: 5 MB enforced on frontend before upload
3. **MIME type validation**: Only image files accepted
4. **Guest uploads allowed**: Survey users can upload before creating account (design requirement)
5. **Random filenames**: `{timestamp}-{random}.{ext}` prevents URL guessing
6. **No sensitive data**: Profile photos are intentionally public (not behind auth)

## Testing

After setup, test the upload flow:
1. Navigate to `/survey`
2. Upload a photo in Step 1 (Profile)
3. Complete the survey
4. Check Dashboard header displays the photo
5. Navigate to `/dog/profile` and verify photo displays

## Troubleshooting

**Upload fails with "Bucket not found":**
- Run `create_dog_profiles_bucket.sql` to create the bucket
- Verify bucket exists: `SELECT * FROM storage.buckets WHERE id = 'dog-profiles';`

**Upload fails with "new row violates row-level security policy":**
- Run `fix_dog_profiles_rls.sql` to allow guest uploads
- This is expected if using old policies that require authentication
- Survey users are often guests (not logged in), so policies must allow anonymous uploads

**Upload fails with 403 Forbidden (other causes):**
- Ensure bucket name matches exactly: `dog-profiles`
- Check browser console for detailed error message

**Photo doesn't display:**
- Check that bucket is set to `public: true`
- Verify the public URL format: `https://{project_ref}.supabase.co/storage/v1/object/public/dog-profiles/{filename}`
- Check browser console for CORS errors

## Status

✅ Frontend upload UI implemented (Step1Profile)
✅ Survey submission includes profile_image_url
✅ Dashboard displays dog photo
✅ Dog Profile page displays dog photo
⏳ **Pending: Supabase Storage bucket creation** (run SQL above)
