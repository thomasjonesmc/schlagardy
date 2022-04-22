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
        <ProfileRow label="Display Name" value={user.display_name} />
        <ProfileRow label="Account Created At" value={dateTime(user.created_at)} />
        <ProfileRow label="Last Sign In" value={dateTime(user.last_sign_in_at)} />
        <ProfileRow label="Account is Public" value={(String)(!!user.is_public)} />
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
        border: 1px solid var(--clr-bg-dark);
        border-radius: .5em;
    }

    h1 {
        padding: .25em 10px;
    }
</style>