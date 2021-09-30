<script>
    import { navigate, link } from "svelte-routing";
    import Form from "../reusable/Form.svelte";
    import TextInput from "../reusable/TextInput.svelte";
    import PasswordInput from "../reusable/PasswordInput.svelte";
    import { user, accessToken } from "../../stores/user";

    let submitting = false;
    let error = null;

    let values = {
        identifier: '',
        password: ''
    };

    function submit() {
        submitting = true;

        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return error = res.error;
                }

                const { accessToken: token, ...rest } = res;
                $accessToken = token;
                $user = rest;
                error = null;
                navigate("/");
            })
            .finally(() => submitting = false)
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