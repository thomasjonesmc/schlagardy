<script lang="ts">
    import type { Cell, Round } from "$lib/models/game.model";
    import Icon from "@iconify/svelte";
    import { scale } from "svelte/transition";

    export let activeCol: number;
    export let activeRow: number;
    export let activeCell: Cell;
    export let round: Round;
    
    let showQuestion = true;
    let spin = false;

    function showAnswer() {

        round.board.categories[activeCol].cells[activeRow].opened = true;

        if (spin) return;

        spin = !spin;
        showQuestion = !showQuestion;

        setTimeout(() => {
            spin = !spin;
        }, 750);

    }

    function closeOverlay() {
        showQuestion = true;
        activeCell = null;
    }
</script>


<div id="overlay" class:spin transition:scale|local={{duration: 1000}}>
    <button id="exit-button" on:click={closeOverlay} disabled={spin}>
        <Icon icon="heroicons-solid:x" />
    </button>

    <button id="overlay-toggle" on:click={showAnswer}>
        {#if showQuestion}
            <p>{activeCell?.question || "No Question"}</p>
        {:else}
            <p>{activeCell?.answer || "No Answer"}</p>
        {/if}
    </button>

</div>


<style>
     #overlay {
        z-index: 2;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        opacity: 95%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        font-size: 5rem;

    }
    
    .spin {
        animation-name: spin;
        animation-duration: 750ms;
        /* animation-iteration-count: infinite; */
        animation-timing-function: linear;
    }

    #exit-button {
        position: absolute;
        top: 25px;
        right: 25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: xx-large;
        display: grid;
        place-content: center;
        color: black;
        opacity: 100%;
    }

    #overlay-toggle {
        width: 100%;
        height: 100%;
        background-color: inherit;
        color: inherit;
        border: none;
    }

    @keyframes spin {
        0% {
            transform: rotateY(0deg);
        }

        50% {
            transform: rotateY(180deg);
        }

        100% {
            transform: rotateY(360deg);
        }
    }
</style>