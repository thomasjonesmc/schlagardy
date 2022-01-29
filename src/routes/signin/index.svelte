<script context="module">
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
    import { post } from "$lib/utils";

    let submitting = false;
    let email = "";
    let password = "";

    async function signIn() {

        submitting = true;

        const { user } = await post("/api/auth/signin", { email, password });
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

    <button type="submit" disabled={submitting}>Submit</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        gap: 1em;
    }

    button {
        padding: .15em .5em;
        max-width: fit-content;
    }
</style>