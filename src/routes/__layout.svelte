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

<Header />
<main>
    <slot></slot>
</main>
<Footer />

<style>
    main {
        height: 100%;
        flex: 1;
        padding: 1em;
    }
</style>