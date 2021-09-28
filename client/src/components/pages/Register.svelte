<script>
    import Form from "../reusable/Form.svelte";
    import TextInput from "../reusable/TextInput.svelte";
    import { user, accessToken } from "../../stores/user";

    let values = {
        email: '',
        username: '',
        displayName: '',
        password: '',
        passwordCheck: ''
    };

    let submitting = false;


    function submit() {

        submitting = true;

        console.log(JSON.stringify(values));

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
                console.log(res);
                $accessToken = res.accessToken;
            })
            .finally(() => submitting = false)
    }
</script>

<Form on:submit={submit} title="Register">
    <TextInput id="email" bind:value={values.email}/>
    <TextInput id="username" bind:value={values.username}/>
    <TextInput id="display-name" bind:value={values.displayName}/>
    <TextInput id="password" bind:value={values.password}/>
    <TextInput id="password-check" bind:value={values.passwordCheck}/>
    <button type="submit" disabled={submitting}>Register</button>
</Form>

<style>
    button {
        align-self: center;
    }
</style>