<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {


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
	import { date, del, isOverflown } from "$lib/util";
	import type Game from "$lib/models/game.model";
	import User from "$lib/models/user.model";
	import { onMount } from "svelte";
import RoundCard from "./_RoundCard.svelte";
import { round } from "lodash";

	export let game: Game;

	let ordinal = game.rounds.length + 1;
	let overflown = true;
	let description: HTMLParagraphElement;

	let me = $session.user?.id === game.author.id;

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
		<div id="sub-header">
			<p>{game.play_count} Plays</p>
			<Icon icon="ci:dot-03-m" />
			<p>{date(game.created_at)}</p>
		</div>
	</header>

	<section id="description">
		<b>
			<a href={`/user/${game.author.username}`}>{game.author.displayName}</a>
		</b>
		{#if game.description}
			<p 
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
	</section>

	<section id="rounds">
		<p>{game.rounds.length} {game.rounds.length === 1 ? "Round" : 'Rounds'}</p>
		
		<div id="round-links">
			{#each game.rounds as r, i}
				<RoundCard round={r} {game} />
			{/each}
		</div>

		{#if me}
			<ButtonLink 
				href={`/game/${$session.game.id}/round/create`}
				style="width: max-content;"
			>
				Add New Round
			</ButtonLink>
		{/if}
	</section>

	
	<section id="options">
		<a href="/browse">Back to Games</a>
		{#if me}
			<LinkButton on:click={onDelete}>Delete Game</LinkButton>
		{/if}
	</section>
	
	<!-- <pre>{JSON.stringify(game, null, 4)}</pre> -->
</div>
{/if}

<style>

	header {
		border-bottom: 1px solid lightgray;
		border-top: 1px solid lightgray;
		padding: .5em;
	}

	#sub-header {
		color: gray;
		display: flex;
		font-size: .9rem;
		align-items: center;
		gap: .25em;
	}

	#page {
		display: grid;
		margin: 0 auto;
		max-width: 600px;
		width: 100%;
	}

	#description {
		padding: 1em .5em;
		border-bottom: 1px solid lightgray;
	}
	
	.overflown {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#rounds {
		padding: .5em;
		display: grid;
		gap: .5em;
	}

	#round-links {
		display: flex;
		flex-wrap: wrap;
		gap: .5em;
	}

	#options {
		padding: 0 .5em;
		display: flex;
		gap: .75em;
		align-items: center;
	}
</style>