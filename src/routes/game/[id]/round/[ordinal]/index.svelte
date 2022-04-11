<script lang="ts" context="module">
	import type { Round } from "$lib/models/game.model";

    export async function load({ session, fetch, params }) {

		if (!session.user) return { status: 302,redirect: `/`};

		if (!session.game) {
			const response = await fetch(`/api/game/${params.id}`);
			session.game = response.ok && (await response.json());
		}

		const roundExists = session.game.rounds.findIndex((r: Round) => r.ordinal === parseInt(params.ordinal)) >= 0;

		// create round if it doesn;t already exist
		if (!roundExists) {
			const response = await fetch(`/api/game/${params.id}/round`, {
				method: "POST",
				body: JSON.stringify({ title: "", ordinal: params.ordinal })
			});

			if (response.ok) {
				session.game.rounds = await response.json()
			}
		}

		return {
			props: {
				ordinal: parseInt(params.ordinal)
			}
		};
	}
</script>

<script lang="ts">
	import { session } from "$app/stores";	
	import Board from "./_Board.svelte";
	export let ordinal: number;

	let game = $session.game;

	let roundIndex = $session.game.rounds.findIndex(r => r.ordinal === ordinal);
</script>

{#if !game}
	<h1>Can't Find Game</h1>
{:else}
	<div id="page">
		<h1>
			<a href={`/game/${game.id}`}>{game.title}</a>
		</h1>
		<div id="input-container">
			<input type="text" placeholder="Round Title" bind:value={game.rounds[roundIndex].title} />
		</div>
		<Board />
	</div>
{/if}

<pre>{JSON.stringify(game, null, 4)}</pre>

<style>
	#page {
		display: grid;
		gap: 1em;
	}

	h1 {
		text-align: center;
	}

	#input-container {
		margin: 0 auto;
		display: flex;
		max-width: 800px;
		width: 100%;
	}

	input {
		padding: 1em;
		flex: 1;
		border: none;
		box-shadow: 0 0 .8em 0 gray;
		border-radius: .25em;
	}
</style>