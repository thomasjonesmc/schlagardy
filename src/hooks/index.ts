import User from '$lib/models/user.model';
import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const user = cookies.user && Buffer.from(cookies.user, 'base64').toString('utf-8');
	
    event.locals.user = user ? JSON.parse(user) : null;
	
	return await resolve(event);
}

export function getSession({ locals }) {

	let user: User = null;
	if (locals.user) user = new User(locals.user);

	return {
		user: user?.toPOJO()
	};
}