<script>
  import { appStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import NeonText from "../components/NeonText.svelte";
  import Nav from "../components/Nav.svelte";
  import TostMessage from "../components/ToastMessage.svelte";

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
    min-height: 100vh;
    max-width: 56em;
    background-color: #333;
    color: #eee;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

{#if $appStore.messages[0]}
  {#each $appStore.messages as message}
    {#if message.toast}
      <TostMessage {message} />
    {/if}
  {/each}
{/if}

<Nav {segment} />
<main>
  <slot />
</main>
