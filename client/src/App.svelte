<script>
	import { Router, Route } from "svelte-routing";
	import { refreshUser } from "./lifecycle/user";
	import { userHasBeenSet } from "./stores/user"; 
	import { onMount } from "svelte";
	import { setCurrentTheme } from "./util/theme";
	import Footer from "./components/layout/Footer.svelte";
	import Header from "./components/layout/Header.svelte";
	import Create from "./components/pages/Create.svelte";
	import Home from "./components/pages/Home.svelte";
	import Login from "./components/pages/Login.svelte";
	import NotFound from "./components/pages/NotFound.svelte";
	import Register from "./components/pages/Register.svelte";

	refreshUser();

	onMount(setCurrentTheme);
</script>

{#if $userHasBeenSet}
<Router>
	<Header />
	<main>
		<Route path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/create" component={Create} />
		<Route path="*" component={NotFound} />
	</main>
	<Footer />
</Router>
{/if}

<style>
	main {
		/* gives main content 100% height */
		flex: 1;
	}
</style>