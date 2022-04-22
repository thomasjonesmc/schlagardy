<script lang="ts">
    import { session } from "$app/stores";
</script>

<header>
    <a href="/">Home</a>
    {#if $session.user}
        <!-- <LinkButton on:click={signOut} disabled={signingOut}>
            Sign Out
        </LinkButton> -->
        <a href="/api/auth/signout">Sign Out</a>
        <a href="/profile">{$session.user.display_name}</a>
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
        background-color: var(--clr-bg-accent);
        border-bottom: 1px solid var(--clr-bg-dark);;
        padding: .5em;
    }

    header > *:first-child {
        margin-right: auto;
    }
</style>
