import { onDestroy, onMount } from 'svelte';
import { user, userHasBeenSet, accessToken } from "../stores/user";

export function refreshUser() {

    let userSetVal;

    let unsubscribe = userHasBeenSet.subscribe(value => {
        userSetVal = value;
    })

    const refresh = async () => {

        fetch("http://localhost:3000/api/users/refresh", {
            method: "POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {

            if (res.error) {
                user.set(null);
                userHasBeenSet.set(true);
            }

            console.log("Fetched access token", res.accessToken);

            // save the access token to a store so we can use it anywhere
            accessToken.set(res.accessToken ?? null);

            // keeping calling refresh recursively 1 second before the accessToken expires
            // if the 
            setTimeout(() => {
                refresh();
            }, (res.expiresIn || 30) * 1000 - 1000);
            
            // only fetch the user if we haven't already set them
            if (!userSetVal && !res.error) {
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
                    userHasBeenSet.set(true);
                });
            }
        })
    }

	onMount(() => {
        refresh();
    });

    onDestroy(unsubscribe);
}