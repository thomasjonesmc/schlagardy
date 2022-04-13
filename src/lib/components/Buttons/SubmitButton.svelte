<script lang="ts">
    import Button from './Button.svelte';

    export let style: string = undefined;
    export let disabled: boolean = false;
</script>

<Button cssClass="submit" type="submit" {disabled} {style}>
    <slot />
</Button>
