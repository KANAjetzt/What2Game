<script>
  import { onMount } from "svelte";
  import { appStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler";
  import TostMessage from "../components/ToastMessage.svelte";

  let ready = false;

  onMount(() => (ready = true));

  if (process.browser) {
    const ls = getLocalStorage("appStore");

    // if we are in dev mode just restore ls - we can handle version errors 😅
    if ($appStore.version === "dev") {
      ls ? ($appStore = ls) : null;
    } else {
      if (ls) {
        // check version
        ls.version === $appStore.version
          ? ($appStore = ls)
          : deleteLocalStorage("appStore");
      }
    }
  }
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

{#if ready}
  <!-- <Nav {segment} /> -->
  <main>
    <slot />
  </main>
{/if}
