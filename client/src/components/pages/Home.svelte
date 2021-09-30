<script>
    import { user } from "../../stores/user";
    import LinkButton from "../reusable/LinkButton.svelte";
</script>

<div id="home">
    <h1>Schlagardy</h1>

    {#if $user}
        <p>Welcome, {$user.displayName}!</p>
    {/if}

    <section>
        <LinkButton href="/create">Create</LinkButton>
        <LinkButton href="/browse">Browse</LinkButton>
    </section>
</div>

<style>
    #home {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 4rem;
        text-align: center;
        padding: .5em;
    }

    p {
        text-align: center;
        padding: .5em;
        border-top: 2px solid var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }

    section {
        display: flex;
        gap: 1em;
        justify-content: center;
        padding: 1em;
        /* background-color: red; */
    }
</style>