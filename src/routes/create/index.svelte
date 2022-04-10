<script lang="ts" context="module">
    export function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: `/signin`
			};
		}

		return {};
	}
</script>