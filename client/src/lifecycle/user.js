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

            if (res.error) {
                user.set(null);
                accessToken.set(null);
                return;
            }

            accessToken.set(res.accessToken);

            // keeping calling refresh 1 second before expiration
            setTimeout(() => {
                refresh();
            }, res.expiresIn * 1000 - 1000);
            
            // only fetch the user if we haven't already set them
            if (!userHasBeenSet) {

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
        });
    }

	onMount(() => {
        refresh();
    });
}