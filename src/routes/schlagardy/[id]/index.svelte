<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {

		if (!session.user) return { status: 302, redirect: `/` };

		const response = await fetch(`/api/game/${params.id}`);

		return {
			status: response.status,
			props: {
				jeopardy: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
import { goto } from "$app/navigation";

	import Button from "$lib/components/Buttons/Button.svelte";
	import { game } from "$lib/stores/game";

	export let jeopardy = null;
	$game = jeopardy;

	function addRound() {
		goto(`/schlagardy/${$game.id}/round/create`);
	}
</script>

{#if $game}
	<h1>{$game.title}</h1>
	{#if $game.rounds.length === 0}
		<Button on:click={addRound}>Add a round</Button>
	{:else}
		{#each $game.rounds as r}
			<div>{r.title}</div>
		{/each}
	{/if}
	<!-- <pre>{JSON.stringify(jeopardy, null, 4)}</pre> -->
{/if}