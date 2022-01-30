<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$lib/utils';
	import '../app.css';

	async function signOut(): Promise<void> {
		await post('/api/auth/signout');
		$session.user = null;
		goto('/');
	}
</script>

<header>
	<div class="header-content">
		<a href="/">
			<img src="/schlagardy-logo.png" alt="Schlagardy logo" class="header-logo" />
		</a>
		<nav>
			{#if !$session.user}
				<a class="nav-link" href="/signup">Sign Up</a>
				<a class="nav-link" href="/signin">Sign In</a>
			{:else}
				<button on:click={signOut}>Sign Out</button>
			{/if}
		</nav>
	</div>
</header>

<main>
	<slot />
</main>

<footer>This is the footer</footer>

<style>
	header {
		background-color: rgb(22, 22, 129);
		padding: 1em;
		display: flex;
		justify-content: center;
	}

	.header-content {
		width: 70vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fee964;
		gap: 1em;
	}

	.header-logo {
		height: 28px;
		cursor: pointer;
	}

	nav {
		display: flex;
		gap: 20px;
	}

	.nav-link {
		text-decoration: none;
		color: #fee964;
	}

	footer {
		display: flex;
		justify-content: center;
		background-color: rgb(22, 22, 129);
		color: #fee964;
		padding: 1em;
	}

	main {
		flex: 1;
		height: 100%;
		width: 70vw;
		margin: 0 auto;
	}
</style>
