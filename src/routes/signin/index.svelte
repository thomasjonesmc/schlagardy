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

    let submitting = false;
    let email = "";
    let password = "";
    let err = null;

    async function signIn() {
        
        if (!email || !password) return;

        submitting = true;
        
        const { user, error } = await post(`/api/auth/signin${$page.url.search}`, { email, password });
        
        if (error) return err = error;

        $session.user = user;
        
        submitting = false;
    }
</script>

<Form on:submit={signIn} title="Sign In" style="width: 100%;">
    <EmailRow bind:value={email} />
    <PasswordRow bind:value={password} />
    
    {#if err}
        <div style="color: red;">{err}</div>
    {/if}
    
    <SubmitButton disabled={submitting}>Submit</SubmitButton>
</Form>