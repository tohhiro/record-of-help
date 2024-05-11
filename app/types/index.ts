import { PostgrestError } from '@supabase/supabase-js';

export type PricesHelpsList = {
  data: {
    created_at: string;
    help: string;
    id: string;
    label: string;
    update_at: string | null;
    prices_list: {
      created_at: string;
      help_id: string | null;
      id: number;
      price: number;
      update_at: string | null;
    }[];
  }[];
  error: PostgrestError;
};
