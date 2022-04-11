import supabase from '$lib/db';

export async function post({ request }) {

	const { title, description, public: is_public } = await request.json();

	const { data, error } = await supabase
        .from('jeopardies')
        .insert([
            { title, description, is_public }
        ]);

    if (error) return { status: 401, body: error };

	return {
		body: data[0]
	};
}