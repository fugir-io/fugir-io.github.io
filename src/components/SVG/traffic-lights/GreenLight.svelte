<!-- Icon Component Documentation -->

<script lang="ts">
  import ExpandSvg from './ExpandSVG.svelte'; // Importing SVG component for expandable icon
  import StretchSvg from './StretchSVG.svelte'; // Importing SVG component for crosshair icon

  export let expandable: boolean; // Boolean prop to determine if the icon is expandable
</script>

<!-- Conditional Rendering of Icons -->
{#if expandable}
  <!-- Render the expandable icon if 'expandable' prop is true -->
  <ExpandSvg />
{:else}
  <!-- Render the crosshair icon if 'expandable' prop is false -->
  <StretchSvg />
{/if}
