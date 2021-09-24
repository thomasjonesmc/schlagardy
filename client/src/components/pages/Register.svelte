<script>
    import Form from "../reusable/Form.svelte";
    import TextInput from "../reusable/TextInput.svelte";

    let values = {
        email: '',
        username: '',
        displayName: '',
        password: '',
        passwordCheck: ''
    };

    function submit() {
        alert(JSON.stringify(values, null, 4));
    }
</script>

<Form on:submit={submit} title="Register">
    <TextInput id="email" bind:value={values.email}/>
    <TextInput id="username" bind:value={values.username}/>
    <TextInput id="display-name" bind:value={values.displayName}/>
    <TextInput id="password" bind:value={values.password}/>
    <TextInput id="verify-password" bind:value={values.passwordCheck}/>
    <button type="submit">Register</button>
</Form>

<style>
    button {
        align-self: center;
    }
</style>