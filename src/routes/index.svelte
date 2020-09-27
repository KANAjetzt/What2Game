<script>
  import { fly } from "svelte/transition";

  import { appStore } from "../stores";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import Button from "../components/Button.svelte";
  import TextInput from "../components/TextInput.svelte";

  const handleSteamAuth = () => {
    console.log("do stuff");
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
    if (!$appStore.user.steamId) {
      const steamId = getSteamIdFromQueryString();
      addSteamIdToInput(steamId);

      // Add SteamId to appStore
      if (steamId) $appStore.user.steamId = steamId;

      // Save Store to LocalStorage
      saveLocalStorage($appStore, "appStore");
    }
  }
</script>

<style>
  :global(body) {
    background-image: url("/Stars-medium.jpg");
    background-size: cover;
    backdrop-filter: blur(8px);
    min-height: 100vh;
  }

  .steamBtn {
    margin-top: 1rem;
  }

  h2 {
    padding: 0 2rem;
    font-size: 4.5rem;
    max-width: 75vw;
    margin: auto;
  }

  p {
    padding: 0 2rem;
    max-width: 75vw;
    margin: auto;
    margin-top: 2rem;
  }
</style>

<h2>Find Games to play together!</h2>
<p>Enter your Steam ID or Login through Steam to get started.</p>

<div>
  <form>
    <TextInput />
  </form>
  <div class="steamBtn">
    <a href="/auth/login" on:click={handleSteamAuth}>
      <img src="/sits_02.png" alt="steam login btn" />
    </a>
  </div>
</div>

<!-- <a href="/select">
  <Button>GO !</Button>
</a> -->
