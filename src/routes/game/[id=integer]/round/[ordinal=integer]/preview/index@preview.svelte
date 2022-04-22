<script lang="ts" context="module">
    export async function load({ session, fetch, params, stuff }) {
        return {
			props: {
				...stuff,
				game: session.game
			}
		};
	}
</script>


<script lang="ts">
	import { fly, scale, slide, fade } from 'svelte/transition';    
    import { flip } from 'svelte/animate';
    import type { Cell, Player, Round } from "$lib/models/game.model";
    import Icon from "@iconify/svelte";
    import CellComponent from './_Cell.svelte';
    import { beforeNavigate, goto } from '$app/navigation';
    import { session } from '$app/stores';
    import type Game from '$lib/models/game.model';
    import LinkButton from '$lib/components/Buttons/LinkButton.svelte';
    import { shuffle } from '$lib/util';
    import { onMount } from 'svelte';

    export let game: Game;
    export let ordinal: number;
    export let numRows: number;
    export let numCols: number;
    export let round: Round;

    // export let game: Game;
    let showQuestion = true;
    let spin = false;
    let activeCell: Cell = null;
    let activeRow: number;
    let activeCol: number;
    let showPlayers = true;
    let players = $session.players;

    $: disabled = !!activeCell;

    onMount(() => {
        players = Array(15).fill(0).map(() => {
            return { name: "", score: 0, id: Math.random() }
        })
    })

    function addPlayer() {
        players = [...players, { name: "", score: 0, id: Math.random() }]
    }

    function showAnswer() {

        round.board.categories[activeCol].cells[activeRow].opened = true;

        if (spin) return;

        spin = !spin;
        showQuestion = !showQuestion;

        setTimeout(() => {
            spin = !spin;
        }, 750);

    }

    function openOverlay(cell: Cell, r: number, c: number) {
        activeRow = r;
        activeCol = c;
        activeCell = cell;
    }

    function closeOverlay() {
        showQuestion = true;
        activeCell = null;
    }

    async function goPrevious() {
		goto(`/game/${game.id}/round/${ordinal - 1}/preview`);
	}

	async function goNext() {
		goto(`/game/${game.id}/round/${ordinal + 1}/preview`);
	}

</script>

