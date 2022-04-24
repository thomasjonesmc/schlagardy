<script lang="ts" context="module">
	export function load({ stuff }) {
		return { props: { ...stuff } }
	}
</script>

<script lang="ts">
	import RoundsSection from "./_RoundsSection.svelte";
	import Options from "./_Options.svelte";
	import Header from "./_Header.svelte";
	import Description from "./_Description.svelte";
	import Page from "./_Page.svelte";
	import type Game from "$lib/models/game.model";

	export let game: Game;
	export let me: boolean;
</script>

<Page>
	<Header {game} />
	
	<Description {game} />
	
	<RoundsSection {game} {me} />
	
	<Options {game} {me} />
</Page>



