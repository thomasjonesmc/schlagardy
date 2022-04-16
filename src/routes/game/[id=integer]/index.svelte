<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {

		if (!session.user) {
			return { status: 302, redirect: `/signin?goto=/game/${params.id}` };
		}

		const response = await fetch(`/api/game/${params.id}`);

		const data = response.ok && (await response.json());

		if (!data) {
			return { status: 404 }
		}

		session.game = data;

		return {
			status: response.status,
			ok: true,
			props: {
				game: session.game
			}
		};
	}
</script>

<script lang="ts">
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";

	import Button from "$lib/components/Buttons/Button.svelte";
	import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";
	import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
	import { del, isOverflown } from "$lib/util";
	import type Game from "$lib/models/game.model";
	import User from "$lib/models/user.model";
	import { onMount } from "svelte";

	export let game: Game;

	let ordinal = game.rounds.length + 1;
	let overflown = true;
	let description: HTMLParagraphElement;

	async function onDelete() {
		const res = await del(`/api/game/${game.id}`);
		$session.game = game = null;
		goto("/browse");
	}

	onMount(() => {
		overflown = isOverflown(description);
	});
</script>

{#if game}
<div id="page">
	<header>
		<h1>{game.title}</h1>
	</header>

	{#if game.description}
		 <p class="description" 
		 	bind:this={description}
			class:overflown
		>
			{game.description}
		</p>
		 {#if description && isOverflown(description)}
			<LinkButton on:click={() => overflown = !overflown} style="color: gray;">
				{overflown ? "Show More" : "Show Less"}
			</LinkButton>
		 {/if}
	{/if}

	<p>{game.rounds.length} {game.rounds.length === 1 ? "Round" : 'Rounds'}</p>
	
	<div id="rounds">

		{#each game.rounds as r, i}
			<ButtonLink
				style="min-width: max-content; flex: 1;"
				href={`/game/${game.id}/round/${r.ordinal}`}
			>
				<b>Round {i + 1}</b>
				<p>{r.title || "Unnamed Round"}</p>
				<p id="board-size">Board Size {r.board.rows.length} x {r.board.categories.length}</p>
			</ButtonLink>
		{/each}
	</div>

	{#if $session.user?.id === game?.user_id} 
		<ButtonLink 
			href={`/game/${$session.game.id}/round/${ordinal}`}
			style="width: max-content;"
		>
			Add New Round
		</ButtonLink>
	{/if}
	
	<div id="options">
		<a href="/browse">Back to Games</a>
		<LinkButton on:click={onDelete}>Delete Game</LinkButton>
	</div>
	
	<!-- <pre>{JSON.stringify(game, null, 4)}</pre> -->
</div>
{/if}

<style>

	header {
		display: flex;
		gap: 1em;
		align-items: flex-end;
		border-bottom: 1px solid lightgray;
	}

	#page {
		display: grid;
		gap: .5em;
		margin: 0 auto;
		max-width: 600px;
		width: 100%;
	}

	.description {
		color: gray;
	}
	
	.overflown {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#rounds {
		display: flex;
		flex-wrap: wrap;
		gap: .5em;
	}

	#options {
		display: flex;
		gap: .75em;
		align-items: center;
	}

	#board-size {
		color: gray;
		font-size: .9rem;
	}
</style>