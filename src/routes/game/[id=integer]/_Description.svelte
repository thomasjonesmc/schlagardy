<script lang="ts">
    import { session } from "$app/stores";
    import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
    import { isOverflown } from "$lib/util";
    import { onMount } from "svelte";
    let game = $session.game;

    let overflown = true;
	let description: HTMLParagraphElement;

	onMount(() => {
		overflown = isOverflown(description);
	});
</script>


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


<style>
    #description {
		padding: 1em 0;
		border-bottom: 1px solid lightgray;
	}
	
	.overflown {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>