<script lang="ts" context="module">

    export async function load({params, fetch}) {

        const res = await fetch(`/api/user/${params.username}`);

        return {
            props: await res.json()
        };
    }

</script>

<script lang='ts'>
    import { page } from "$app/stores";
    import type User from "$lib/models/user.model";

    export let user: User;
</script>

<div>{$page.params.username}</div>
<div>{user.username}</div>
<div>{user.displayName}</div>