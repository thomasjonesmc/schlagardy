<script context="module">
    export async function load({ params, fetch, session, stuff }) {

        if (false) {
			return {
				status: 302,
				redirect: `/`
			};
		}

        const res = await fetch("/api");
        const { name, age } = await res.json();

        console.log(name, age);

        return {
            props: {
                name,
                age
            }
        }

        // if (!session.user) {
        //     return { props: { lists: [] } };
        // }

        // const url = `/api/movie/list`;
        // const res = await fetch(url);
        // const { lists } = await res.json();

        // if (res.ok) {
        //     return { props: { lists } };
        // }

        // return {
        //     status: res.status,
        //     error: new Error(`Could not load ${url}`)
        // };
    }
</script>

<script>
    let count = 0;
    export let name;
    export let age;
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>Name: {name}</p>
<p>Age: {age}</p>

<button on:click={() => count++}>
    Click Me! {count}
</button>