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
    import { page, session } from "$app/stores";
    import { post } from "$lib/util";
    import SubmitButton from "$lib/components/Buttons/SubmitButton.svelte";
    import Form from "$lib/components/Form/Form.svelte";
    import EmailRow from "$lib/components/Form/EmailRow.svelte";
    import PasswordRow from "$lib/components/Form/PasswordRow.svelte";
    import User from "$lib/models/user.model";

    let submitting = false;
    let email = "";
    let password = "";
    let error = null;

    const route = $page.url.searchParams.get("goto") || "/";

    async function signIn() {
        
        if (!email || !password) return;

        submitting = true;
        
        const { user, message } = await post("/api/auth/signin", { email, password });
        
        if (message) return error = message;

        $session.user = new User(user);
        
        submitting = false;
        goto(route);
    }
</script>

<Form on:submit={signIn} title="Sign In">
    <EmailRow bind:value={email} />
    <PasswordRow bind:value={password} />

    {#if error}
        <div style="color: red;">{error}</div>
    {/if}

    <SubmitButton disabled={submitting}>Submit</SubmitButton>
</Form>