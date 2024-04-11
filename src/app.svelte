<script>
  import { onMount } from "svelte";

  import BootupScreen from '🍎/components/Desktop/BootupScreen.svelte';
  import Route from "🍎/components/pager/route.svelte";
  import Router from "🍎/components/pager/router.svelte";
  import DesktopPage from "🍎/pages/home-page.svelte";
  import NotFoundPage from "🍎/pages/not-found-page.svelte";
  import { useAuth0 } from '🍎/services/auth0';
  import { isLoading, user, isAuthenticated, error } from '🍎/stores/auth.store';

  let authParams;

  let { login, initializeAuth0 } = useAuth0;

  const authenticationGuard = (ctx, next) => {
    if ($isAuthenticated) {
      next();
    } else {
      login({ appState: { targetUrl: ctx.pathname } });
    }
  };

  const onRedirectCallback = (appState) => {
    console.log('app.onRedirectCallback')
    console.log(`app.onRedirectCallback targetURL`, appState.targetUrl)
    console.log(`app.onRedirectCallback pathName:`, window.location.pathname)

    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  onMount(async () => {
    await initializeAuth0({ onRedirectCallback });

    console.log('app.onMount')
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params.entries()) {
      console.log(`app.onMount param: key=> ${key} value=>${value}`)
    }
    
    console.log(`app.onMount AUTHENTICATED`, isAuthenticated)
  });
</script>

{#if $isLoading}
  <div class="page-layout">
  </div>
{:else}
  <Router>
    <Route path="/" component={DesktopPage} middleware={[authenticationGuard]}/>
    <Route path="*" component={NotFoundPage} />
  </Router>
{/if}
