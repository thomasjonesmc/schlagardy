import supabase from '$lib/db';

export async function get({ params }) {
    const { data, error } = await supabase
        .from('games')
        .select('*, rounds(*)')
        .eq('id', params.id)
        .order('ordinal', {foreignTable: 'rounds'});

    if (error || data.length === 0) {
        return { status: 401, body: error };
    }

    return {
        body: data[0]
    }
}

export async function del({ params }) {
    const { data, error } = await supabase
        .from('games')
        .delete()
        .eq('id', params.id);

    if (error || data.length === 0) {
        return { status: 401, body: error };
    }

    return {
        body: data[0]
    }
}