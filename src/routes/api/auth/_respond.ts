export function respond(session, error) {
	
    if (error) {
		return { status: 401, body: error };
	}

	const json = JSON.stringify(session.user);
	const value = Buffer.from(json).toString('base64');

	return {
		headers: {
			'set-cookie': `user=${value}; Path=/; HttpOnly`
		},
		body: session
	};
}