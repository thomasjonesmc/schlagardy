<script lang="ts">
    export let label: string;
    export let value: string;
</script>


<div>
    <b>{label}</b>
    <p>{value}</p>
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--clr-bg-dark);
        padding: 1em 10px;
    }

    p {
        color: var(--clr-font-accent);
    }

    @media screen and (max-width: 550px) {
        div {
            display: block;
        }
    }
</style>