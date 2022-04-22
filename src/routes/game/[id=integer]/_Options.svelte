<script lang="ts">
    import { goto } from "$app/navigation";
    import { page, session } from "$app/stores";
    import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
    import type Game from "$lib/models/game.model";
    import { del } from "$lib/util";

    export let me: boolean;
    export let game: Game;

    async function onDelete() {
		const res = await del(`/api/game/${game.id}`);
		goto("/browse");
	}
</script>

<section id="options">
    <a href="/browse">Back to Games</a>
    {#if me}
        <a href={`${$page.url.pathname}/edit`}>Edit Game</a>
        <LinkButton on:click={onDelete}>Delete Game</LinkButton>
    {/if}
</section>


<style>
    #options {
		display: flex;
		gap: .75em;
		align-items: center;
	}
</style>