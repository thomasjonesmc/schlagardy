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
        border-top: 1px solid lightgray;
        padding: 1em 10px;
    }

    p {
        color: rgb(58, 58, 58);
    }

    @media screen and (max-width: 550px) {
        div {
            display: block;
        }
    }
</style>