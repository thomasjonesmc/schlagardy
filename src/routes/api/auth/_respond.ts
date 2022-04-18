import User from "$lib/models/user.model";

export function respond({ user }, error) {
	
    if (error) {
		return { status: 401, body: error };
	}

	const sessionUser = new User(user);

	const value = Buffer
		.from(sessionUser.toJSON())
		.toString('base64');

	return {
		headers: {
			'set-cookie': `user=${value}; Path=/; HttpOnly`
		},
		body: { user: { ...sessionUser } }
	};
}