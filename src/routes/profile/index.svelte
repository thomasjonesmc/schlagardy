<script lang="ts" context="module">
    export function load({ session }) {

		if (!session.user) {
			return {
				status: 302,
				redirect: `/`
			};
		}

		return {};
	}
</script>

<script>
    import { session } from "$app/stores";
    import { dateTime } from "$lib/util";
    import ProfileRow from "./_ProfileRow.svelte";
</script>

{#if $session.user}
    <div id="profile">
        <h1>Profile</h1>
        <ProfileRow label="Email" value={$session.user.email} />
        <ProfileRow label="Username" value={$session.user.username} />
        <ProfileRow label="Display Name" value={$session.user.displayName} />
        <ProfileRow label="Account Created At" value={dateTime($session.user.createdAt)} />
        <ProfileRow label="Last Sign In" value={dateTime($session.user.lastSignInAt)} />
        <ProfileRow label="Account is Public" value={(String)(!!$session.user.isPublic)} />
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
        padding: .25em .3em;
    }
</style>