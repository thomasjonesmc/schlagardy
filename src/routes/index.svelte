<script context="module">
    export async function load({ params, fetch, session, stuff }) {

        if (false) {
			return {
				status: 302,
				redirect: `/`
			};
		}

        const res = await fetch("/api");
        const { name, age } = await res.json();

        return {
            props: {
                name,
                age
            }
        }
    }
</script>

<script>
    import { session } from "$app/stores";

    let count = 0;
    export let name;
    export let age;
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>Name: {name}</p>
<p>Age: {age}</p>

{#if $session.user}
    <p>User: {$session.user.email}</p>
{/if}

<button on:click={() => count++}>
    Click Me! {count}
</button>