import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PROJECT_URL
const supabaseAnonKey = import.meta.env.VITE_ANON_API

export const supabase = createClient(supabaseUrl, supabaseAnonKey)