<div id="page">

    <div id="page-left" transition:scale>

        <div 
            id="board"
            style={
                `grid-template-rows: repeat(${numRows + 1}, 1fr);
                grid-template-columns: repeat(${numCols}, 1fr);`
            }
        >

            {#each round.board.categories as cat, c}
                <div class="category">
                    <p>{cat.category}</p>
                </div>
                {#each cat.cells as cl, r}
                    <CellComponent
                        bind:cell={cl}
                        {round} {disabled}
                        row={r} col={c}
                        onClick={() => openOverlay(cl, r, c)} 
                    />
                {/each}
            {/each}

            
            {#if activeCell}

                <!-- <Overlay bind:activeCell bind:round {activeRow} {activeCol} /> -->

                <!-- nesting at this depth prevents transition bugs?? -->
                <div id="overlay" class:spin transition:scale={{duration: 1000}}>
                    <button id="exit-button" on:click={closeOverlay} disabled={spin}>
                        <Icon icon="heroicons-solid:x" />
                    </button>

                    <button id="overlay-toggle" on:click={showAnswer}>
                        {#if showQuestion}
                            <p>{activeCell.question || "No Question"}</p>
                        {:else}
                            <p>{activeCell.answer || "No Answer"}</p>
                        {/if}
                    </button>
                </div>
            {/if}
        </div>

        <div id="controls">
            <label for="show-players">Show Players</label>
            <input type="checkbox" id="show-players" bind:checked={showPlayers} />
            <LinkButton on:click={goPrevious} disabled={ordinal === 1}>
                Prev
            </LinkButton>
            <LinkButton on:click={goNext} disabled={ordinal === game.rounds.length}>
                Next
            </LinkButton>
        </div>

    </div>

    {#if showPlayers}
        <div id="page-right">
            <div id="player-controls">
                
                <button 
                    id="add-player"
                    on:click={addPlayer}
                >
                    <Icon icon="ant-design:user-add-outlined" />
                </button>
                
                <button on:click={() => players = shuffle(players)}>
                    <Icon icon='foundation:shuffle' />
                </button>
            </div>
            
            {#each players as p, i (p.id)}
                <div id="player-card" animate:flip={{duration: 1000}} transition:slide|local>
                    <!-- <label for={`player-${p.id}`}>Player {i + 1}</label> -->
                    <input id={`player-${p.id}`} type="text" bind:value={p.name} placeholder={`Player ${i + 1}`} />
                    <button 
                        id="delete-player" 
                        on:click={() => players = players.filter(ply => ply.id !== p.id)}
                    >
                        <Icon icon="bi:trash-fill" />
                    </button>
                    <input type="number" bind:value={p.score} step={100} placeholder="Score" />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    #page {
        display: flex;
        flex: 1;
        margin: 1em;
        color: var(--clr-font-accent);
        background-color: var(--clr-bg);
        border: 2px solid var(--clr-bg-dark);
        border-radius: .5em;
        overflow: auto;
    }

    #page-left {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    #page-right {
        padding: .5em;
        
        box-shadow: -10px 0px 10px -10px var(--clr-bg-dark);
        border-left: 2px solid var(--clr-bg-dark);
        
        display: flex;
        flex-direction: column;
        gap: 1.25em;

        overflow-y: auto;

        min-height: 0px;
    }

    #player-card {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--clr-bg-dark);
        background-color: var(--clr-bg-accent);
        padding: .5em;
        border-radius: .25em;
        gap: 1em;
        position: relative;
    }

    #player-controls {
        display: flex;
        gap: .5em;
    }

    #player-controls > button {
        font-size: xx-large;
        flex: 1;
        font-size: xx-large;
        border: none;
        border-radius: .1em;
        display: flex;
        justify-content: center;
        background-color: var(--clr-bg-accent);
        border: 1px solid var(--clr-bg-dark);
    }

    #delete-player {
        position: absolute;
        top: 0;
        right: 1em;
        transform: translateY(-50%);
        border-radius: 50%;
        border: none;
        background-color: var(--clr-bg-accent);
        color: var(--clr-font-accent);
        border: 1px solid var(--clr-bg-dark);
        padding: .5em;
    }

    #board {
        flex: 1;
        gap: 2px;
        display: grid;
        background-color: var(--clr-bg-dark);
        grid-auto-flow: column;
    }

    .category {
        text-align: center;
        background-color: var(--clr-bg);
        font-size: 2rem;
        font-weight: bold;
        position: sticky;
        top: 0;
    }
    
    .category p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category {
        display: grid;
        place-content: center;
    }

    #controls {
        display: flex;
        justify-content: center;
        background-color: var(--clr-bg);
        border-top: 2px solid var(--clr-bg-dark);
        padding: 1em;
        gap: 1em;
        position: sticky;
        bottom: 0;
    }

    #overlay {
        z-index: 500;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        opacity: 95%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        font-size: 5rem;
        color: white;
    }
    
    .spin {
        animation-name: spin;
        animation-duration: 750ms;
        /* animation-iteration-count: infinite; */
        animation-timing-function: linear;
    }

    #exit-button {
        position: absolute;
        top: 25px;
        right: 25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: xx-large;
        display: grid;
        place-content: center;
        color: var(--clr-font-dark);
        opacity: 100%;
        background-color: var(--clr-bg-light);
    }

    #overlay-toggle {
        width: 100%;
        height: 100%;
        background-color: inherit;
        color: inherit;
        border: none;
    }

    @keyframes spin {
        0% {
            transform: rotateY(0deg);
        }

        50% {
            transform: rotateY(180deg);
        }

        100% {
            transform: rotateY(360deg);
        }
    }
</style>