import supabase from '$lib/db';
import { respond } from './_respond';

export async function post({ request }) {
	const { email, password, ...rest } = await request.json();

	const { error } = await supabase.auth.signUp({
		email,
		password
	}, {
		data: rest
	});

	const { data: [user] } = await supabase
		.from('profiles')
		.select('*');

	return respond({user}, error);
}