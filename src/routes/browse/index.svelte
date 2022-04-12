<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {

		// if (!session.user) return { status: 302, redirect: `/` };

		const response = await fetch(`/api/game`);		

		return {
			status: response.status,
			props: {
				games: response.ok && (await response.json())
			}
		};
	}
</script>


<script lang="ts">
	import { goto } from "$app/navigation";
	import type Game from "$lib/models/game.model";
	import { dateTime } from "$lib/util";

	export let games: Array<Game> = [];
</script>


<div id="browse">
	{#if games.length === 0}
		<h1>No Games Found</h1>
	{:else}
		<h1>Games</h1>
	{/if}

	{#each games as g}
		<div class="game-card" on:click={() => goto(`/game/${g.id}`)}>
			<div>
				<b><a href={`/game/${g.id}`}>{g.title}</a></b>
				<p class="game-description">{g.description}</p>
			</div>
			<div class="game-stats">			
				<p>{dateTime(g.created_at)}</p>
				<p>{g.play_count} Plays</p>
				<p>{g.is_public ? "Public" : "Private"}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	#browse {
		display: grid;
		gap: 1em;
	}

	.game-card {
		padding: .75em;
		box-shadow: 0 0 .85em 0 gray;
		color: rgb(50, 50, 50);
		display: flex;
		justify-content: space-between;
		border-radius: .5em;
		cursor: pointer;
	}

	b {
		color: black;
	}

	.game-stats {
		text-align: right;
		font-size: .85rem;
	}
</style>