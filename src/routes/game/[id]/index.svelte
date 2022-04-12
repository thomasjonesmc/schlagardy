<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {

		if (!session.user) return { status: 302, redirect: `/signin?goto=/game/${params.id}` };

		const response = await fetch(`/api/game/${params.id}`);

		session.game = response.ok && (await response.json())

		return {
			status: response.status,
			ok: true
		};
	}
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";

	import Button from "$lib/components/Buttons/Button.svelte";
	import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";

	function addRound() {
		goto(`/game/${$session.game.id}/round/${$session.game.rounds.length + 1}`);
	}

</script>

<div id="game-id">
{#if $session.game}

	<h1>{$session.game.title}</h1>
	<p>{$session.game.rounds.length} {$session.game.rounds.length === 1 ? "Round" : 'Rounds'}</p>
	
	<div id="rounds">
		{#each $session.game.rounds as r}
		<ButtonLink href={`/game/${$session.game.id}/round/${r.ordinal}`}>
			{r.title || "Unnamed Round"}
		</ButtonLink>
		{/each}
	</div>
	
	<Button on:click={addRound} style="max-width: fit-content;">Add a round</Button>
	
	<!-- <pre>{JSON.stringify($session.game, null, 4)}</pre> -->
{:else}
	<h1>No Game Found</h1>
{/if}
</div>

<style>
	#game-id {
		display: grid;
		gap: 1em;
	}

	#rounds {
		display: flex;
		gap: .5em;
	}
</style>