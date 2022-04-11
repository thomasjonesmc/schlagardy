import supabase from '$lib/db';

export async function get({ params }) {
    const { data, error } = await supabase
        .from('games')
        .select('*, rounds(*)')
        .eq('id', params.id)
        .order('ordinal', {foreignTable: 'rounds'});

    if (error) return { status: 401, body: error };

    return {
        body: data.length === 0 ? null : data[0]
    }
}