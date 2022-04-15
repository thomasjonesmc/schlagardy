<script lang="ts">
    export let style: string = '';
    export let type: string = 'button';
    export let disabled: boolean = false;
    export let cssClass: string = undefined;
    export let btn: HTMLButtonElement;
</script>

<button bind:this={btn} on:click class={cssClass} {type} {disabled} {style}>
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
        transition: .3s ease-in-out;
    }

    .btn-submit {
        background-color: salmon;
        color: white;
        border: 1px solid rgb(119, 55, 55);
    }

    .btn-success {
        background-color: lightgreen;
        color: green;
        border: 1px solid green;
        animation-duration: 1;
        animation-direction: reverse;
        animation-fill-mode: forwards;
    }
</style>
