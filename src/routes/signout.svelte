<script lang="ts" context="module">
    export async function load({ session, fetch }) {
		
        await fetch("auth/signout");

        console.log(session);

        session.user = null;

        return {
            status: 302,
            redirect: `/`
        };
	}
</script>

hi