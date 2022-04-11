import supabase from '$lib/db';

export async function get({  }) {
    const { data, error } = await supabase
    .from('games')
        .select('*, rounds(*)')
        .eq('is_public', true)
        .eq('is_in_progress', true)
        .order('play_count', {
            ascending: false
        });

    if (error) return { status: 401, body: error };

	return {
		body: data
	};
}

export async function post({ request }) {

	const { title, description, public: is_public, userId: user_id } = await request.json();

	const { data, error } = await supabase
        .from('games')
        .insert([
            { title, description, is_public, user_id }
        ]);

    if (error) return { status: 401, body: error };

	return {
		body: data[0]
	};
}