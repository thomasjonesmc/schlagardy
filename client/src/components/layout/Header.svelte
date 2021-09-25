<script>
    import { current } from "page";
    import { outsideclick } from "../../actions/outsideclick";

    let showDropdown = false;

</script>


<header>
    <!-- replace with reactive Links when routing implemented -->
    <nav>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <div class="profile">
            <button 
                class="profile-button"
                on:click={() => showDropdown = !showDropdown}
            >
                P
            </button>
            {#if showDropdown}
                <div 
                    use:outsideclick={{ includeSiblings: true }}
                    on:outsideclick={() => showDropdown = false}
                    class="dropdown"
                >
                    <a href="/profile">My Profile</a>
                    <button>Dark Theme</button>
                    <button>Logout</button>
        
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
        width: 1em;
        height: 1em;
        padding: 1em;
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
    
</style>