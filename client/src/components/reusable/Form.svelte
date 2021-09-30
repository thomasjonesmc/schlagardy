<script>
    export let title;
</script>

<form on:submit|preventDefault>
    {#if title}
        <h1>{title}</h1>
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

    h1 {
        padding: 0;
        margin: 0;
    }
</style>