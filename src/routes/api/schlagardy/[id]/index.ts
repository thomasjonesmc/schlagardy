import supabase from '$lib/db';

export async function get({ request, params }) {
    const { data, error } = await supabase
        .from('jeopardies')
        .select(`
            *,
            rounds (
                *
            )
        `)
        .eq('id', params.id);

    if (error) return { status: 401, body: error };

    return {
        body: data[0]
    }
}