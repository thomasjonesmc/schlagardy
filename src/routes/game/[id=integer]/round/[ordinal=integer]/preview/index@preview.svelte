<script lang="ts" context="module">
    export async function load({ session, fetch, params, stuff }) {
        return {
			props: {
				...stuff,
				game: session.game
			}
		};
	}
</script>


<script lang="ts">
	import { scale } from 'svelte/transition';    
    import type { Cell, Round } from "$lib/models/game.model";
    import Icon from "@iconify/svelte";
    import CellComponent from './_Cell.svelte';
    import { beforeNavigate, goto } from '$app/navigation';
    import { session } from '$app/stores';
    import type Game from '$lib/models/game.model';
import LinkButton from '$lib/components/Buttons/LinkButton.svelte';
import Overlay from './_Overlay.svelte';

    export let game: Game;
    export let ordinal: number;
    export let numRows: number;
    export let numCols: number;
    export let round: Round;

    // export let game: Game;
    let showQuestion = true;
    let spin = false;
    let activeCell: Cell = null;
    let activeRow: number;
    let activeCol: number;

    $: disabled = !!activeCell;

    // beforeNavigate(() => {
    //     $session.game.rounds[ordinal - 1] = round;
    // });

    function showAnswer() {

        round.board.categories[activeCol].cells[activeRow].opened = true;

        if (spin) return;

        spin = !spin;
        showQuestion = !showQuestion;

        setTimeout(() => {
            spin = !spin;
        }, 750);

    }

    function openOverlay(cell: Cell, r: number, c: number) {
        activeRow = r;
        activeCol = c;
        activeCell = cell;
    }

    function closeOverlay() {
        showQuestion = true;
        activeCell = null;
    }

    async function goPrevious() {
		ordinal--;
		goto(`/game/${game.id}/round/${ordinal}/preview`);
	}

	async function goNext() {
		ordinal++;
		goto(`/game/${game.id}/round/${ordinal}/preview`);
	}

</script>

<div id="page">
    <div 
        id="board"
        style={
            `grid-template-rows: repeat(${numRows + 1}, 1fr);
            grid-template-columns: repeat(${numCols}, 1fr);`
        }
    >

        {#each round.board.categories as cat, c}
            <div class="category">
                <p>{cat.category}</p>
            </div>
            {#each cat.cells as cl, r}
                <CellComponent
                    bind:cell={cl}
                    {round} {disabled}
                    row={r} col={c}
                    onClick={() => openOverlay(cl, r, c)} 
                />
            {/each}
        {/each}

    </div>

    <div id="controls">
        <LinkButton on:click={goPrevious} disabled={ordinal === 1}>
            Prev
        </LinkButton>
        <LinkButton on:click={goNext} disabled={ordinal === game.rounds.length}>
            Next
        </LinkButton>
    </div>

    {#if activeCell}

        <!-- <Overlay bind:activeCell bind:round {activeRow} {activeCol} /> -->

        <div id="overlay" class:spin transition:scale|local={{duration: 1000}}>
            <button id="exit-button" on:click={closeOverlay} disabled={spin}>
                <Icon icon="heroicons-solid:x" />
            </button>

            <button id="overlay-toggle" on:click={showAnswer}>
                {#if showQuestion}
                    <p>{activeCell.question || "No Question"}</p>
                {:else}
                    <p>{activeCell.answer || "No Answer"}</p>
                {/if}
            </button>

        </div>
    {/if}
</div>


<style>
    #page {
        flex: 1;
        display: flex;
        flex-direction: column;
        color: lightgray;
        background-color: hsl(200, 15%, 15%);
    }

    #board {
        flex: 1;
        gap: 2px;
        display: grid;
        background-color: black;
        grid-auto-flow: column;
    }

    .category {
        text-align: center;
        background-color: hsl(200, 15%, 15%);
        font-size: 2rem;
        font-weight: bold;
    }
    
    .category p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category {
        display: grid;
        place-content: center;
    }

    #controls {
        display: flex;
        justify-content: center;
        background-color: hsl(200, 15%, 15%);
        box-shadow: 0 -10px 5px -10px black;
        padding: 1em;
        gap: 1em;
    }

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