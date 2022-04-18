<script lang="ts" context="module">

    export async function load({params, fetch}) {

        const res = await fetch(`/api/user/${params.username}`);
        const data = await res.json();

        if (!data) {
            return { status: 404 }
        }

        const { user } = data;

        if (!user.isPublic) {
            return { status: 401 }
        }

        return { props: { user } };
    }

</script>

<script lang='ts'>
    import Profile from "$lib/components/Profile/Profile.svelte";
    import type User from "$lib/models/user.model";

    export let user: User;
</script>

<Profile {user} />