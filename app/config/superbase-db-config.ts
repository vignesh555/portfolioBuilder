import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPERBASE_PROJECT_URL || process.env.NEXT_PUBLIC_SUPERBASE_PROJECT_URL ||''
const supabaseKey = process.env.SUPERBASE_API_KEY || process.env.NEXT_PUBLIC_SUPERBASE_API_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;