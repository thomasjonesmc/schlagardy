<script lang="ts">
	import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
	import CheckBoxRow from "$lib/components/Form/CheckBoxRow.svelte";
	import Form from "$lib/components/Form/Form.svelte";
	import InputRow from "$lib/components/Form/InputRow.svelte";
	import TextAreaRow from "$lib/components/Form/TextAreaRow.svelte";
	import type Game from "$lib/models/game.model";

	export let game: Game;
    export let onSubmit: () => Promise<void>;
    export let style = "";
	export let title: string = undefined;

	let error = null;
	let submitting = false;

	async function baseSubmit() {
		if (!game.title) return error = "Title is required";

		submitting = true;

		await onSubmit();

		submitting = false;
	}
</script>

<Form on:submit={baseSubmit} {title} style={`width: 100%;${style}`}>

	<slot></slot>

	<InputRow id="title" bind:value={game.title} />
	<TextAreaRow id="description" bind:value={game.description} />
	<CheckBoxRow id="public" bind:checked={game.is_public} />

	{#if error}
		<div style="color: red;">{error}</div>
	{/if}

	<SubmitButton disabled={submitting}>Submit</SubmitButton>
</Form>