<script>
  import { appStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import NeonText from "../components/NeonText.svelte";
  import Nav from "../components/Nav.svelte";

  if (process.browser) {
    const ls = getLocalStorage("appStore");
    ls ? ($appStore = ls) : null;
  }

  export let segment;
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
<Nav {segment} />
<main>
  <slot />
</main>
