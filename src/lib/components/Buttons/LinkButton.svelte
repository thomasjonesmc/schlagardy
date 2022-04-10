<script lang="ts">
    export let style: string = '';
    export let type: string = 'button';
    export let disabled: boolean = false;
    export let cssClass: string = '';
</script>

<button on:click class={cssClass} {type} {disabled} {style}>
    <slot />
</button>

<style>
    button {
        padding: 0;
        margin: 0;
        text-decoration: underline;
        font-size: inherit;
        color: inherit;
        background-color: inherit;
        border: none;
    }

    .submit {
        background-color: salmon;
        color: white;
        border: 1px solid rgb(119, 55, 55);
    }
</style>