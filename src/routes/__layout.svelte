<script lang="ts">
    import { beforeNavigate } from "$app/navigation";
    import { history } from "$lib/stores/history";

    import "../app.css";
    import Footer from "./_Footer.svelte";
    import Header from "./_Header.svelte";

    beforeNavigate(({ from, to }) => {
        $history = [ from, ...$history ];
    });
</script>

<div>
    <Header />
    <main>
        <slot></slot>
    </main>
    <Footer />
</div>

<style>
    div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    main {
        padding: 1em;
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }
</style>