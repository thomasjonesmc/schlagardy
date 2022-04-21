<script lang='ts'>
    import Profile from "$lib/components/Profile/Profile.svelte";
    import type User from "$lib/models/user.model";

    export let user: User;
</script>

<Profile {user} />