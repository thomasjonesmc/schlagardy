<script lang="ts">
    import { capitalize } from "$lib/util";

    export let id: string;
    export let cssClass: string = undefined;
    export let label = id.split("-").map(capitalize).join(" ");
    export let name = id;
    export let value: string;
    export let placeholder: string = undefined;
</script>

<div class={cssClass}>
    <label for={id}>{label}</label>
    <textarea {id} {name} {placeholder} bind:value />
</div>

<style>
    div {
        display: grid;
    }

    textarea {
		resize: vertical;
        min-height: 4ch;
	}
</style>