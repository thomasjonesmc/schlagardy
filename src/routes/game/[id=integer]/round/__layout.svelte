<script lang="ts" context="module">

    export async function load({ session, fetch, params }) {
        if (!session.game) {
            const response = await fetch(`/api/game/${params.id}`);
			session.game = response.ok && (await response.json());
		}

        return {};
    }
</script>

<slot></slot>