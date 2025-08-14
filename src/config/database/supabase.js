import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://bwumdyqlzmphicsndtpg.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dW1keXFsem1waGljc25kdHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDc5OTksImV4cCI6MjA3MDcyMzk5OX0.TT7JdYiaSE-leKKAAxmVT2A_Sg8TYD5Fb4GbWjirjNg"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
const supabaseStorage = supabaseClient.storage.from("images")
const supabaseStorageUrl = (path) => supabaseStorage.getPublicUrl(path).data.publicUrl
const supabaseStorageUpload = (path,file) => supabaseStorage.upload(path, file, { upsert : true})
const supabaseStorageDelete = (path) => supabaseStorage.remove(path)

export{ supabaseClient, supabaseStorage, supabaseStorageUrl, supabaseStorageUpload, supabaseStorageDelete }