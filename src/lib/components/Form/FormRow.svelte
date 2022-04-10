<script lang="ts">
    import { capitalize } from "$lib/util";

    export let id: string;
    export let label = id.split("-").map(capitalize).join(" ");
</script>

<div>
    <label for={id}>{label}</label>
    <slot />
</div>

<style>
    div {
        display: grid;
    }
</style>