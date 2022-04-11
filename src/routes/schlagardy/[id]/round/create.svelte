<script>

import { game } from "$lib/stores/game";

</script>
<script lang="ts" context="module">
    export function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: `/`
			};
		}

		return {};
	}
</script>

<div>
    {$game.title}
</div>