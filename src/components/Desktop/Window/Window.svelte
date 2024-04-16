<script lang="ts">
  /**
   * Import libraries and modules
   */
  import { draggable } from '@neodrag/svelte';
  import { onMount } from 'svelte';
  import { sineInOut } from 'svelte/easing';

  /**
   * Import actions, configs, stores, components, and helpers
   */
  import { elevation } from '🍎/actions';
  import { setApp, getApp } from '🍎/stores/app.store';
  import {
    activeApp,
    activeAppZIndex,
    type AppID,
    appsInFullscreen,
    appZIndices,
    isAppBeingDragged,
    openApps,
  } from '🍎/stores/apps.store';
  import { prefersReducedMotion } from '🍎/stores/prefers-motion.store';
  import { theme } from '🍎/stores/theme.store';
  import AppNexus from '🍎/components/apps/AppNexus.svelte';
  import { randint } from '🍎/helpers/random';
  import { waitFor } from '🍎/helpers/wait-for';
  import TrafficLights from './TrafficLights.svelte';

  /**
   * Define app ID property
   */
  export let appID: AppID;

  /**
   * Initialize window element variables
   */
  let minimizedTransform: string;
  let windowEl: HTMLElement;

  /**
   * Retrieve initial app data from the store
   * ad set the initial values
   */
  const appData = getApp(appID);
  let { draggingEnabled, isResizing, isMaximized, top, left, height, width } = appData;

  /**
   * Calculate REM modifier
   */
  const remModifier = +height * 1.2 >= window.innerHeight ? 24 : 16;

  /**
   * Set default window position if this is a new window
   */
  if (top == 10 && left == 10) {
    const randX = randint(-600, 600);
    const randY = randint(-100, 100);
    top = (document.body.clientWidth / 2 + randX) / 2;
    left = (100 + randY) / 2;

    console.log(`set initial: top/left(${top}, ${left})`);
  }
  let defaultPosition = { x: top, y: left };
  setApp(appID, { ...appData, top, left });

  /**
   * Update z-index when the active app changes
   */
  $: $activeApp === appID && ($appZIndices[appID] = $activeAppZIndex);

  /**
   * Function to focus the app
   */
  function focusApp() {
    $activeApp = appID;
  }

  /**
   * Define transition for window closing
   */
  function windowCloseTransition(
    el: HTMLElement,
    { duration = $prefersReducedMotion ? 0 : 300 }: SvelteTransitionConfig = {},
  ): SvelteTransitionReturnType {
    const existingTransform = getComputedStyle(el).transform;

    return {
      duration,
      easing: sineInOut,
      css: (t) => `opacity: ${t}; transform: ${existingTransform} scale(${t})`,
    };
  }

  /**
   * Function to maximize the app window
   */
  async function maximizeApp() {
    // Ensure isResizing is reset
    $isAppBeingDragged = false;
    isResizing = false;
    console.log(`begin maximize`);
    if (!$prefersReducedMotion) {
      windowEl.style.transition = 'height 0.3s ease, width 0.3s ease, transform 0.3s ease';
    }

    if (!isMaximized) {
      // Store the original position and size of the window
      draggingEnabled = false;

      windowEl.style.transform = `translate(0px, 0px)`;
      windowEl.style.width = `100%`;
      windowEl.style.height = 'calc(100vh - 1.7rem)';
    } else {
      draggingEnabled = true;

      console.log(`minimizing: top/left(${top}, ${left}) h/w(${height}, ${width})`);
      // Restore the original position and size of the window
      windowEl.style.transform = `translate(${top}px, ${left}px)`;
      windowEl.style.width = width + 'px';
      windowEl.style.height = height + 'px';
    }

    isMaximized = !isMaximized;

    $appsInFullscreen[appID] = isMaximized;

    await waitFor(300);

    if (!$prefersReducedMotion) windowEl.style.transition = '';

    // Update isMaximized property only in the store after the transition completes
    setApp(appID, { ...appData, isMaximized });
    console.log(`end maximize`);
  }

  /**
   * Function to close the app window
   */
  function closeApp() {
    $openApps[appID] = false;
    $appsInFullscreen[appID] = false;
  }

  /**
   * Event handler for app drag start
   */
  function onAppDragStart() {
    if (isResizing || !draggingEnabled) return;
    $isAppBeingDragged = true;
    focusApp();
    console.log('begin drag');
  }

  /**
   * Event handler for app drag end
   */
  function onAppDragEnd() {
    if (isResizing || !isAppBeingDragged || !draggingEnabled) return;

    // Update app properties in the store
    const { left: l, top: t } = windowEl.getBoundingClientRect();

    top = t;
    left = l;

    console.log(`end drag: top/left(${top}, ${left})`);

    setApp(appID, { ...appData, top, left });
    $isAppBeingDragged = false;
  }

  /**
   * Event handler for app resize start
   */
  function beginWindowResizing(e: MouseEvent) {
    if (isResizing || !draggingEnabled || $isAppBeingDragged) return;

    const { top, bottom, left, right } = windowEl.getBoundingClientRect();
    const margin = 10;
    // Check if the mouse is within the margin from the edge of the window
    if (
      e.clientX <= left + margin ||
      e.clientX >= right - margin ||
      e.clientY <= top + margin ||
      e.clientY >= bottom - margin
    ) {
      isResizing = true;
      console.log(`begin resize: top/left(${top}, ${left}), bottom/right(${bottom}, ${right})`);
    }
  }

  let resizeEvents = 0;
  /**
   * Event handler for app resize
   */
  function resizeHandler(e: MouseEvent) {
    if (!isResizing || !draggingEnabled || $isAppBeingDragged) return;

    resizeEvents++;

    const { top: t, bottom: b, left: l, right: r } = windowEl.getBoundingClientRect();

    const deltaX = r - e.clientX;
    const deltaY = b - e.clientY;
    const w = Math.abs(r + e.movementX - l);
    const h = Math.abs(b + e.movementY - t);

    windowEl.style.width = w + 'px';
    windowEl.style.height = h + 'px';
  }

  /**
   * Event handler for app resize end
   */
  function endAppResize() {
    // can get this event when resizing due to click location
    if (isMaximized || !isResizing || !draggingEnabled || $isAppBeingDragged) return;

    isResizing = false;

    // don't adjust anything if we've seen no actual events
    if (resizeEvents <= 0) return;

    // get the current window boundary
    const { left: l, right: r, top: t, bottom: b } = windowEl.getBoundingClientRect();

    const w = r - l;
    const h = b - t;
    resizeEvents = 0;

    console.log(
      `end resize: top/left(${t}, ${l}), bottom/right(${b}, ${r}) H/W(${height}/${width})`,
    );

    // Update app properties in the store
    setApp(appID, { ...appData, width: w, height: h, top: t, left: l });
  }

  /**
   * Event handler for window resizing
   * which changes the cursor icon based on position in the
   * in the current window.
   */
  function updateCursorHandler(e: MouseEvent) {
    const { right, top, bottom } = windowEl.getBoundingClientRect();
    const margin = 10;

    if (e.x >= right - margin && e.y <= top + margin) {
      document.body.style.cursor = 'default';
    } else if (e.x >= right - margin && e.y >= bottom - margin) {
      document.body.style.cursor = 'nwse-resize'; // Diagonal resize cursor (down and to the right)
    } else if (e.x >= right - margin) {
      document.body.style.cursor = 'ew-resize'; // Horizontal resize cursor
    } else if (e.y >= bottom - margin) {
      document.body.style.cursor = 'ns-resize'; // Vertical resize cursor
    } else {
      document.body.style.cursor = 'default'; // Default cursor
    }
  }

  /**
   * On mount, set up event listeners for resize and drag
   */
  onMount(() => {
    window.addEventListener('mousedown', beginWindowResizing);
    window.addEventListener('mousemove', resizeHandler);
    window.addEventListener('mouseup', endAppResize);
    window.addEventListener('keydown', () => {});

    windowEl?.focus();

    return () => {
      window.removeEventListener('mousedown', beginWindowResizing);
      window.removeEventListener('mousemove', resizeHandler);
      window.removeEventListener('mouseup', endAppResize);
      window.removeEventListener('keydown', () => {});
    };
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
  class="container"
  class:dark={$theme.scheme === 'dark'}
  class:active={$activeApp === appID}
  style:width="{+width / remModifier}rem"
  style:height="{+height / remModifier}rem"
  style:z-index={$appZIndices[appID]}
  tabindex="-1"
  bind:this={windowEl}
  use:draggable={{
    defaultPosition,
    handle: '.app-window-drag-handle',
    bounds: { bottom: -6000, top: 27.2, left: -6000, right: -6000 },
    disabled: !draggingEnabled,
    gpuAcceleration: false,
    onDragStart: onAppDragStart,
    onDragEnd: onAppDragEnd,
  }}
  on:click={focusApp}
  on:keydown={() => {}}
  on:mousedown={beginWindowResizing}
  on:mouseup={endAppResize}
  on:mousemove={updateCursorHandler}
  out:windowCloseTransition
>
  <div class="tl-container {appID}" use:elevation={'window-traffic-lights'}>
    <TrafficLights {appID} on:maximize-click={maximizeApp} on:close-app={closeApp} />
  </div>

  <AppNexus {appID} isBeingDragged={$isAppBeingDragged} />
</section>

<style lang="scss">
  .container {
    --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.115), 0px 68px 80px rgba(0, 0, 0, 0.23);

    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;

    position: absolute;

    will-change: width, height;

    border-radius: 0.75rem;
    box-shadow: var(--elevated-shadow);

    &.active {
      --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.28), 0px 68px 80px rgba(0, 0, 0, 0.56);
    }

    &.dark {
      & > :global(section),
      & > :global(div) {
        border-radius: inherit;
        box-shadow:
          inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
          0 0 0 1px hsla(var(--system-color-light-hsl), 0.5),
          var(--elevated-shadow);
      }
    }
  }

  .tl-container {
    position: absolute;
    top: 1rem;
    left: 1rem;

    box-shadow: none !important;
  }
</style>
