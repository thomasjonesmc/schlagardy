<script>
    import { navigate, link } from "svelte-routing";
    import Form from "../reusable/Form.svelte";
    import { user, accessToken } from "../../stores/user";
    import TextInput from "../reusable/TextInput.svelte";
    import PasswordInput from "../reusable/PasswordInput.svelte";
    import EmailInput from "../reusable/EmailInput.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        if ($user) navigate("/"); 
    })

    let values = {
        email: '',
        username: '',
        displayName: '',
        password: '',
        passwordCheck: ''
    };

    let submitting = false;
    let error = null;

    function submit() {

        for (let prop in values) {
            if (!values[prop]) {
                return error = "all fields required";
            }
        }

        submitting = true;

        fetch("http://localhost:3000/api/users/register", {
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


<Form on:submit={submit} title="Register">
    <EmailInput id="email" bind:value={values.email}/>
    <TextInput id="username" bind:value={values.username}/>
    <TextInput id="display-name" bind:value={values.displayName}/>
    <PasswordInput id="password" bind:value={values.password} />
    <PasswordInput id="password-check" bind:value={values.passwordCheck}/>
    {#if error}<div class="error">{error}</div>{/if}
    <button type="submit" disabled={submitting}>Register</button>
    <a use:link href="/login">Already have an Account? Login Here</a>
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