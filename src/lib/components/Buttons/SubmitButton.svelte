<script lang="ts">
    import Button from './Button.svelte';

    export let disabled: boolean = false;
</script>

<Button cssClass="submit" type="submit" {disabled}>
    <slot />
</Button>
