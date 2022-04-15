<script lang="ts">
    import { Board, Cell } from "$lib/models/game.model";
    import CellComponent from "./_Cell.svelte";
    export let rows = 5;
    export let cols = 5;

    export let board: Board = new Board(rows, cols);

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

<div 
    id="board"
    style={`
        grid-template-rows: repeat(${board.rows.length + 1}, 1fr);
        grid-template-columns: 50px repeat(${board.categories.length}, 1fr);
    `}
>
    <div class="row-value"></div>
    {#each board.rows as row}
        <div class="row-value">
            <input placeholder="value" bind:value={row} />
        </div>
    {/each}

    {#each board.categories as cat, col}
        <div class="category">
            <input placeholder="Category Name" bind:value={cat.category} />
        </div>
        {#each cat.cells as cell, row}
            <CellComponent 
                bind:cell 
                {row} {col} {cat} {board} 
                rowVal={board.rows[row]}
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
        /* grid-template-rows: repeat(6, 1fr);
        grid-template-columns: 50px repeat(6, 1fr); */
        overflow-x: auto;
        background-color: gray;
        gap: 2px;
        border: 2px solid gray;
        box-shadow: 0 0 1em 0 gray;
        border-radius: .25em;
    }

    .row-value {
        display: grid;
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