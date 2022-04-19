/// <reference types="@sveltejs/kit" />

import type Game from "$lib/models/game.model";
import type User from "$lib/models/user.model";

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

// had to make this global after using an import
declare global {
	declare namespace App {
		// interface Locals {}
		// interface Platform {}
		interface Session {
			user: User,
			game: Game,
			players: Array<players>
		}
		// interface Stuff {}
	}
}
