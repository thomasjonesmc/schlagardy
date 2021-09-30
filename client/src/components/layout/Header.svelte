<script>
    import { Link, link, navigate } from "svelte-routing";
    import { outsideclick } from "../../actions/outsideclick";
    import { user, accessToken } from "../../stores/user";
    import FaUser from 'svelte-icons/fa/FaUser.svelte';

    let showDropdown = false;
    let loggingOut = false;


    function logout() {
        showDropdown = !showDropdown;

        if (!$user && !$accessToken) return;

        loggingOut = true;

        fetch("http://localhost:3000/api/users/logout", {
            method: "POST",
            credentials: "include"
        })
        .catch(() => null)
        .finally(() => {
            $user = null;
            $accessToken = null;
            loggingOut = false;
            navigate("/");
        })
    }
</script>


<header>
    <!-- replace with reactive Links when routing implemented -->
    <nav>
        <a use:link href="/">Home</a>
        {#if !$user}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        {/if}
        <div class="profile">
            <button 
                class="profile-button"
                on:click={() => showDropdown = !showDropdown}
            >
                <FaUser/>
            </button>
            {#if showDropdown}
                <div 
                    use:outsideclick={{ includeSiblings: true }}
                    on:outsideclick={() => showDropdown = false}
                    class="dropdown"
                >
                    {#if $user}
                        <a use:link href="/profile">My Profile</a >
                        <div class="profile-info">
                            <div>{$user.username}</div>
                            <div>{$user.displayName}</div>
                            <div>{$user.email}</div>
                        </div>
                    {/if}
                    <button>Dark Theme</button>
                    {#if $user}
                        <button on:click={logout} disable={loggingOut}>Logout</button>
                    {:else}
                        <a use:link href="/login">Login</a >
                    {/if}
                </div>
            {/if}
        </div>
    </nav>
</header>

<style>
    header {
        background-color: var(--primary-color);
        color: var(--alt-font-color);
        position: sticky;
        top: 0;
    }
    
    nav {
        max-width: 1200px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1em;
        padding: .5em;
        margin: 0 auto;
    }
    
    nav > a:first-of-type {
        margin-right: auto;
    }

    .profile {
        color: var(--primary-color);
        position: relative;
    }
    
    .profile-button {
        color: inherit;
        background-color: var(--alt-font-color);
        border-radius: 50%;
        width: 2em;
        height: 2em;
        padding: .4em;
    }

    .dropdown {
        background-color: var(--alt-font-color);
        position: absolute;
        right: 0;
        margin-right: 1em;
        top: 100%;
        box-shadow: 0px 0px 3px 0px var(--primary-color);
        border-radius: .5em;
        overflow: hidden;
        width: 175px;
        overflow-y: auto;
        padding: .5em;
    }

    .dropdown > button,
    .dropdown > a {
        padding: .5em 1em;
        background-color: inherit;
        color: inherit;
        border-radius: 0;
        width: 100%;
        font-size: .8rem;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        text-decoration: none;
    }

    .dropdown > button:hover,
    .dropdown > a:hover {
        background-color: var(--primary-hover-color);
        color: var(--alt-font-color);
    }

    .profile-info {
        font-size: .8rem;
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
        padding: .5em 1em;
        gap: .5em;
    }
    
</style>