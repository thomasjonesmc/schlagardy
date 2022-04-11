<script lang="ts">
    import { session } from "$app/stores";
    import Button from "$lib/components/Buttons/Button.svelte";
import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
import CheckBoxRow from "$lib/components/Form/CheckBoxRow.svelte";
import Form from "$lib/components/Form/Form.svelte";
import InputRow from "$lib/components/Form/InputRow.svelte";
    import { Board, Cell } from "$lib/models/game.model";
    import { clear_loops } from "svelte/internal";

    export let rows = 5;
    export let cols = 5;

    export let board: Board = new Board(rows, cols);

    export let startVal = 200;
    export let increment = startVal;

    let cell: Cell = null;
    
    let edit = {
        cell: null,
        row: null,
        col: null
    }

    function openCell(cell: Cell, row: number, col: number) {
        edit = { cell, row, col };
    }

    function closeCell() {
        edit.cell = null;
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
            <button on:click={() => openCell(cell, j, i)} class="cell">
                {j * increment + startVal}
            </button>
        {/each}
    {/each}
</div>

{#if edit.cell}
    <div id="modal">
        <Form 
            on:submit={closeCell} 
            style="background-color: white; padding: 3em; border-radius: 1em;"
        >
            <h2>{board.categories[edit.col].category || "Unnamed Category"} - {edit.row * increment + startVal}</h2>

            <InputRow id="question" bind:value={board.categories[edit.col].cells[edit.row].question} />
            <InputRow id="answer" bind:value={board.categories[edit.col].cells[edit.row].answer} />
            <CheckBoxRow id="is-daily-double" bind:checked={board.categories[edit.col].cells[edit.row].isDailyDouble} />

            <SubmitButton>Close</SubmitButton>
        </Form>
    </div>
{/if}

<style>
    #board {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: 50px repeat(5, 1fr);
        overflow-x: auto;
        max-width: 800px;
        margin: auto;
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
    }

    .cell {
        background-color: white;
        padding: 1em;
        flex: 1;
        text-align: center;
        color: gray;
        border: none;
    }

    .cell:hover {
        background-color: lightgray;
    }

    #modal {
        position: absolute;
        display: grid;
        place-content: center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(55, 55, 55, .8);
    }

    #modal-content {
        background-color: white;
        padding: 1em;
    }
</style>