<footer>
    <p>&copy; Schlagardy Inc. {new Date().toLocaleDateString()}</p>
</footer>

<style>
    footer {
        display: flex;
        justify-content: flex-end;
        gap: .5em;
        align-items: center;
        background-color: salmon;
        padding: 1em;
    }

    footer > *:first-child {
        margin-right: auto;
    }
</style>

