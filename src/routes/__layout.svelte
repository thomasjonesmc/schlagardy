<script>
    import '../app.css';
</script>

<header>Hello</header>

<main>
    <slot></slot>
</main>

<footer>Footer!</footer>

<style>
    header {
        background-color: red;
    }

    footer {
        background-color: green;
    }

    main {
        flex: 1;
        height: 100%;
    }
</style>