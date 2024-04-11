<script lang="ts">
  import { onMount } from 'svelte';

  import Device from 'svelte-device-info'
  import System from 'svelte-system-info'
  
  import Dock from '🍎/components/Dock/Dock.svelte';
  import TopBar from '🍎/components/TopBar/TopBar.svelte';
  import Wallpaper from '../apps/WallpaperApp/Wallpaper.svelte';
  import BootupScreen from './BootupScreen.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import SystemUpdate from './SystemUpdate.svelte';
  import WindowsArea from './Window/WindowsArea.svelte';
  import { useAuth0 } from '🍎/services/auth0';


  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const { user, isAuthenticated, error } = useAuth0;

  console.log('BrowserName',    System.BrowserName)
  console.log('BrowserVersion', System.BrowserVersion)
  console.log('OSName',         System.OSName)
  console.log('OSVersion',      System.OSVersion)

  console.log('this device is ' + (Device.isMobile ? '' : 'not') + ' mobile')
  
  switch (true) {
    case Device.isPhone:  console.log('this device is a smartphone'); break
    case Device.isTablet: console.log('this device is a tablet');     break
    default:              console.log('this device is neither a smartphone nor a tablet')
  }
    
  console.log('the primary pointing device can' + (
    Device.canHover ? '' : 'not'
  ) + ' "hover" over elements')

  switch (Device.PointingAccuracy) {
    case 'none':   console.log('this device does not support any touch input'); break
    case 'fine':   console.log('this device has a high-resolution touch input'); break
    case 'coarse': console.log('this device has a low-resolution touch input')
  }
  
  if (!isMac) {
    Promise.all([
      import('@fontsource/inter/latin-ext-300.css'),
      import('@fontsource/inter/latin-ext-400.css'),
      import('@fontsource/inter/latin-ext-500.css'),
      import('@fontsource/inter/latin-ext-600.css'),
    ]).then(() => {
      console.log(1);
    });
  }
  let mainEl: HTMLElement;

   onMount(() => {
      console.log('desktop.Component.onMount', $user, $isAuthenticated, $error);
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of params.entries()) {
        console.log(`desktop.Component.onMount key=> ${key} value=> ${value}`)
      }
   });

</script>

<div bind:this={mainEl} class="container">
  <main>
    <TopBar />
    <WindowsArea />
    <Dock />
  </main>

  <Wallpaper />
  <BootupScreen />
  <SystemUpdate />

  <ContextMenu targetElement={mainEl} />
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  main {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>
