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
  main {
    min-height: 100vh;
    overflow-y: hidden;
  }
</style>

{#if $appStore.messages[0]}
  {#each $appStore.messages as message}
    {#if message.toast}
      <TostMessage {message} />
    {/if}
  {/each}
{/if}

<!-- <Nav {segment} /> -->
<main>
  <slot />
</main>
