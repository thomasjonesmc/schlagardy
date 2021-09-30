<script>
    export let id;
    export let label = id?.split("-").join(" ");
    export let value;

    // we capitalize if the label prop was not passed in
    let capitalize = !$$props.label;
</script>

<div>
    <label for={id} class:capitalize>{label}</label>
    <input type="email" {id} bind:value>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: .4em;
    }

    input {
        padding: .2em .1em;
    }

    .capitalize {
        text-transform: capitalize;
    }
</style>
