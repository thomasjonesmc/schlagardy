<script>

</script>


<header>
    <!-- replace with reactive Links when routing implemented -->
    <nav>
        <a href="/">Home</a>
        <a href="/create">Create</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </nav>
</header>

<style>
    header {
        background-color: var(--primary-color);
        color: var(--alt-font-color);
        position: sticky;
        top: 0;
    }
    
    nav {
        max-width: 1200px;
        display: flex;
        justify-content: flex-end;
        gap: 1em;
        padding: 1em;
        margin: 0 auto;
    }
    
    nav > a:first-of-type {
        margin-right: auto;
    }
    
</style>