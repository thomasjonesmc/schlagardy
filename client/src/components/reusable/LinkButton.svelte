<script>
    import { link } from "svelte-routing";

    export let href;
    export let target = undefined;
    export let rel = undefined;
    export let download = undefined;
</script>

<a use:link class="link-button" {href} {target} {rel} {download}>
    <slot></slot>
</a>