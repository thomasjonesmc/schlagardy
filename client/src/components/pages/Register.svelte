<script>
    import { navigate, link } from "svelte-routing";
    import Form from "../reusable/Form.svelte";
    import { user, accessToken } from "../../stores/user";
    import TextInput from "../reusable/TextInput.svelte";
    import PasswordInput from "../reusable/PasswordInput.svelte";
    import EmailInput from "../reusable/EmailInput.svelte";
    import { onMount } from "svelte";
    import api from "../../api";

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

        api.registerUser(values)
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
        color: var(--primary-font-color);
        font-size: .8em;
    }

    .error {
        text-transform: lowercase;
        color: red;
    }
</style>