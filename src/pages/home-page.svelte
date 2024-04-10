<script>
  import Desktop from '../components/Desktop/Desktop.svelte';

  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    console.log(`desktop.Page key=> ${key} value=> ${value}`)
  }
</script>

<Desktop/>
