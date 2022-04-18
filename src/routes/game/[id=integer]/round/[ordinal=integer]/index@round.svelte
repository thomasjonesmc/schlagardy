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
    import { session } from "$app/stores";
	import { scale } from 'svelte/transition';    
    import type { Cell, Round } from "$lib/models/game.model";
    import type Game from "$lib/models/game.model";
    import { getCellClass } from "./_util";
    import Board from "./edit/_Board.svelte";
    import Icon from "@iconify/svelte";


    export let numRows: number;
    export let numCols: number;
    export let round: Round;

    let board = round.board;
    // export let game: Game;
    let overlay = null;
    let showQuestion = true;
    let spin = false;

    let cell: Cell = null;

    $: disabled = !!cell;

    function showAnswer() {
        if (spin) return;

        spin = !spin;
        showQuestion = !showQuestion;

        setTimeout(() => {
            spin = !spin;
        }, 750);

    }

    function closeOverlay() {
        showQuestion = true;
        cell = null;
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
                <div class={`cell ${getCellClass(cl, board, r, c)}`}>
                    <button on:click={() => cell = cl} {disabled}>
                        <p>{round.board.rows[r]}</p>
                    </button>
                </div>
            {/each}
        {/each}

    </div>
    {#if cell}
        <div id="overlay" class:spin transition:scale|local={{duration: 1000}}>
            <button id="exit-button" on:click={closeOverlay} disabled={spin}>
                <Icon icon="heroicons-solid:x" />
            </button>

            <button id="overlay-toggle" on:click={showAnswer}>
                {#if showQuestion}
                    <p>{cell.question || "No Question"}</p>
                {:else}
                    <p>{cell.answer || "No Answer"}</p>
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

    .cell, .category {
        text-align: center;
        background-color: hsl(200, 15%, 15%);
        font-size: 2rem;
        font-weight: bold;
    }
    
    .cell p, .category p {
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

    .question {
        transition: transform .2s ease-out;
    }

    .question:hover {
        z-index: 1;
        transform: scale(1.2);
        box-shadow: 0 0 1em 0 black;
        border-radius: .25em;
        overflow: hidden;
    }

    .cell button {
        border-radius: 0;
        border: none;
        background-color: inherit;
        color: inherit;
        width: 100%;
        height: 100%;
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

    .top-half, .bottom-half {
        flex: 1;
        padding: 1em;
        display: flex;
        justify-content: center;
    }

    .top-half {
        align-items: flex-end;
        background-color: green;
    }

    .bottom-half {
        background-color: red;
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