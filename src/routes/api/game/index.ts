import supabase from '$lib/db';

export async function get({ locals: { user } }) {

    let query = supabase
        .from('games')
        .select('*, rounds(*), author:profiles(*)');
    
    if (user) query = query.or(`user_id.eq.${user.id},is_public.eq.true`);
    else query = query.eq('is_public', true);

    const { data, error } = await query
        // .eq('is_in_progress', true)
        .order('play_count', {
            ascending: false
        });

    if (error) return { status: 401, body: error };

	return {
		body: data
	};
}

export async function post({ request, locals }) {

    const { id: user_id } = locals.user;

	const { title, description, is_public } = await request.json();

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