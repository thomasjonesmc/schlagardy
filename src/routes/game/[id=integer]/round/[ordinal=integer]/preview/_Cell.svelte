<script lang="ts">
    import type { Cell, Round } from "$lib/models/game.model";
    import { onMount } from "svelte";
    import { getCellClass } from "../_util";


    export let disabled: boolean;
    export let cell: Cell;
    export let round: Round;
    export let row: number;
    export let col: number;
    export let onClick: () => void
</script>



<div class={`cell ${getCellClass(cell, round.board, row, col)}`} class:opened={cell.opened}>
    <button on:click={onClick} {disabled}>
        <p>{round.board.rows[row]}</p>
    </button>
</div>


<style>
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

    .cell button {
        border-radius: 0;
        border: none;
        background-color: inherit;
        color: inherit;
        width: 100%;
        height: 100%;
    }

    .opened {
        opacity: 30%;
    }

    .opened:hover {
        transform: none;
        box-shadow: none;
    }
</style>