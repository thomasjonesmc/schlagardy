<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";
	import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";
	import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
	import type Game from "$lib/models/game.model";
	import { dateTime, del } from "$lib/util";

	export let games: Array<Game>;

	async function onDelete(id: number) {
		const res = await del(`/api/game/${id}`);
		games = games.filter(g => g.id !== id);
	}
</script>


<div id="browse">
	<header>
		<h1>{games.length === 0 ? "No Games Found" : "Games"}</h1>
		<ButtonLink href="/create">
			Create Game
		</ButtonLink>
	</header>

	{#each games as g}
		<div class="game-card">
			<div class="card-top" on:click={() => goto(`/game/${g.id}`)}>
				<div>
					<b><a href={`/game/${g.id}`}>{g.title}</a></b>
					<p class="game-description">{g.description}</p>
					<a href={`/user/${g.author.username}`}>{g.author.username}</a>
				</div>
				<div class="game-stats">			
					<p>{dateTime(g.created_at)}</p>
					<p>{g.rounds.length} Rounds</p>
					<p>{g.play_count} Plays</p>
					<p>{g.is_public ? "Public" : "Private"}</p>
				</div>
			</div>

			{#if $session.user?.id === g.author.id}
				<div class="card-bottom">
					<a href={`/game/${g.id}/round/create`}>
						Add New Round
					</a>
					<a href={`/game/${g.id}/edit`}>
						Edit Game
					</a>
					<LinkButton on:click={() => onDelete(g.id)}>
						Delete Game
					</LinkButton>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	#browse {
		display: grid;
		gap: 1em;
		margin: 0 auto;
		max-width: 600px;
		width: 100%;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--clr-bg-dark);
	}

	.game-card {
		border: 1px solid var(--clr-bg-dark);;
		color: var(--clr-font);
		background-color: var(--clr-bg-accent);
		border-radius: .5em;
	}
	
	.card-top {
		cursor: pointer;
		padding: .75em;
		display: flex;
		justify-content: space-between;
	}
	
	.game-description {
		display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
	}

	.card-bottom {
		display: flex;
		gap: .5em;
		padding: .25em .75em;
		border-top: 1px solid var(--clr-bg-dark);
		color: var(--clr-font-accent);
		font-size: .9rem;
	}

	b {
		color: var(--clr-font);
		font-size: 1.5rem;
	}

	.game-stats {
		text-align: right;
		font-size: .85rem;
		flex-shrink: 0;
	}
</style>