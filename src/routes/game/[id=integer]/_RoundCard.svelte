<script lang="ts">
    import { session } from "$app/stores";

    import type Game from "$lib/models/game.model";

    import type { Round } from "$lib/models/game.model";
import Icon from "@iconify/svelte";

    export let game: Game;
    export let round: Round;

    let href = `/game/${game.id}/round/${round.ordinal}`;
</script>


<div class="round">
    <a {href}>
        <b>Round {round.ordinal}</b>
    </a>
    <p>{round.title || "Unnamed Round"}</p>
    <p class="board-size">Board Size {round.board.rows.length} x {round.board.categories.length}</p>

    {#if $session.user?.id === game.author.id}
        <div class="round-controls">
            <a href={`${href}/edit`}><Icon icon="ci:edit" /></a>
            <button on:click={() => null}><Icon icon="bi:trash-fill" /></button>
        </div>
    {/if}
</div>

<style>
    .round {
        position: relative;
        flex: 1;
        max-width: max-content;
        padding: .5em;
        border: 1px solid lightgray;
        border-radius: .25em;
    }

    .board-size {
		color: gray;
		font-size: .9rem;
	}

    .round-controls {
        display: none;
        position: absolute;
        top: 0;
        right: .3em;
        transform: translateY(-50%);
        border: 1px solid lightgray;
        background-color: lightgray;
        z-index: 1;
        border-radius: .25em;
        overflow: hidden;
    }

    .round-controls > * {
        background-color: white;
        flex: 1;
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: none;
        font-size: 1.2rem;
        padding: .1em;
    }

    .round:hover .round-controls, 
    .round:focus-within .round-controls {
        display: grid;
        grid-auto-flow: column;
        gap: 1px;
    }
</style>