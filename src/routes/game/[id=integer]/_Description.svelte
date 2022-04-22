<script lang="ts">
    import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
    import type Game from "$lib/models/game.model";
    import { isOverflown } from "$lib/util";
    import { onMount } from "svelte";
    
    export let game: Game;

    let overflown = true;
	let description: HTMLParagraphElement;

	onMount(() => {
		overflown = isOverflown(description);
	});
</script>


<section id="description">
    <b>
        <a href={`/user/${game.author.username}`}>{game.author.display_name}</a>
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


<style>
    #description {
		padding: 1em 0;
		border-bottom: 1px solid var(--clr-bg-dark);
	}
	
	.overflown {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>