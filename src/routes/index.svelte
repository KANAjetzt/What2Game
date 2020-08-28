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
  h2 {
    margin-top: 2rem;
  }
  .steamBtn {
    margin-top: 1rem;
  }
</style>

<h2>Steam Login / SteamID</h2>

<div>
  <form>
    <TextInput />
  </form>
  <div class="steamBtn">
    <a href="/auth/login" on:click={handleSteamAuth}>
      <img src="/sits_02.png" alt="steam login btn" />
    </a>
  </div>
  <p>
    Login via Steam or enter your SteamID, so you can select your friends in the
    next step.
  </p>
</div>

<a href="/select">
  <Button>GO !</Button>
</a>
