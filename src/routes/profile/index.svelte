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
        <div id="profile-container">
            <h1>Profile</h1>
            <ProfileRow label="Email" value={$session.user.email} />
            <ProfileRow label="Username" value={$session.user.username} />
            <ProfileRow label="Display Name" value={$session.user.displayName} />
            <ProfileRow label="Last Sign In" value={dateTime($session.user.last_sign_in_at)} />
            <ProfileRow label="Account Created At" value={dateTime($session.user.created_at)} />
        </div>
    </div>
{/if}

<!-- <pre>
    {JSON.stringify($session.user, null, 4)}
</pre> -->

<style>
    #profile {
        margin: 0 auto;
        max-width: 800px;
        padding: 1em;
    }

    #profile-container {
        border: 1px solid lightgray;
        border-radius: .5em;
    }

    h1 {
        padding: .25em .3em;
    }

    pre {
        display: block;
    }
</style>