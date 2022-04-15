import supabase from '$lib/db';
import { Board } from '$lib/models/game.model';

export async function post({ request, params }) {

	const { title, ordinal, rows, cols } = await request.json();

	const { data, error } = await supabase
		.from('rounds')
		.insert([
			{ title, ordinal, game_id: params.id, board: new Board(rows ?? 5, cols ?? 6, 100 * ordinal) }
		]);

    if (error) return { status: 401, body: error };

	return {
		body: data
	}
}