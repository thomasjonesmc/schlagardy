import supabase from '$lib/db';
import { respond } from './_respond';

export async function post({ request }) {
	const { email, password, ...rest } = await request.json();

	const { session, error } = await supabase.auth.signUp({
		email,
		password
	}, {
		data: rest
	});

	return respond(session, error);
}