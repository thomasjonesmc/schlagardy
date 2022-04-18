import type Game from "$lib/models/game.model";
import { writable } from "svelte/store";

export const game = writable<Game>(null);