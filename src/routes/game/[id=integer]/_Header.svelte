<script lang="ts">

    import { session } from "$app/stores";
    import { date } from "$lib/util";
    import Icon from "@iconify/svelte";

</script>


<header>
	<h1>{$session.game.title}</h1>
	<div id="sub-header">
		<p>{$session.game.play_count} Plays</p>
		<Icon icon="ci:dot-03-m" />
		<p>{date($session.game.created_at)}</p>
	</div>
</header>


<style>
	header {
		border-bottom: 1px solid lightgray;
		padding-bottom: .5em;
	}

	#sub-header {
		color: gray;
		display: flex;
		font-size: .9rem;
		align-items: center;
		gap: .25em;
	}
</style>