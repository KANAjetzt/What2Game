<script>
  import { fly } from "svelte/transition";

  import { appStore } from "../stores";
  import {
    getLocalStorage,
    saveLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler";
  import PageTransition from "../components/PageTransition.svelte";
  import Button from "../components/Button.svelte";
  import TextInput from "../components/TextInput.svelte";

  // set current page
  $appStore.currentPage = "index";

  const handleLocalStorage = () => {
    // Steam id in $appStore and LS are the same --> skip
    if (
      getLocalStorage("appStore") &&
      getLocalStorage("appStore").user.steamId === $appStore.user.steamId
    ) {
      return;
      // else clear LS and save
    } else {
      deleteLocalStorage("appStore");
      saveLocalStorage($appStore, "appStore");
    }
  };

  const getSteamIdFromQueryString = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const steamId = urlParams.get("steamID");
    return steamId;
  };

  const addSteamIdToInput = steamId => {
    const SteamIdInput = document.getElementById("steamId");
    SteamIdInput.value = steamId;
  };

  if (process.browser) {
    let steamId = $appStore.user.steamId;

    // Check for steamId in queryString
    if (!steamId) {
      steamId = getSteamIdFromQueryString();
      if (steamId) {
        addSteamIdToInput(steamId);

        // Add SteamId to appStore
        if (steamId) $appStore.user.steamId = steamId;

        // Save Store to LocalStorage
        saveLocalStorage($appStore, "appStore");
      }
    }
  }
</script>

<style>
  .background {
    background-image: url("/Stars-medium.jpg");
    background-size: cover;
  }

  .grid {
    display: grid;
    grid-template-rows: 25% min-content min-content 1fr;
    justify-content: center;
    min-height: 100vh;
    backdrop-filter: blur(8px);
  }

  .info {
    grid-row: 2 / 3;
    max-width: 75vw;
  }

  .login {
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .steamBtn {
    margin-top: 5rem;
  }

  .cta {
    grid-row: 4 / 5;
    align-self: end;
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }

  h2 {
    font-size: 4.5rem;
  }
  p {
    margin-top: 2rem;
  }
</style>

<PageTransition>

  <div class="background">
    <div class="grid">
      <div class="info">
        <h2>Find Games to play together!</h2>
        <p>Enter your Steam ID or Login through Steam to get started.</p>
      </div>

      <div class="login">

        <TextInput />

        <div class="steamBtn">
          <a href="api/auth">
            <img src="/sits_02.png" alt="steam login btn" />
          </a>
        </div>
      </div>

      {#if $appStore.user.steamId}
        <div class="cta" transition:fly|local={{ y: 50, duration: 200 }}>
          <a href="/select">
            <Button on:click={handleLocalStorage}>Continue</Button>
          </a>
        </div>
      {/if}
    </div>
  </div>

</PageTransition>
