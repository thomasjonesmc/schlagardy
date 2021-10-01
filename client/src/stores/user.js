import { writable } from 'svelte/store';

export const user = writable(null);

export const accessToken = writable(null);

// use this to know if we've attempted to fetch the logged in user
// this is important because we don't want to make assumptions about 
// a null user meaning logged out between the time of application start
// and the first attempt at fetching the user
export const userHasBeenSet = writable(false);