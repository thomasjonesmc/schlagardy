import supabase from '$lib/db';
import { Board } from '$lib/models/game.model';

export async function post({ request, params }) {

	const { title, ordinal, rows, cols } = await request.json();

	const { data, error } = await supabase
		.from('rounds')
		.insert([
			{ title, ordinal, jeopardy_id: params.id, board: new Board(rows ?? 5, cols ?? 5) }
		]);

    if (error) return { status: 401, body: error };

	return {
		body: data
	}
}