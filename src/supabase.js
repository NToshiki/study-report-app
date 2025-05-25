import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchReports = async () => {
  const { data, error } = await supabase.from('reports').select('*');
  if (error) {
    console.error('データ取得エラー:', error);
    return [];
  }
  return data;
};

export const addReports = async (newReport) => {
  await supabase.from('reports').insert(newReport);
}

export const deleteReports = async (id) => {
  await supabase.from('reports').delete().eq('id',id);
}