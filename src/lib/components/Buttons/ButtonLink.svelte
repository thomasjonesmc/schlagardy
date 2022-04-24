<script lang="ts">
    export let href: string;
    export let style: string = '';
</script>

<a {href} {style}>
    <slot />
</a>

<style>
    a {
        display: inline-block;
        text-decoration: none;
        font: inherit;
        background-color: var(--clr-bg-accent);
        border: 1px solid var(--clr-bg-dark);
        color: inherit;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
    }
</style>
