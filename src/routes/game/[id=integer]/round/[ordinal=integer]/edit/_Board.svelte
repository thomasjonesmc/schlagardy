<script lang="ts">
    import { Category, Cell, type Board } from "$lib/models/game.model";
    import Icon from "@iconify/svelte";
    import CellComponent from "./_Cell.svelte";

    export let board: Board;
    export let ordinal: number;

    function editRow(row: number, removeAmount=0) {

        if (removeAmount === 0) {
            board.rows.splice(row, removeAmount, board.rows[row] || 100 * ordinal);
        } else {
            board.rows.splice(row, removeAmount);
        }

        board.rows = board.rows;

		board.categories = board.categories.map(c => {

            if (removeAmount === 0) {
                c.cells.splice(row, removeAmount, new Cell());
            } else {
                c.cells.splice(row, removeAmount);
            }

            return {
                ...c,
                cells: c.cells
            }
		});
    }

    function addRow(row: number) {
        editRow(row + 1);
	}

    function deleteRow(row: number) {
        editRow(row, 1);
    }

	function addCol(col: number) {
		board.categories.splice(
            col + 1, 0, new Category(board.rows.length)
        );

        board.categories = board.categories;
	}

    function deleteCol(col: number) {
        board.categories.splice(col, 1);
        board.categories = board.categories;
    }
</script>


<div 
    id="board"
    style={`
        grid-template-rows: repeat(${board.rows.length + 1}, 1fr);
        grid-template-columns: 50px repeat(${board.categories.length}, 1fr);
    `}
>
    <div class="row-cell">
        <div class="controls">
            <button type="button" on:click={() => addRow(-1)}>
                <Icon icon="tabler:row-insert-bottom" />
            </button>
            <button type="button" on:click={() => addCol(-1)}>
                <Icon icon="tabler:column-insert-right" />
            </button> 
        </div>
    </div>
    {#each board.rows as row, i}
        <div class="row-cell">
            <input placeholder="value" bind:value={row} class:empty={isNaN(parseFloat(row.toString()))} />

            <div class="controls">
                <button type="button" on:click={() => deleteRow(i)}>
                    <Icon icon="ci:trash-full" />
                </button>
                <button type="button" on:click={() => addRow(i)}>
                    <Icon icon="tabler:row-insert-bottom" />
                </button> 
            </div>
        </div>
    {/each}

    {#each board.categories as cat, col}
        <div class="col-cell">
            <input placeholder="Category Name" bind:value={cat.category} class:empty={cat.category === ''}/>
        
            <div class="controls">
                <button type="button" on:click={() => deleteCol(col)}>
                    <Icon icon="ci:trash-full" />
                </button>
                <button type="button" on:click={() => addCol(col)}>
                    <Icon icon="tabler:column-insert-right" />
                </button> 
            </div>
        </div>
        {#each cat.cells as cell, row}
            <CellComponent 
                bind:cell
                bind:board
                {row} {col}
            />
        {/each}
    {/each}
</div>

<!-- <pre>{JSON.stringify(board, null, 4)}</pre> -->

<style>
    /* only exists to add padding to board so controls dont overflow screen */

    #board {
        flex: 1;
        display: grid;
        grid-auto-flow: column;
        position: relative;
        /* grid-template-rows: repeat(6, 1fr);
        grid-template-columns: 50px repeat(6, 1fr); */
        /* overflow-x: auto; */
        background-color: var(--clr-bg-dark);
        border: 2px solid var(--clr-bg-dark);
        gap: 2px;
        border-radius: .25em;
        width: 100%;
        height: 100%;
    }

    .row-cell, .col-cell {
        display: grid;
        position: relative;
        background-color: var(--clr-bg-accent);
    }

    .row-cell:hover .controls,
    .col-cell:hover .controls {
        display: flex;
        gap: 2px;
    }

    .controls {
        width: max-content;
        position: absolute;
        display: none;
        border-radius: .25em;
        border: 2px solid var(--clr-bg-dark);
        background-color: var(--clr-bg-dark);
        color: var(--clr-font-accent);
        right: 0;
        transform: translateY(-50%) translateX(20%);
        position: absolute;
        font-size: large;
        z-index: 2;
    }

    .controls button {
        background-color: var(--clr-bg-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: x-large;
        border: none;
    }

    input {
        display: inline-block;
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: var(--clr-bg-accent);
        color: var(--clr-font);
    }

    .empty {
        color: var(--clr-font-red);
    }
</style>