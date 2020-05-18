<script>
  import NeonText from "../components/NeonText.svelte";
</script>

<style>
  :global(body) {
    background-color: #333;
    color: #eee;
  }

  main {
    display: grid;
    position: relative;
    max-width: 56em;
    background-color: #333;
    color: #eee;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<!-- Neon Text 4 later maybe :) -->
<!-- <NeonText /> -->

<main>
  <slot />
</main>
