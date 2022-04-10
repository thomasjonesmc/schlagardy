<script lang="ts">
    import { capitalize } from "$lib/util";

    export let id: string;
    export let cssClass: string = undefined;
    export let label = id.split("-").map(capitalize).join(" ");
</script>

<div class={cssClass}>
    <label for={id}>{label}</label>
    <slot />
</div>

<style>
    div {
        display: grid;
    }

    .checkbox-row {
        display: flex;
        align-items: center;
        gap: 1em;
    }
</style>