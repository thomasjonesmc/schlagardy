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

<script lang="ts">
    import { goto } from "$app/navigation";
    import { session } from "$app/stores";
    import { post } from "$lib/util";
    import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";

    let submitting = false;

    let newUser = {
        email: "",
        password: "",
        displayName: "",
        username: ""
    }

    let error = null;

    async function signUp() {
        
        for (let prop in newUser) {
            if (!newUser[prop]) return error = "All Fields Required";
        }

        submitting = true;
        
        console.log("START");

        const { user, message } = await post("auth/signup", newUser);

        console.log("STOP");
        
        if (message) return error = message;

        $session.user = user;
        
        submitting = false;
        goto("/");
    }
</script>


<form on:submit|preventDefault={signUp}>
    <h1>Sign Up</h1>

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={newUser.email} />
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={newUser.password} />
    </div>

    <div>
        <label for="username">Username</label>
        <input id="username" bind:value={newUser.username} />
    </div>

    <div>
        <label for="displayName">Display Name</label>
        <input id="displayName" bind:value={newUser.displayName} />
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