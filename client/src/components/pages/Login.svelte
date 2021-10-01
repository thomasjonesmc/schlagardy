<script>
    import { navigate, link } from "svelte-routing";
    import Form from "../reusable/Form.svelte";
    import TextInput from "../reusable/TextInput.svelte";
    import PasswordInput from "../reusable/PasswordInput.svelte";
    import { user, accessToken } from "../../stores/user";
    import api from "../../api";

    let submitting = false;
    let error = null;

    let values = {
        identifier: '',
        password: ''
    };

    function submit() {
        submitting = true;

        api.loginUser(values)
        .then(({ accessToken: token, ...rest }) => {
            $accessToken = token;
            $user = rest;
            error = null;
            navigate("/");
        })
        .catch(err => error = err)
        .finally(() => submitting = false);
    }
</script>

<Form on:submit={submit} title="Login">
    <TextInput 
        label="Username or Email" 
        id="login-identifier" 
        bind:value={values.identifier}
    />
    <PasswordInput id="password" bind:value={values.password} />
    {#if error}<div class="error">{error}</div>{/if}
    <button type="submit" disabled={submitting}>Login</button>
    <a use:link href="/register">No Account? Register Here</a>
</Form>

<style>
    button {
        align-self: center;
    }

    a {
        color: var(--primary-color);
        font-size: .8em;
    }

    .error {
        text-transform: lowercase;
        color: red;
    }
</style>