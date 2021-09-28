<script>
    import { user, accessToken } from "../../stores/user";
    import LinkButton from "../reusable/LinkButton.svelte";
</script>

<div id="home">
    <h1>Schlagardy</h1>
    <button on:click={() => {
        fetch("http://localhost:3000/api/users/me", {
                headers: {
                    authorization: `Bearer ${$accessToken}`
                }
            })
                .then(res => res.json())
                .then(res => $user = res);
    }}>
        Check User
    </button>
    <button on:click={() => {
        fetch("http://localhost:3000/api/users/refresh", {
            method: "POST",
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                $accessToken = res.accessToken;
            });
    }}>
        Refresh User
    </button>
    <pre>{JSON.stringify($user, null, 4)}</pre>

    <section>
        <LinkButton href="/create">Create</LinkButton>
        <LinkButton href="/browse">Browse</LinkButton>
    </section>
</div>

<style>
    #home {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 4rem;
        text-align: center;
        padding: 1em;
        border-bottom: 3px solid var(--primary-color);
    }

    section {
        display: flex;
        gap: 1em;
        justify-content: center;
        padding: 1em;
    }

    button {
        margin: .5em;
    }
</style>