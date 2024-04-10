<script lang="ts">
    import { onMount } from 'svelte';
    import { useAuth0 } from '🍎/services/auth0';
    
    let queryParams = {};
    let welcomeBannerVisible = false;

    const goto = (url: string) => {
        // Add a timeout before redirecting to '/'
        setTimeout(() => {
            window.location.href = url;
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    const { user, isAuthenticated, error } = useAuth0;

    onMount(() => {
        console.log('Mounting', $user, $isAuthenticated, $error);
        // Parse query parameters from the URL
        const params = new URLSearchParams(window.location.search);

        // Convert URLSearchParams object to a plain object
        for (const [key, value] of params.entries()) {
            queryParams[key] = value;
        }
    });

    console.log('LOADING...');
</script>

{#if $isAuthenticated && $user}
<div style="text-align: center;">
    <!-- Centered user picture -->
    <img src={$user.picture} alt="User Picture" style="max-width: 100px; max-height: 100px; margin: 0 auto;"/>
    
    <div style="font-size: 24px; margin-top: 10px;">Welcome {$user.name}, one moment while we verify your credentials</div>
    
    <!-- Display user data in a JSON code box -->
    <div style="text-align: left; margin-top: 20px; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
        {$user ? JSON.stringify($user, null, 2) : ''}
    </div>
    <!-- Iterate over query parameters -->
    <hr/>
    <p>QUERY PARAMS</p>
    <br/>
    <hr/>
    <ul>
        {#each Object.entries(queryParams) as [key, value]}
            <li>{key}: {value}</li>
        {/each}
    </ul>
</div>
{:else}
<div style="text-align: center; margin-top: 20px;">
    <hr/>
    <p>Sorry, user not found.</p>
    <br/>
    <p>ERROR: {$error}</p>
    <br/>
    <hr/>
</div>
{/if}
{goto('/')}
