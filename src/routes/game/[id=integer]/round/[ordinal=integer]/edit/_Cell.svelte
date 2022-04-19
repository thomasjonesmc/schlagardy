<script lang="ts">
    import type { Board, Category, Cell } from "$lib/models/game.model";
    import { getCellClass } from "../_util";
    import Dialog from "./_Dialog.svelte";

    export let board: Board;
    export let cell: Cell;
    export let row: number;
    export let col: number;

    export let showQuestions: boolean;

    let cat = board.categories[col];
    let rowVal = board.rows[row];
    let numRows = board.rows.length;
    let numCols = board.categories.length;

    let dialog;

    function openModal() {
        dialog.showModal();
    }

    function onDragStart(e) {
        e.dataTransfer.setData("cell", JSON.stringify(cell));
        e.dataTransfer.setData("row", row);
        e.dataTransfer.setData("col", col);
    }

    function onDrop(e) {
        let r = parseInt(e.dataTransfer.getData("row"));
        let c = parseInt(e.dataTransfer.getData("col"));
        
        let dropCell = JSON.parse(e.dataTransfer.getData("cell"));
        board.categories[c].cells[r] = cell;
        cell = dropCell;
    }

</script>

<div
    class={`cell ${getCellClass(cell, board, row, col)}`}
    draggable={true}
    on:dragstart={onDragStart}
    on:dragover|preventDefault
    on:drop|preventDefault={onDrop}
>
    <button
        class="cell-btn"
        on:click={openModal} 
        type="button"
    >
        {#if cell.question && showQuestions}
            <p>{cell.question}</p>
        {:else if cell.answer && !showQuestions}
            <p>{cell.answer}</p>
        {:else}
            <p>{rowVal}</p>
        {/if}
    </button>
</div>

<Dialog
    bind:dialog
    bind:cell
    id={`dialog-${row}${col}`} 
    {cat}
    {rowVal}
/>

<style>
    .cell {
        position: relative;
        display: flex;
        cursor: move;
        min-width: 0;
        flex: 1;
        text-align: center;
        transition: transform .2s ease-in-out;
    }

    .cell-btn {
        color: inherit;
        background-color: inherit;
        border: none;
        overflow: hidden;
        width: 100%;
        height: 100%;
        cursor: inherit;
    }

    .cell p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .finished {
        background-color: lightgreen;
        color: green;
    }

    .unfinished {
        background-color: rgb(255, 191, 191);
        color: rgb(167, 30, 30);
    }

    .in-progress {
        background-color: rgb(248, 248, 103);
        color: rgb(80, 80, 0);
    }
</style>