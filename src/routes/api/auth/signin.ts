import supabase from '$lib/db';
import { respond } from './_respond';

export async function post({ request }) {
	const { email, password } = await request.json();

	const { session, error } = await supabase.auth.signIn({
		email,
		password
	});

	const { data: [user] } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id);

	return respond({user}, error);
}