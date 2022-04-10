<script lang="ts" context="module">
    export function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: `/`
			};
		}

		return {};
	}
</script>

<script>
    import { goto } from "$app/navigation";
    import { session } from "$app/stores";
    import { post } from "$lib/util";
    import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";

    let submitting = false;
    let email = "";
    let password = "";
    let error = null;

    async function signIn() {
        
        if (!email || !password) return;

        submitting = true;
        
        const { user, message } = await post("auth/signin", { email, password });
        
        if (message) return error = message;

        $session.user = user;
        
        submitting = false;
        goto("/");
    }
</script>


<form on:submit|preventDefault={signIn}>
    <h1>Sign In</h1>

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} />
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} />
    </div>

    {#if error}
        <div style="color: red;">{error}</div>
    {/if}

    <SubmitButton disabled={submitting}>Submit</SubmitButton>
</form>

<style>
    h1 {
        text-align: center;
    }

    form {
        display: grid;
        gap: 1em;
        margin: 0 auto;
        max-width: 400px;
        padding: 1em;
    }

    form div {
        display: grid;
    }
</style>