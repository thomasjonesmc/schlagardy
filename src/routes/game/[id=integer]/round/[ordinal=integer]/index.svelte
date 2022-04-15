<script lang="ts" context="module">
	import type { Round } from "$lib/models/game.model";

    export async function load({ session, fetch, params }) {

		if (!session.user) return { status: 302, redirect: `/`};

		let ordinal = parseInt(params.ordinal);

		if (isNaN(ordinal)) {
			session.game = null;
			return {};
		}

		if (!session.game) {
			const response = await fetch(`/api/game/${params.id}`);
			session.game = response.ok && (await response.json());
		}

		const roundExists = session.game.rounds.find((r: Round) => r.ordinal === ordinal);

		// create round if it doesn't already exist
		if (!roundExists) {

			// order new round at very end
			ordinal = session.game.rounds.length + 1;

			// insert the game
			const response = await fetch(`/api/game/${params.id}/round`, {
				method: "POST",
				body: JSON.stringify({ title: "", ordinal })
			});

			const [newRound] = await response.json();

			// add the rounds to the game
			if (response.ok) {
				session.game.rounds = [ ...session.game.rounds, newRound ]
			}

			// redirect to the new ordinal if it doesn't match url ordinal
			if (ordinal !== parseInt(params.ordinal)) {
				return {
					status: 302,
					redirect: `/game/${params.id}/round/${ordinal}`
				}
			}
		}

		return {
			props: {
				ordinal,
				game: session.game
			}
		};
	}
</script>

<script lang="ts">
	import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
	import Board from "./_Board.svelte";
	import type Game from "$lib/models/game.model";
	import { put } from "$lib/util";
	import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";

	export let ordinal: number;
	export let game: Game;
	let round = game.rounds.find(r => r.ordinal === ordinal);

	let saving = false;
	let btn: HTMLButtonElement;
	let btnText = "Save";

	let originalRound = { ...round };

	async function onSubmit() {
		saving = true;
		
		const res = await put(`/api/game/${game.id}/round/${ordinal}`, round);
		
		btn.classList.add("btn-success");
		btnText = "Saved!";

		setTimeout(() => {
			btn.classList.remove("btn-success");
			btnText = "Save";
			saving = false;
		}, 1000);

		// async function goPrevious() {
			
		// 	await invalidate(`/api/game/${game.id}`);
		// }

		// async function goNext() {

		// }

	}
</script>

{#if !game}
	<h1>Can't Find Game</h1>
{:else}
	<form on:submit|preventDefault={onSubmit} id="page">
		<header>
			<h1>
				<a href={`/game/${game.id}`}>{game.title}</a>
			</h1>
			<div id="rounds-nav">
				<a href={`/game/${game.id}/round/${round.ordinal - 1}`}>Prev</a>
				<p>Round {round.ordinal} of {game.rounds.length}</p>
				<a href={`/game/${game.id}/round/${round.ordinal + 1}`}>Next</a>
			</div>
		</header>
		<div id="input-container">
			<input type="text" placeholder="Round Title" bind:value={round.title} />
		</div>
		<Board bind:board={round.board} />

		<SubmitButton bind:btn disabled={saving}>{btnText}</SubmitButton>
	</form>
{/if}

<pre>{JSON.stringify(round, null, 4)}</pre>

<style>
	#page {
		display: grid;
		gap: 1em;
		margin: 0 auto;
		max-width: 800px;
	}
	
	#rounds-nav {
		display: flex;
		justify-content: center;
		gap: .75em;
		color: gray;
	}

	h1, p {
		text-align: center;
	}

	#input-container {
		display: flex;
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