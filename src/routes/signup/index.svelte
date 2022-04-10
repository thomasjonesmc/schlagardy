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
    import Form from "$lib/components/Form/Form.svelte";
    import InputRow from "$lib/components/Form/InputRow.svelte";
    import EmailRow from "$lib/components/Form/EmailRow.svelte";
    import PasswordRow from "$lib/components/Form/PasswordRow.svelte";
    import User from "$lib/models/user.model";
    import CheckBoxRow from "$lib/components/Form/CheckBoxRow.svelte";

    let submitting = false;

    let newUser = {
        email: "",
        password: "",
        displayName: "",
        username: "",
        public: false
    }

    let error = null;

    async function signUp() {
        
        for (let prop in newUser) {
            if (!newUser[prop]) return error = "All Fields Required";
        }

        submitting = true;

        const { user, message } = await post("auth/signup", newUser);
        
        if (message) {
            submitting = false;
            return error = message;
        }

        $session.user = new User(user);
        
        submitting = false;
        goto("/");
    }
</script>


<Form on:submit={signUp} title="Sign Up">
    <EmailRow bind:value={newUser.email} />
    <PasswordRow bind:value={newUser.password} />
    <InputRow id="username" bind:value={newUser.username} />
    <InputRow id="display-name" bind:value={newUser.displayName} />
    <CheckBoxRow id="make-account-public" bind:checked={newUser.public} />

    {#if error}
        <div style="color: red;">{error}</div>
    {/if}

    <SubmitButton disabled={submitting}>Submit</SubmitButton>
</Form>

<!-- <pre>{JSON.stringify(newUser, null, 4)}</pre> -->