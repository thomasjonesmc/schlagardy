<script lang="ts">
    import { goto } from "$app/navigation";
    import { session } from "$app/stores";
    import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
    import Form from "$lib/components/Form/Form.svelte";
    import InputRow from "$lib/components/Form/InputRow.svelte";
    import RangeRow from "$lib/components/Form/RangeRow.svelte";

    let error = null;
    let submitting = false;
    let game = $session.game;

    let title = "";
    let rows = 5;
    let cols = 6;

    async function onCreate() {

        if (!title) return error = "Title Required";

        // order new round at very end
        let ordinal = game.rounds.length + 1;

        // insert the game
        const response = await fetch(`/api/game/${game.id}/round`, {
            method: "POST",
            body: JSON.stringify({ title, ordinal, rows, cols })
        });

        const [newRound] = await response.json();

        // add the rounds to the game
        if (response.ok) {
            $session.game.rounds = [ ...game.rounds, newRound ]
        }

        goto(`/game/${game.id}/round/${ordinal}/edit`);
    }
</script>



<Form on:submit={onCreate} title="Create Round" style="width: 100%;">
    
    <InputRow id="title" bind:value={title} />
    
    <RangeRow id="rows" label="Number of Rows" min={1} max={15} bind:value={rows} />
    <RangeRow id="rows" label="Number of Columns" min={1} max={15} bind:value={cols} />

    {#if error}
        <div style="color: red;">{error}</div>
    {/if}
    
    
    <SubmitButton disabled={submitting}>Submit</SubmitButton>
    
    <a href={`/game/${game.id}`}>Back to Game</a>
    <div 
        id="sample-board"
        style={`
            grid-template-rows: repeat(${rows}, minmax(15px, 1fr));
            grid-template-columns: repeat(${cols}, minmax(15px, 1fr));
        `}
    >
        {#each Array.from(Array(rows * cols)) as ele}
            <div></div>
        {/each}
    </div>
</Form>

<style>
    a {
        justify-self: center;
    }

    #sample-board {
        display: grid;
        background-color: var(--clr-bg-dark);
        border: 1px solid var(--clr-bg-dark);
        gap: 1px;
        justify-self: center;
        /* width: 100%; */
    }

    #sample-board div {
        background-color: var(--clr-bg-accent);
    }
</style>