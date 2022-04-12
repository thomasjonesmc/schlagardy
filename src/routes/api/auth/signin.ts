import supabase from '$lib/db';
import { respond } from './_respond';

export async function post({ request }) {
	const { email, password } = await request.json();

	const { error } = await supabase.auth.signIn({
		email,
		password
	});

	const { data: [user] } = await supabase
		.from('profiles')
		.select('*');

	return respond({user}, error);
}