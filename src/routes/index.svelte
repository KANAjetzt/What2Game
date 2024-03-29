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

  let authApiLink = undefined;

  // set current page
  $appStore.currentPage = "index";

  const handleLocalStorage = () => {
    const ls = getLocalStorage("appStore");
    // Steam id in $appStore and LS are the same --> skip
    if (ls && ls.user.steamId === $appStore.user.steamId) {
      return;
      // else clear LS and save
    } else {
      // delete LS
      deleteLocalStorage("appStore");
      // restore appStore to default, but save the new steamId!
      // definitely have to find a better solution for this 😅🤐
      $appStore = {
        user: { steamId: $appStore.user.steamId },
        friends: [],
        selectedFriends: [],
        selectedFriendsArchive: [],
        selectedFriendLoading: { isLoading: false, index: undefined },
        selectedFriendsHaveChanged: false,
        sameGames: [],
        messages: [],
        currentPage: [],
        importantGameCategorieIds: [1, 9, 38],
        clickedGameIndex: undefined,
        modalIsOpen: false,
        showSinglePlayerGames: true
      };
      // save new appStore to LS
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
    authApiLink = `${window.location.origin}/api/auth`;

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
  .links {
    display: none;
  }
  .background {
    background-image: url("https://res.cloudinary.com/kana/image/upload/f_auto,q_20,g_auto/v1606824276/Stars_m9qgpi.jpg");
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

<svelte:head>
  <title>What2Game - Enter Steam ID</title>
</svelte:head>

<PageTransition>

  <!-- Hidden links for sapper export - without routing breaks -->
  <div class="links">
    <a href="/select">''</a>
    <a href="/games">''</a>
  </div>

  <div class="background">
    <div class="grid">
      <div class="info">
        <h2>Find Games to play together!</h2>
        <p>Enter your Steam ID or Login through Steam to get started.</p>
      </div>

      <div class="login">

        <TextInput />

        <div class="steamBtn">
          <a rel="external" href={authApiLink}>
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
