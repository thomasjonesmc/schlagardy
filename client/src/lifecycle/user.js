import { onMount } from 'svelte';
import { user, accessToken } from "../stores/user";

export function refreshUser() {

    let userHasBeenSet = false;

    const refresh = async () => {

        fetch("http://localhost:3000/api/users/refresh", {
            method: "POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {

            if (res.error) user.set(null);

            // save the access token to a store so we can use it anywhere
            accessToken.set(res.accessToken ?? null);

            // keeping calling refresh recursively 1 second before the accessToken expires
            // if the 
            setTimeout(() => {
                console.log("Refetched access token", res.accessToken);
                refresh();
            }, (res.expiresIn || 30) * 1000 - 1000);
            
            // only fetch the user if we haven't already set them
            if (!userHasBeenSet && !res.error) {
                fetch("http://localhost:3000/api/users/me", {
                    headers: {
                        authorization: `Bearer ${res.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.error) user.set(null);
                    else user.set(res);
                })
                .catch(() => user.set(null))
                .finally(() => {
                    userHasBeenSet = true;
                });
            }
        })
    }

	onMount(() => {
        refresh();
    });
}