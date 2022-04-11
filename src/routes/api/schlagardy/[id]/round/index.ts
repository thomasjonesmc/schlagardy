import supabase from '$lib/db';

export async function post({ request }) {

	const { jeopardyId, title } = await request.json();

	const { data, error } = await supabase
        .from('jeopardies');

    if (error) return { status: 401, body: error };

	return {
		body: data
	};
}