<script lang="ts">
    import FormRow from "./FormRow.svelte";

    export let id: string = "password";
    export let label: string = undefined;
    export let name = id;
    export let value: string;
    export let placeholder: string = undefined;
</script>

<FormRow {id} {label}>
    <input type="password" {id} {name} {placeholder} bind:value />
</FormRow>
