<script lang="ts">
    import { session } from "$app/stores";
    import type User from "$lib/models/user.model";
    import { dateTime } from "$lib/util";
    import ProfileRow from "./ProfileRow.svelte";

    export let user: User;
</script>

{#if user}
    <div id="profile">
        <h1>Profile</h1>
        {#if user.id === $session.user?.id}
            <ProfileRow label="Email" value={user.email} />
        {/if}
        <ProfileRow label="Username" value={user.username} />
        <ProfileRow label="Display Name" value={user.displayName} />
        <ProfileRow label="Account Created At" value={dateTime(user.createdAt)} />
        <ProfileRow label="Last Sign In" value={dateTime(user.lastSignInAt)} />
        <ProfileRow label="Account is Public" value={(String)(!!user.isPublic)} />
    </div>
{/if}

<!-- <pre>
    {JSON.stringify($session.user, null, 4)}
</pre> -->

<style>
    #profile {
        margin: 0 auto;
        max-width: 800px;
        width: 100%;
        border: 1px solid lightgray;
        border-radius: .5em;
    }

    h1 {
        padding: .25em 10px;
    }
</style>