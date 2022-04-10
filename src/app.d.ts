/// <reference types="@sveltejs/kit" />

import type { UserType } from "$lib/models/user.model";
import type User from "$lib/models/user.model";


// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	interface Session {
		user: User
	}
	// interface Stuff {}
}
