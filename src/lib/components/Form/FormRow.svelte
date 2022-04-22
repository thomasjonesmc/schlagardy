<script lang="ts">
    import { capitalize } from "$lib/util";

    export let id: string;
    export let cssClass: string = undefined;
    export let label = id.split("-").map(capitalize).join(" ");
    export let alt: string = null;
</script>

<div class={cssClass}>
    <div class="label-container">
        <label for={id}>{label}</label>
        {#if alt}
            <p>{alt}</p>
        {/if}
    </div>
    <slot />
</div>

<style>
    div {
        display: grid;
    }

    .label-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label-container p {
        color: var(--clr-font-accent);
    }

    .checkbox-row {
        display: flex;
        align-items: center;
        gap: 1em;
    }
</style>