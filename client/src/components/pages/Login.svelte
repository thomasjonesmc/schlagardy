<script>
    import Form from "../reusable/Form.svelte";
    import TextInput from "../reusable/TextInput.svelte";
    import { user } from "../../stores/user";

    let values = {
        identifier: '',
        password: ''
    };

    function submit() {
        alert(JSON.stringify(values, null, 4));

        // fetch login endpoint
        // $user = response from fetch;
    }
</script>

<Form on:submit={submit} title="Login">
    <TextInput 
        label="Username or Email" 
        id="login-identifier" 
        bind:value={values.identifier}
    />
    <TextInput id="password" bind:value={values.password}/>
    <button type="submit">Login</button>
</Form>

<style>
    button {
        align-self: center;
    }
</style>