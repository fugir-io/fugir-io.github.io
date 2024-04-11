import Desktop from '🍎/components/Desktop/Desktop.svelte';

<!--
  @fileoverview Page File for Desktop View
  This file represents the page file for the desktop view.
  It imports the Desktop component and displays it.
-->

<!--
 Script section to handle URL parameters.
 It extracts parameters from the URL query string and logs them to the console.
-->
<script>
  import Desktop from '../components/Desktop/Desktop.svelte';

  // DEBUG: Extract parameters from the URL query string
  // Iterate through the parameters and log each key-value pair to the console
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    console.log(`desktop.Page key=> ${key} value=> ${value}`)
  }
</script>

<!--
  Display the Desktop component.
-->
<Desktop/>
