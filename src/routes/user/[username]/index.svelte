<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export function goHome() {
		goto('/');
	}
</script>

<div>{$page.params.username}</div>
<button on:click={goHome}> Go Home! </button>
<a href="/">Home</a>
