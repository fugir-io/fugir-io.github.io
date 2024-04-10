<script>
  import { onMount } from "svelte";
  import BootupScreen from '🍎/components/Desktop/BootupScreen.svelte';
  import Route from "🍎/components/pager/route.svelte";
  import Router from "🍎/components/pager/router.svelte";
  import DesktopPage from "🍎/pages/home-page.svelte";
  import NotFoundPage from "🍎/pages/not-found-page.svelte";
  import { useAuth0 } from '🍎/services/auth0';

  let authParams;

  let { isLoading, isAuthenticated, login, initializeAuth0, error } = useAuth0;

  const authenticationGuard = (ctx, next) => {
    if ($isAuthenticated) {
      next();
    } else {
      login({ appState: { targetUrl: ctx.pathname } });
    }
  };

  const onRedirectCallback = (appState) => {
    console.log('app.onRedirectCallback')
    for (const [key, value] of appState.entries()) {
      console.log(`app.onRedirectCallback param: key=> ${key} value=>${value}`)
    }

    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  onMount(async () => {
    console.log('app.onMount')
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params.entries()) {
      console.log(`app.onMount param: key=> ${key} value=>${value}`)
    }

    await initializeAuth0({ onRedirectCallback });
  });
</script>

{#if $isLoading}
  <div class="page-layout">
    <BootupScreen />
  </div>
{:else}
  <Router>
    <Route path="/" component={DesktopPage} middleware={[authenticationGuard]}/>
    <Route path="*" component={NotFoundPage} />
  </Router>
{/if}
