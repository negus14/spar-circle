// supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const SUPABASE_URL = 'https://tpsdgopzqinktagwtbcy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwc2Rnb3B6cWlua3RhZ3d0YmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI4MjgsImV4cCI6MjA2ODA2ODgyOH0.XyRmTlwjZvKfA8wg4jmv0_Wa_RmvQo9gGL2nxnho-2M'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
