<script lang="ts" context="module">
import { session } from "$app/stores";

import Profile from "$lib/components/Profile/Profile.svelte";

    export function load({ session }) {

		if (!session.user) {
			return {
				status: 302,
				redirect: `/`
			};
		}

		return {};
	}
</script>

<Profile user={$session.user} />