import supabase from "$lib/db";

export async function post() {
	await supabase.auth.signOut();

	return {
		headers: {
			'set-cookie': 'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		},
		body: {
			ok: true
		}
	};
}