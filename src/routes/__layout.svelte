<script>
    import css from "../app.css";
import Footer from "./_Footer.svelte";
    import Header from "./_Header.svelte";
</script>

<Header />
<main>
    <slot></slot>
</main>
<Footer />