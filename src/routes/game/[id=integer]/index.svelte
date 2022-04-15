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
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";

	import Button from "$lib/components/Buttons/Button.svelte";
	import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";

	let ordinal = $session.game.rounds.length + 1;
</script>

<div id="page">
{#if $session.game}
	<header>
		<h1>{$session.game.title}</h1>

		<a href={`/game/${$session.game.id}/round/${ordinal}`} id="add-btn">
			<Icon icon="fa-solid:plus" />
		</a>
	</header>

	<p>{$session.game.rounds.length} {$session.game.rounds.length === 1 ? "Round" : 'Rounds'}</p>
	
	<div id="rounds">
		{#each $session.game.rounds as r, i}
		<ButtonLink
			href={`/game/${$session.game.id}/round/${r.ordinal}`}
		>
			<b>Round {i + 1}</b>
			<p>{r.title || "Unnamed Round"}</p>
		</ButtonLink>
		{/each}
	</div>
	
	<div id="options">
		<ButtonLink href="/browse">Back to Games</ButtonLink>
	</div>
	
	<!-- <pre>{JSON.stringify($session.game, null, 4)}</pre> -->
{:else}
	<h1>No Game Found</h1>
{/if}
</div>

<style>

	header {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	#page {
		display: grid;
		gap: 1em;
		margin: 0 auto;
		max-width: 600px;
	}

	#rounds {
		display: flex;
		gap: .5em;
	}

	#options {
		display: flex;
		gap: .5em;
		align-items: center;
	}

	#add-btn {
		padding: 0;
		font-size: large;
		background-color: lightgreen;
		border: 2px solid green;
		color: green;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: grid;
		place-content: center;
	}
</style>