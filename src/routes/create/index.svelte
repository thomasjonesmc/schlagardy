<script lang="ts" context="module">
    export function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: `/signin?goto=/create`
			};
		}

		return {};
	}
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";

	import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
	import CheckBoxRow from "$lib/components/Form/CheckBoxRow.svelte";
	import Form from "$lib/components/Form/Form.svelte";
	import InputRow from "$lib/components/Form/InputRow.svelte";
	import TextAreaRow from "$lib/components/Form/TextAreaRow.svelte";
	import type Game from "$lib/models/game.model";
	import { post } from "$lib/util";

	let jeopardy = {
		title: '',
		description: '',
		public: true,
		userId: $session.user.id
	}

	let error = null;
	let submitting = false;

	async function onSubmit() {
		if (!jeopardy.title) return error = "Title is required";

		submitting = true;

		const createdGame: Game = await post("/api/game", jeopardy);

		$session.game = createdGame;

		goto(`/game/${createdGame.id}`)

		submitting = false;
	}
</script>

<Form on:submit={onSubmit} title="Create New Game" style="width: 100%;">
	<InputRow id="title" bind:value={jeopardy.title} />
	<TextAreaRow id="description" bind:value={jeopardy.description} />
	<CheckBoxRow id="public" bind:checked={jeopardy.public} />

	{#if error}
		<div style="color: red;">{error}</div>
	{/if}

	<SubmitButton disabled={submitting}>Submit</SubmitButton>
</Form>

<style>

</style>