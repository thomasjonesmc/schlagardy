<script context="module" lang="ts">
	export async function load({ params, fetch, session, stuff }): Promise<any> {
		if (false) {
			return {
				status: 302,
				redirect: `/`
			};
		}

		const res = await fetch('/api');
		const { name, age } = await res.json();

		return {
			props: {
				name,
				age
			}
		};
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import type { SchlagardyBoard } from '$lib/models/SchlagardyBoard';
	import { gameBoard } from '$lib/mock-objects/mockGameBoard';

	let count: number = 0;
	export let name: string;
	export let age: string;
</script>

<h1>Welcome to Schlagardy</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>Name: {name}</p>
<p>Age: {age}</p>

{#if $session.user}
	<p>User: {$session.user.email}</p>
{/if}

<button on:click={() => count++}>
	Click Me! {count}
</button>

<a href="/game-board">Go to the test board</a>
