<script lang="ts" context="module">
    export function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: `/signin?goto=create`
			};
		}

		return {};
	}
</script>

<div>
	Hello
</div>

<style>
	div {
		background-color: green;
	}
</style>