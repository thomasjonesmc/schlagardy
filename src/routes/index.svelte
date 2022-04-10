<script lang="ts">
    import { session } from '$app/stores';
    import ButtonLink from '$lib/components/Buttons/ButtonLink.svelte';

</script>

<div id="index">
    {#if $session.user}
        <!-- <h1>Welcome, {session.user.displayName}</h1> -->
        <h1>Hello, {$session.user.displayName}</h1>
    {:else}
        <h1>Welcome to Schlagardy</h1>
    {/if}
    <div id="options">
        <ButtonLink href="/create">Create Game</ButtonLink>
        <ButtonLink href="/join">Join Game</ButtonLink>
    </div>
</div>

<style>
    h1 {
        text-align: center;
    }
    
    #options {
        display: flex;
        justify-content: center;
        gap: .5em;
        padding: .5em;
    }
</style>
