<script lang="ts">
    import Button from "$lib/components/Buttons/Button.svelte";
    import CheckBoxRow from "$lib/components/Form/CheckBoxRow.svelte";
    import InputRow from "$lib/components/Form/InputRow.svelte";
    import type { Category, Cell } from "$lib/models/game.model";

    export let id: string;
    export let cat: Category;
    export let cell: Cell;
    export let rowVal: number;

    export let dialog;

    function closeModal() {
        dialog.close();
    }
</script>

<dialog bind:this={dialog} {id}>
    <div class="edit-container">
        <h2>{cat.category || "Unnamed Category"} - {rowVal}</h2>
        
        <InputRow id="question" bind:value={cell.question} />
        <InputRow id="answer" bind:value={cell.answer} />
        <CheckBoxRow id="is-daily-double" bind:checked={cell.isDailyDouble} />
        
        <Button on:click={closeModal}>Close</Button>
    </div>
</dialog>

<style>
    dialog {
        margin: auto;
        border: none;
        border-radius: .25em;
    }
    
    .edit-container {
        padding: 2em;
        display: grid;
        gap: 1em;
    }

    dialog::backdrop {
        background-color: black;
        opacity: .75;
    }
</style>