<script lang="ts">
    import { Board, Cell } from "$lib/models/game.model";
    import Dialog from "./_Dialog.svelte";

    export let rows = 5;
    export let cols = 5;

    export let board: Board = new Board(rows, cols);

    export let startVal = 200;
    export let increment = startVal;

    function openModal(col, row) {
        // of type HTMLDialogElement. Currently deprecated
        const dialog = document.querySelector(`#dialog-${col}${row}`);
        // @ts-ignore
        dialog.showModal();
    }

    function getCellClass(cell: Cell, row: number, col: number) {

        let cssClass = "";

        let firstCol = col === 0;
        let lastCol = col === board.categories.length - 1;
        let firstRow = row === 0;
        let lastRow = row === board.categories[0].cells.length - 1;

        if (firstRow && firstCol) cssClass += "tl-cell ";
        else if (firstRow && lastCol) cssClass += "tr-cell ";
        else if (lastRow && firstCol) cssClass += "bl-cell ";
        else if (lastRow && lastCol) cssClass += "br-cell ";

        else if (firstCol) cssClass += "first-category ";
        else if (lastCol) cssClass += "last-category "

        else if (firstRow) cssClass += "first-row ";
        else if (lastRow) cssClass += "last-row ";

        if (!cell.question && !cell.answer) cssClass += "unfinished ";
        else if (cell.question && cell.answer) cssClass += "finished ";
        else cssClass += "in-progress ";

        return cssClass;
    }

</script>

<div id="board">
    <div class="row-value"></div>
    <div class="row-value">200</div>
    <div class="row-value">400</div>
    <div class="row-value">600</div>
    <div class="row-value">800</div>
    <div class="row-value">1000</div>

    {#each board.categories as cat, i}
        <div class="category">
            <input placeholder="Category Name" bind:value={cat.category} />
        </div>
        {#each cat.cells as cell, j}
            <button 
                on:click={() => openModal(i, j)} 
                class={`cell ${getCellClass(cell, j, i)}`} 
                type="button"
            >
                {#if cell.question}
                    <p>{cell.question}</p>
                {:else}
                    {j * increment + startVal}
                {/if}
            </button>

            <Dialog
                bind:cell
                id={`dialog-${i}${j}`} 
                {cat}
                row={j * increment + startVal}
            />
        {/each}
    {/each}
</div>

<style>
    #board {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: 50px repeat(5, 1fr);
        overflow-x: auto;
        background-color: gray;
        gap: 2px;
        border: 2px solid gray;
        box-shadow: 0 0 1em 0 gray;
        border-radius: .25em;
    }

    .row-value {
        display: grid;
        place-content: center;
        background-color: white;
    }

    
    input {
        display: inline-block;
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .cell {
        background-color: white;
        padding: 1em;
        flex: 1;
        text-align: center;
        color: gray;
        border: none;
        overflow: hidden;
        transition: all .2s ease-in-out;
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

    .first-category {
        transform-origin: left;
    }

    .last-category {
        transform-origin: right;
    }

    .first-row {
        transform-origin: top;
    }

    .last-row {
        transform-origin: bottom;
    }

    .tl-cell {
        transform-origin: top left;
    }

    .tr-cell {
        transform-origin: top right;
    }

    .bl-cell {
        transform-origin: bottom left;
    }

    .br-cell {
        transform-origin: bottom right;
    }

    .cell p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .cell:hover {
        transform: scale(1.2);
        box-shadow: 0 0 1em 0 black;
    }
</style>