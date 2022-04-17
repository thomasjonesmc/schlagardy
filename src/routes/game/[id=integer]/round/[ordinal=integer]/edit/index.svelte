<script lang="ts" context="module">
	import { Category, Cell, type Round } from "$lib/models/game.model";

    export async function load({ session, fetch, params, stuff }) {

		let ordinal = parseInt(params.ordinal);
        const roundExists = session.game.rounds.find((r: Round) => r.ordinal === ordinal);

		if (!roundExists) {
			return {
				status: 404
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
	import { afterNavigate, goto } from "$app/navigation";
	import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
	import Button from "$lib/components/Buttons/Button.svelte";
	import { page, session } from "$app/stores";
	import Spinner from "$lib/components/Loading/Spinner.svelte";
	import { isEqual } from "lodash";

	export let ordinal: number;
	export let game: Game;
	
	$: round = game.rounds.find(r => r.ordinal === ordinal);

	let saving = false;

	async function saveRound() {
		saving = true;
		
		const res = await put(`/api/game/${game.id}/round/${ordinal}`, round);

		saving = false;
	}

	async function onSubmit() {
		saveRound();
	}

	async function addRound() {
		ordinal = game.rounds.length + 1;
		$session.game = game;
		goto(`/game/${game.id}/round/create`);
	}

	async function goPrevious() {
		ordinal--;
		goto(`/game/${game.id}/round/${ordinal}/edit`);
	}

	async function goNext() {
		ordinal++;
		goto(`/game/${game.id}/round/${ordinal}/edit`);
	}

	function addRow() {
		let rows = round.board.rows;
		let r = rows[rows.length - 1];

		round.board.rows = [ ...rows, r ];

		round.board.categories = round.board.categories.map(c => {
			return { ...c, cells: [ ...c.cells, new Cell() ]}
		});
	}

	function addCategory() {
		let cats = round.board.categories;
		round.board.categories = [ ...cats, new Category(round.board.rows.length) ];
	}

	function hasUnsavedChanges(round: Round, prev: Round) {
		let rows = round.board.rows;
		let cats = round.board.categories;
		let prevRows = prev.board.rows;
		let prevCats = prev.board.categories;

		
		if (round.title !== prev.title) return true;
		if (cats.length !== prevCats.length) return true;
		if (rows.length !== prevRows.length) return true;
		
		console.log(rows.length, prevRows.length);

		if (!isEqual(rows, prevRows)) return true;

		// check cat categories same
		for (let i = 0; i < cats.length; i++) {
			let c1 = cats[i];
			let c2 = prevCats[i];

			if (c1.category !== c2.category) return true;

			// check category cells the same
			for (let j = 0; j < c1.cells.length; j++) {
				if (!isEqual(c1.cells[j], c2.cells[j])) {
					return true;
				}
			}
		}

		return false;
	}

</script>

{#if !game}
	<h1>Can't Find Game</h1>
{:else if !round}
	<div style="display: grid; place-content: center;">
		<Spinner />
	</div>
{:else}
	<form on:submit|preventDefault={onSubmit} id="page">
		<header>
			<h1>
				<a href={`/game/${game.id}`}>{game.title}</a>
			</h1>
			<div id="rounds-nav">
				<LinkButton on:click={goPrevious} disabled={ordinal === 1}>Prev</LinkButton>
				<p>Round {round.ordinal} of {game.rounds.length}</p>
				<LinkButton on:click={goNext} disabled={ordinal === game.rounds.length}>Next</LinkButton>
			</div>
		</header>
		<div id="round-buttons">
			<SubmitButton disabled={saving}>Save Changes</SubmitButton>
			<Button disabled={saving} on:click={addRound}>Add Round</Button>
			<Button disabled={saving} on:click={addRow}>Add Row</Button>
			<Button disabled={saving} on:click={addCategory}>Add Category</Button>
		</div>
		<div id="input-container">
			<input type="text" placeholder="Round Title" bind:value={round.title} />
		</div>
	
		<Board bind:board={round.board} {ordinal} />
	</form>
{/if}

<!-- <pre>{JSON.stringify(round, null, 4)}</pre> -->

<style>
	#page {
		/* background-color: green; */
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: 0 auto;
		flex: 1;
		width: 100%;
		padding: 0 1em;
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
		align-self: center;
		max-width: 800px;
	}

	input {
		padding: .35em;
		font-size: 1.25rem;
		flex: 1;
		border: none;
		box-shadow: 0 0 .8em 0 gray;
		border-radius: .25em;
	}

	#round-buttons {
		display: flex;
		justify-content: center;
		gap: 1em;
	}
</style>