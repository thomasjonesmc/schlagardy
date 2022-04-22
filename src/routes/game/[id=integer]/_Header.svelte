<script lang="ts">
	import type Game from "$lib/models/game.model";
    import { date } from "$lib/util";
    import Icon from "@iconify/svelte";

	export let game: Game;
</script>


<header>
	<h1>{game.title}</h1>
	<div id="sub-header">
		<p>{game.play_count} Plays</p>
		<Icon icon="ci:dot-03-m" />
		<p>{date(game.created_at)}</p>
	</div>
</header>


<style>
	header {
		border-bottom: 1px solid var(--clr-bg-dark);
		padding-bottom: .5em;
	}

	#sub-header {
		color: var(--clr-font-accent);
		display: flex;
		font-size: .9rem;
		align-items: center;
		gap: .25em;
	}
</style>