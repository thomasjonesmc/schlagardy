import { onDestroy, onMount } from 'svelte';
import { user, userHasBeenSet, accessToken } from "../stores/user";
import api from "../api";

export function refreshUser() {

    let userSetVal;

    let unsubscribe = userHasBeenSet.subscribe(value => {
        userSetVal = value;
    })

    const refresh = async () => {
        api.refreshAccessToken()
            .then(res => {
                console.log(`Fetched Access Token ${res.accessToken}`);

                accessToken.set(res.accessToken);

                setTimeout(refresh, res.expiresIn * 1000 - 1000);

                if (!userSetVal) {
                    api.getMe(res.accessToken)
                        .then(res => user.set(res))
                        .catch(() => user.set(null))
                        .finally(() => userHasBeenSet.set(true));
                }
            })
            .catch(() => {
                console.log(`Failed to Fetch Access Token `);

                user.set(null);
                accessToken.set(null);

                // try again in 30 seconds on an error
                setTimeout(refresh, 30 * 1000 - 1000);
            })
            .finally(() => userHasBeenSet.set(true));
    }

	onMount(refresh);

    onDestroy(unsubscribe);
}