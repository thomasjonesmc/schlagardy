<script lang="ts">
    import { Board, Cell } from "$lib/models/game.model";
    import CellComponent from "./_Cell.svelte";
    export let rows = 5;
    export let cols = 5;

    export let board: Board = new Board(rows, cols);

    export let startVal = 200;
    export let increment = startVal;

    let dragStartRow: number;
    let dragStartCol: number;

    function getCell(row: number, col: number) {
        return board.categories[col].cells[row];
    }

    function setCell(row: number, col: number, cell: Cell) {
        board.categories[col].cells[row] = cell;
    }

    function onDragStart(row: number, col: number) {
        dragStartRow = row;
        dragStartCol = col;
    }

    function onDrop(row: number, col: number) {
        let dropCell = getCell(row, col);
        setCell(row, col, getCell(dragStartRow, dragStartCol));
        setCell(dragStartRow, dragStartCol, dropCell);
    }
</script>

<div id="board">
    <div class="row-value"></div>
    <div class="row-value">200</div>
    <div class="row-value">400</div>
    <div class="row-value">600</div>
    <div class="row-value">800</div>
    <div class="row-value">1000</div>

    {#each board.categories as cat, col}
        <div class="category">
            <input placeholder="Category Name" bind:value={cat.category} />
        </div>
        {#each cat.cells as cell, row}
            <CellComponent 
                bind:cell 
                {row} {col} {cat} {board} 
                rowVal={row * increment + startVal}
                on:dragstart={() => onDragStart(row, col)}
                on:drop={() => onDrop(row, col)}
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
</style>