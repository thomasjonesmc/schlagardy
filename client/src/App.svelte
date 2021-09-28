<script>
	import router from "page";
	import { refreshUser } from "./lifecycle/user";
	import Footer from "./components/layout/Footer.svelte";
	import Header from "./components/layout/Header.svelte";
	import Create from "./components/pages/Create.svelte";
	import Home from "./components/pages/Home.svelte";
	import Login from "./components/pages/Login.svelte";
	import NotFound from "./components/pages/NotFound.svelte";
	import Register from "./components/pages/Register.svelte";

	let page;
	let params;

	router("/", () => page = Home);
	router("/login", () => page = Login);
	router("/register", () => page = Register);
	router("/create", () => page = Create);
	router("*", () => page = NotFound);

	router.start();

	refreshUser();
</script>

<Header />
<main>
	<div>
		<svelte:component this={page} {...params} />
	</div>
</main>
<Footer />

<style>
	main {
		/* gives main content 100% height */
		flex: 1;
	}

	div {
		/* centers all main content at a max of 1200px */
		height: 100%;
		margin: 0 auto;
		max-width: 1200px;
	}
</style>