<script lang="ts">
    export let style: string = '';
    export let type: string = 'button';
    export let disabled: boolean = false;
    export let cssClass: string;

    export function onClick(): void {};
</script>

<button on:click={onClick} class={cssClass} {type} {disabled} {style}>
    <slot />
</button>

<style>
    button {
        text-decoration: none;
        font-size: inherit;
        color: inherit;
        background-color: white;
        border: 1px solid gray;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
    }

    .submit {
        background-color: salmon;
        color: white;
        border: 1px solid rgb(119, 55, 55);
    }
</style>
