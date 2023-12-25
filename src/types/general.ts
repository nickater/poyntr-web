import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase';

export type Client = SupabaseClient<Database>