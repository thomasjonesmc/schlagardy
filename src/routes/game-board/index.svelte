<script lang="ts">
	import { gameBoard } from '$lib/mock-objects/mockGameBoard';
	import type { Question, SchlagardyBoard } from '$lib/models/SchlagardyBoard';

	const mockGameBoard: SchlagardyBoard = gameBoard;

	function showQuestion(question: Question) {
		alert(`${question.question}`);
	}
</script>

<h1>{mockGameBoard.boardName}</h1>
<div class="game-board">
	{#each mockGameBoard.schlagardyCategories as category}
		<div class="category-column">
			<div class="category-name">
				<h3>{category.name}</h3>
			</div>
			{#each category.questions as question}
				<div class="question" on:click={() => showQuestion(question)}>
					<p>${question.value}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.game-board {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.category-column {
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #0e25a5;
		color: #debe85;
	}

	.category-name {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 90px;
		text-transform: uppercase;
	}

	.question {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		border: 2px solid black;
		font-weight: 700;
		font-size: 2rem;
	}
</style>
