<footer>
    <p>&copy; Schlagardy Inc. {new Date().toLocaleDateString()}</p>
</footer>

<style>
    footer {
        display: flex;
        justify-content: flex-end;
        gap: .5em;
        align-items: center;
        background-color: var(--clr-bg-accent);
        border-top: 1px solid var(--clr-bg-dark);
        padding: .5em;
    }

    footer > *:first-child {
        margin-right: auto;
    }
</style>

