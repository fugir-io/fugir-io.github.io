<script>
  import { onMount } from "svelte";
  import BootupScreen from './components/Desktop/BootupScreen.svelte';
  import Route from "./components/pager/route.svelte";
  import Router from "./components/pager/router.svelte";
  import CallbackPage from "./pages/callback-page.svelte";
  import DesktopPage from "./pages/home-page.svelte";
  import NotFoundPage from "./pages/not-found-page.svelte";
  import { useAuth0 } from "./services/auth0";

  let page;
  let params;

  let { isLoading, isAuthenticated, login, initializeAuth0 } = useAuth0;

  const authenticationGuard = (ctx, next) => {
    if ($isAuthenticated) {
      next();
    } else {
      login({ appState: { targetUrl: ctx.pathname } });
    }
  };

  const onRedirectCallback = (appState) => {
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
  });
</script>

{#if $isLoading}
  <div class="page-layout">
    <BootupScreen />
  </div>
{:else}
  <Router>
    <Route path="/callback" component={CallbackPage} />
    <Route path="/" component={DesktopPage} middleware={[authenticationGuard]}/>
    <Route path="*" component={NotFoundPage} />
  </Router>
{/if}
