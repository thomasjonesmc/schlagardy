import supabase from '$lib/db';
import { respond } from './_respond';

export async function post(params) {

	const { request } = params;

	const { email, password } = await request.json();

	const { session, error } = await supabase.auth.signIn({
		email,
		password
	});

	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id);

	const user = data[0];

	return respond(user, error, params);
}