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

<main>
    <Header />
    <div>
        <slot></slot>
    </div>
    <Footer />
</main>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    div {
        padding: 1em;
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }
</style>