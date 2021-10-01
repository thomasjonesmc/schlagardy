<script>
    export let title;
</script>

<form on:submit|preventDefault>
    {#if title}
        <header>{title}</header>
    {/if}
    <slot></slot>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        max-width: 400px;
        margin: 0 auto;
    }

    header {
        font-size: 2em;
        font-weight: bold;
        padding: 0;
        margin: 0;
    }
</style>