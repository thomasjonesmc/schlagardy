<script lang="ts" context="module">
    import { layoutLoad } from "./_load";

    export async function load(params) {
        return layoutLoad(params);
    }
</script>

<slot></slot>