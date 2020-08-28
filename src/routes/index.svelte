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
  form {
    margin: 20px;
    padding: 20px;
  }
</style>

<h2>Enter your Steam ID or Login via Steam</h2>

<form>
  <TextInput />
</form>

<div>
  <a href="/auth/login" on:click={handleSteamAuth}>
    <img src="/sits_02.png" alt="steam login btn" />
  </a>
</div>

<a href="/select">
  <Button>GO !</Button>
</a>
