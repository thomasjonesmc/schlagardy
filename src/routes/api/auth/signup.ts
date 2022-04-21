import supabase from '$lib/db';
import { respond } from './_respond';

export async function post(params) {

	const { request } = params;

	// ...rest is user metadata
	const { email, password, ...rest } = await request.json();

	const { session, error } = await supabase.auth.signUp({
		email,
		password
	}, {
		data: rest
	});

	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id);

	const user = data[0];

	return respond(user, error, params);
}