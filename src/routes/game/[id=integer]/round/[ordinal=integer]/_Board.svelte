<script lang="ts">
    import type { Board } from "$lib/models/game.model";
import Icon from "@iconify/svelte";
    import CellComponent from "./_Cell.svelte";
    export let board: Board;
</script>

<div 
    id="board"
    style={`
        grid-template-rows: repeat(${board.rows.length + 1}, 1fr);
        grid-template-columns: 50px repeat(${board.categories.length}, 1fr);
    `}
>
    <div class="row-cell"></div>
    {#each board.rows as row}
        <div class="row-cell">
            <input placeholder="value" bind:value={row} />

            <div class="controls">
                <button>
                    <Icon icon="tabler:row-insert-bottom" />
                </button> <button>
                    <Icon icon="tabler:row-insert-bottom" />
                </button>
            </div>
        </div>
    {/each}

    {#each board.categories as cat, col}
        <div class="col-cell">
            <input placeholder="Category Name" bind:value={cat.category} />
        
            <div class="controls">
                <button>
                    <Icon icon="tabler:row-insert-bottom" />
                </button> <button>
                    <Icon icon="tabler:row-insert-bottom" />
                </button>
            </div>
        </div>
        {#each cat.cells as cell, row}
            <CellComponent 
                bind:cell
                bind:board
                {row} {col} {cat} 
                rowVal={board.rows[row]}
            />
        {/each}
    {/each}
</div>

<!-- <pre>{JSON.stringify(board, null, 4)}</pre> -->

<style>
    #board {
        flex: 1;
        display: grid;
        grid-auto-flow: column;
        position: relative;
        /* grid-template-rows: repeat(6, 1fr);
        grid-template-columns: 50px repeat(6, 1fr); */
        /* overflow-x: auto; */
        background-color: black;
        gap: 2px;
        border: 2px solid black;
        box-shadow: 0 0 1em 0 gray;
        border-radius: .25em;
        width: 100%;
    }

    .row-cell, .col-cell {
        display: grid;
        position: relative;
        background-color: green;
    }

    .row-cell:hover .controls,
    .col-cell:hover .controls {
        display: flex;
    }

    .controls {
        position: absolute;
        display: none;
        border-radius: .25em;
        border: 1px solid rgb(20, 20, 20);
        background-color: rgb(43, 43, 43);
        color: rgb(189, 189, 189);
        right: 0;
        transform: translateY(-50%) translateX(50%);
        position: absolute;
        font-size: large;
        overflow: hidden;
        z-index: 2;
    }

    .controls button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: x-large;
        color: inherit;
        background-color: inherit;
        border: none;
    }

    input {
        display: inline-block;
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>