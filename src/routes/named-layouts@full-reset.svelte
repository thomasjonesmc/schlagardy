<main id="blank">
    <div>
        <h1>Named Layouts</h1>
        
        <p>This route only exists as an example for future reference</p>
        
        <p>There is a file called <code><b>__layout-full-reset.svelte</b></code></p>
        
        <p>The name of the file for this route is <code><b>named-layouts@full-reset.svelte</b></code></p>
    
        <p>The <b>"@full-reset"</b> portion tells SvelteKit that we want to switch to a variant of the normal <code><b>__layout.svelte</b></code> file</p>
    
        <p>That's how we're able to avoid having the header and footer on this specific page</p>
    
        <a href="/">Home</a>
    </div>
</main>

<style>
    main {
        background-color: lightsalmon;
        height: 100%;
        flex: 1;
        display: grid;
        place-content: center;
    }

    h1 {
        text-decoration: underline;
    }

    div {
        display: grid;
        gap: 1em;
        max-width: 500px;
        place-items: center;
        text-align: center;
    }

    p, a {
        font-size: .9rem;
    }
</style>