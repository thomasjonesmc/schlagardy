import User from "$lib/models/user.model";

export function respond(user, error, params) {

	const { url } = params;
	const location = url.searchParams.get("goto") || "/";
	
    if (error) {
		return { 
			status: 401, 
			body: {
				error
			} 
		};
	}

	const value = Buffer
		.from(JSON.stringify(user))
		.toString('base64');

	return {
		headers: {
			'set-cookie': `user=${value}; Path=/; HttpOnly`
		},
		body: {
			user,
			error
		}
	};
}