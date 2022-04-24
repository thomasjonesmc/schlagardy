<script lang="ts">
    import Button from './Button.svelte';

    export let style: string = undefined;
    export let disabled: boolean = false;
    export let btn: HTMLButtonElement = null;
</script>

<Button bind:btn cssClass="btn-submit" type="submit" {disabled} {style}>
    <slot />
</Button>
