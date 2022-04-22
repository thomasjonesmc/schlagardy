<script lang="ts">
	import { goto } from "$app/navigation";

    import Game from "$lib/models/game.model";
	import GameForm from "$lib/components/Game/GameForm.svelte";
	import { post } from "$lib/util";

	let game = new Game();

	async function onSubmit() {
		const createdGame: Game = await post("/api/game", game);
		goto(`/game/${createdGame.id}`)
	}
</script>

<GameForm title="Create New Game" {onSubmit} bind:game={game} />