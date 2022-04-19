<script context="module" lang="ts">
    import { layoutLoad } from "./_load";

    export async function load(params) {
        return layoutLoad(params);
    }
</script>

<script>
    import "./cell.css";
</script>

<slot></slot>

