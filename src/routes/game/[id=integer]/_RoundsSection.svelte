<script lang="ts">
    import ButtonLink from "$lib/components/Buttons/ButtonLink.svelte";
    import type Game from "$lib/models/game.model";
    import RoundCard from "./_RoundCard.svelte";

    export let game: Game;
    export let me: boolean;
</script>

<section id="rounds">
    <p>{game.rounds.length} {game.rounds.length === 1 ? "Round" : 'Rounds'}</p>
    
    {#if game.rounds.length > 0}
        <div id="round-links">
            {#each game.rounds as r, i}
                <RoundCard round={r} {game} />
            {/each}
        </div>
    {/if}

    {#if me}
        <ButtonLink 
            href={`/game/${game.id}/round/create`}
            style="width: max-content;"
        >
            Add New Round
        </ButtonLink>
    {/if}
</section>

<style>
    #rounds {
		padding: .75em 0;
		display: grid;
		gap: .75em;
	}

	#round-links {
		display: flex;
		flex-wrap: wrap;
		gap: .5em;
	}
</style>