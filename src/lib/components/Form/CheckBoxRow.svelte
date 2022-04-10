<script lang="ts">
    import FormRow from "./FormRow.svelte";

    export let id: string;
    export let label: string = undefined;
    export let name = id;
    export let checked: boolean;
</script>

<FormRow {id} {label} cssClass="checkbox-row">
    <input type="checkbox" {id} {name} bind:checked />
</FormRow>