<script lang="ts">
    import { beforeNavigate, goto } from "$app/navigation";

    import { page, session } from "$app/stores";
    import LinkButton from "$lib/components/Buttons/LinkButton.svelte";
    import { post } from "$lib/util";

    let signingOut = false;

    async function signOut() {
        signingOut = true;
        await post("/api/auth/signout");
        $session.user = null;
        signingOut = false;

        goto("/");
    }
</script>

<header>
    <a href="/">Home</a>
    {#if $session.user}
        <LinkButton on:click={signOut} disabled={signingOut}>
            Sign Out
        </LinkButton>
        <a href="/profile">{$session.user.displayName}</a>
    {:else}
        <a href={`/signup`}>Sign Up</a>
        <a href={`/signin`}>Sign In</a>
    {/if}
</header>

<style>
    header {
        display: flex;
        justify-content: flex-end;
        gap: 0.75em;
        align-items: center;
        background-color: salmon;
        padding: 1em;
    }

    header > *:first-child {
        margin-right: auto;
    }
</style>
