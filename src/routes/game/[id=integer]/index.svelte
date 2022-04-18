<script context="module" lang="ts">
	export async function load({ session, stuff, params }) {
		return {
			props: {
				me: stuff.me
			}
		}
	}
</script>

<script lang="ts">
	import RoundsSection from "./_RoundsSection.svelte";
	import Options from "./_Options.svelte";
	import Header from "./_Header.svelte";
	import Description from "./_Description.svelte";
import Page from "./_Page.svelte";

	export let me: boolean;
</script>

<Page>
	<Header />
	
	<Description />
	
	<RoundsSection {me} />
	
	<Options {me} />
</Page>



