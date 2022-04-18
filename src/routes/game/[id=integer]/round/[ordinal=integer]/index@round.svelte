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

    export let round: Round;
    export let numRows: number;
    export let numCols: number;
    // export let game: Game;

    let cell: Cell = null;

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
            <div class="category cell">
                <p>{cat.category}</p>
            </div>
            {#each cat.cells as cl, r}
                <div class="cell question">
                    <button on:click={() => cell = cl}>
                        <p>{round.board.rows[r]}</p>
                    </button>
                </div>
            {/each}
        {/each}

    </div>
    {#if cell}
        <div id="overlay" transition:scale|local={{duration: 1000}}>
            HELLO
            <button on:click={() => cell = null}>Close</button>
            <p>{cell.question || "No Question"}</p>
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

    .cell {
        text-align: center;
        background-color: hsl(200, 15%, 15%);
        font-size: 2rem;
        font-weight: bold;
    }
    
    .cell p {
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
        opacity: 90%;
    }
</style>