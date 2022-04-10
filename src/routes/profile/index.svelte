<script lang="ts" context="module">
import { session } from "$app/stores";
import { date, dateTime } from "$lib/util";

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

<div id="profile">
    <div id="profile-container">
        <h1>Profile</h1>
        
        <div>
            <b>Email</b>
            <p>{$session.user.email}</p>
        </div>
        
        <div>
            <b>Last Sign In</b>
            <p>{dateTime($session.user.last_sign_in_at)}</p>
        </div>
        
        <div>
            <b>Account Created At</b>
            <p>{dateTime($session.user.created_at)}</p>
        </div>
    </div>
</div>

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

    #profile-container > div {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid lightgray;
        padding: 1em .75em;
    }

    p {
        color: rgb(58, 58, 58);
    }

    @media screen and (max-width: 550px) {
        #profile div {
            display: block;
        }
    }
</style>