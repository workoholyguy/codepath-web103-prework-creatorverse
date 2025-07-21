import { supabase } from '../client';

export const fetchAllCreators = async () => {
    const { data, error } = await supabase.from('creators').select('*');

    if (error) {
        console.error('Supabase fetch error:', error.message);
        return null;
    }

    return data;
};