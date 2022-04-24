<script context="module" lang="ts">
	export async function load({ session, stuff, params }) {
		return {
			props: {
				me: stuff.me
			}
		}
	}
</script>

<script lang="ts">
	import RoundsSection from "../_RoundsSection.svelte";
	import Options from "../_Options.svelte";
	import Header from "../_Header.svelte";
	import Description from "../_Description.svelte";
	import { session } from "$app/stores";
	import Form from "$lib/components/Form/Form.svelte";
	import InputRow from "$lib/components/Form/InputRow.svelte";
	import Page from "../_Page.svelte";
	import type Game from "$lib/models/game.model";
	import GameForm from "$lib/components/Game/GameForm.svelte";
	import { put } from "$lib/util";
	import { beforeNavigate } from "$app/navigation";

	let game: Game = $session.game;
	let orig = { ...game };

	export let me: boolean;

	beforeNavigate(({from, to, cancel}) => {

		if (game.title !== orig.title ||
			game.description !== orig.description ||
			game.is_public !== orig.is_public)
		{
			// unsaved changes. very annoying during development
			// could probably do a .env.DEV check
			// cancel();
		} 
	});

	async function onSubmit() {
		await put(`/api/game/${game.id}`, game);
		orig = game;
	}
</script>


<Page>
	
	<GameForm
		{onSubmit} 
		bind:game={game} 
		style="max-width: 100%;"
	>
		<h1>
			<a href={`/game/${game.id}`}>Edit: {game.title}</a>
		</h1>
	</GameForm>

	<!-- <Header /> -->
	
	<!-- <Description /> -->
	
	<RoundsSection {game} {me} />
	
	<Options {game} {me} />

	<!-- <pre>{JSON.stringify(game, null, 4)}</pre> -->
</Page>

<style>

	h1 {
		overflow: hidden;
	}

	h1 a {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>