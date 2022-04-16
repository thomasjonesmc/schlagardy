<script lang="ts">
    import type { Board, Category, Cell } from "$lib/models/game.model";
import Icon from "@iconify/svelte";
    import Dialog from "./_Dialog.svelte";

    export let board: Board;
    export let cat: Category;
    export let cell: Cell;
    export let row: number;
    export let col: number;
    export let rowVal: number;

    let dialog;

    function openModal() {
        dialog.showModal();
    }

    function getCellClass(cell) {

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
    class={`cell ${getCellClass(cell)}`}
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
        {#if cell.question}
            <p>{cell.question}</p>
        {:else}
            <p>{rowVal}</p>
        {/if}
    </button>

    <div class="cell-controls">
        <button>
            <Icon icon="tabler:row-insert-bottom" />
        </button>
        <button>
            <Icon icon="tabler:column-insert-right" />
        </button>
    </div>
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

    .cell-controls {
        display: none;
        right: 1em;
        border-radius: .25em;
        border: 1px solid rgb(20, 20, 20);
        background-color: rgb(43, 43, 43);
        color: rgb(189, 189, 189);
        transform: translateY(-50%);
        position: absolute;
        font-size: large;
        overflow: hidden;
    }

    .cell-controls button {
        padding: .1em;
        color: inherit;
        background-color: inherit;
        border: none;
    }

    .cell-controls button:hover {
        filter: brightness(120%);
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

    .cell:hover {
        z-index: 999999;
        /* transform: scale(1.2); */
        box-shadow: 0 0 1em 0 black;
    }

    .cell:hover .cell-controls {
        display: flex;
    }
</style>