<script>
import { session } from "$app/stores";

</script>
<header>
    <a href="/">Home</a>
    {#if $session.user}
        <a href="/signout">Sign Out</a>
        <a href="/profile">Profile</a>
    {:else}
        <a href="/signup">Sign Up</a>
        <a href="/signin">Sign In</a>
    {/if}
</header>

<style>
    header {
        display: flex;
        justify-content: flex-end;
        gap: .75em;
        align-items: center;
        background-color: salmon;
        padding: 1em;
    }

    header > *:first-child {
        margin-right: auto;
    }
</style>

