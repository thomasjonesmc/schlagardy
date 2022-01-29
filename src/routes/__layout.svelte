<script>
    import { goto } from '$app/navigation';
    import { session } from '$app/stores';
    import { post } from '$lib/utils';
    import '../app.css';

    async function signOut() {
        await post("/api/auth/signout");
        $session.user = null;
        goto("/");
    }
</script>

<header>
    <a href="/signup">Sign Up</a>
    <a href="/signin">Sign In</a>
    <button on:click={signOut}>Sign Out</button>
</header>

<main>
    <slot></slot>
</main>

<footer>Footer!</footer>

<style>
    header {
        background-color: red;
        padding: 1em;
        display: flex;
        gap: 1em;
    }

    footer {
        background-color: green;
        padding: 1em;
    }

    main {
        flex: 1;
        height: 100%;
    }
</style>