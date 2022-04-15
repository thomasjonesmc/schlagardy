<script lang="ts">
    import type { Board, Category, Cell } from "$lib/models/game.model";
    import { onMount } from "svelte";
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
</script>

<button 
    on:click={openModal} 
    draggable={true}
    on:dragstart
    on:dragover|preventDefault
    on:drop|preventDefault
    class={`cell ${getCellClass(cell)}`}
    type="button"
>
    {#if cell.question}
        <p>{cell.question}</p>
    {:else}
        <p>{rowVal}</p>
    {/if}
</button>

<Dialog
    bind:dialog
    bind:cell
    id={`dialog-${row}${col}`} 
    {cat}
    {rowVal}
/>

<style>
     .cell {
        background-color: white;
        padding: 1em;
        flex: 1;
        text-align: center;
        color: gray;
        border: none;
        overflow: hidden;
        transition: transform .2s ease-in-out;
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