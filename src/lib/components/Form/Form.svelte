<script lang="ts">
    export let title: string = null;
    export let style: string = undefined;
    export let method: string = undefined;
</script>



<form on:submit|preventDefault {style} {method}>
    {#if title}
        <h1>{title}</h1>
    {/if}

    <slot />
</form>

<style>
    h1 {
        text-align: center;
    }

    form {
        display: grid;
        gap: 1em;
        margin: 0 auto;
        max-width: 400px;
    }
</style>