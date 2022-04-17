<script lang="ts">
    import FormRow from "./FormRow.svelte";

    export let id: string;
    export let label: string = undefined;
    export let name = id;
    export let value: number;
    export let placeholder: string = undefined;
    export let min = 0;
    export let step = 1;
    export let max: number = 100;
</script>

<FormRow {id} {label} alt={value.toString()}>
    <input 
        type="range" 
        {id} {name} {placeholder} 
        {step} {min} {max}
        bind:value 
    />
</FormRow>
