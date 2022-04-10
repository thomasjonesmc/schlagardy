/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	interface Session {
		user: {
			id: string,
			username: string,
			displayName: string,
			email: string,
			email_confirmed_at: string,
			phone: string,
			last_sign_in_at: string,
			created_at: string,
			updated_at: string
		}
	}
	// interface Stuff {}
}
