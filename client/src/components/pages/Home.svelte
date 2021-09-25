<script>
    import { user } from "../../stores/user";
    import LinkButton from "../reusable/LinkButton.svelte";
</script>

<div id="home">
    <h1>Schlagardy</h1>

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
        padding: 1em;
        border-bottom: 3px solid var(--primary-color);
    }

    section {
        display: flex;
        gap: 1em;
        justify-content: center;
        padding: 1em;
    }
</style>