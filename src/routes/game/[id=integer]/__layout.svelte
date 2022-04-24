<script lang="ts" context="module">
    export async function load({ fetch, params, session }) {

        const res = await fetch(`/api/game/${params.id}`);
        const stuff = await res.json();

        session.game = stuff.game;

        console.log(stuff);

        return { stuff };
    }
</script>

<slot></slot>