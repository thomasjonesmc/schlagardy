<script lang="ts">
    import { session } from '$app/stores';
    import ButtonLink from '$lib/components/Buttons/ButtonLink.svelte';
    import { debug } from 'svelte/internal';

</script>

<div id="index">
    {#if $session.user}
        <!-- <h1>Welcome, {session.user.displayName}</h1> -->
        <h1>Hello, {$session.user.email}</h1>
    {:else}
        <h1>Welcome to Schlagardy</h1>
    {/if}
    <div id="options">
        <ButtonLink href="/create">Create Game</ButtonLink>
        <ButtonLink href="/join">Join Game</ButtonLink>
    </div>
</div>

<style>
    #index {
        text-align: center;
        padding: 1em;
    }

    #options {
        display: flex;
        justify-content: center;
        gap: .5em;
        padding: .5em;
    }
</style>
