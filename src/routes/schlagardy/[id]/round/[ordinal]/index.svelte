<script lang="ts" context="module">
    export async function load({ session, params, fetch }) {

		console.log(session, params);
        
		if (!session.user) return { status: 302, redirect: `/` };

		const response = await fetch(`/api/schlagardy/${params.id}`);

		return {
			status: response.status,
			props: {
				jeopardy: response.ok && (await response.json())
			}
		};
	}
</script>