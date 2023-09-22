import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SNFT_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_SNFT_SUPABASE_KEY || "";
export const supabaseSnft = createClient(supabaseUrl, supabaseKey);
