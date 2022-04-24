import supabase from "$lib/db";

export async function get({ locals }) {

    const { user } = locals;

    let query = supabase
        .from('games')
        .select('*, rounds(*), author:profiles(*)');
    
    if (locals.user) query = query.or(`user_id.eq.${user.id},is_public.eq.true`);
    else query = query.eq('is_public', true);

    const { data, error } = await query
        // .eq('is_in_progress', false)
        .order('play_count', {
            ascending: false
        });

    if (error) {
        return { 
            status: 500, 
            body: { 
                error
            } 
        };
    }

	return {
		body: {
            games: data
        }
	};
}