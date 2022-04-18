import { derived, writable } from "svelte/store";

export const history = writable([]);

export const previousRoute = derived(history, history => history[0]);