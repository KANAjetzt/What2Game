<script>
  // TODO: - on click check if games can be fetched

  import { fly } from "svelte/transition";

  import { appStore, sortedFriends } from "../stores";
  import asyncForEach from "../utils/asyncForEach";
  import findSimilar from "../utils/findSimilar";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import { removeMessage, addMessage } from "../utils/errorHandler";
  import { fetchGames } from "../components/FetchGames.svelte";
  import FriendCard from "../components/FriendCard.svelte";
  import Button from "../components/Button.svelte";
  import Loader from "../components/Loader.svelte";
  import Message from "../components/Message.svelte";

  $appStore.currentPage = "select";

  let friendDataa;
  let sortedFriendss = $sortedFriends;

  const getFriendsInfo = async steamId => {
    try {
      const data = { steamId };

      // associated script = /src/routes/process/gameInfo.js
      const url = "/process/friends";

      // request general info about friends
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const friendInfo = await res.json();
      return friendInfo.data.friendDataa;
    } catch (err) {
      console.log(err);
    }
  };

  if (process.browser) {
    const lsFriendData = $appStore.friends;

    if (lsFriendData[0]) {
      $appStore.friends = lsFriendData;
    } else {
      // Check if SteamID is there
      if (!$appStore.user.steamId) {
        $appStore.messages = addMessage(
          $appStore.messages,
          "Error",
          "steamIdFriendSelect",
          "No Steam ID - pleas enter your Steam ID"
        );
      } else {
        $appStore.messages = removeMessage(
          $appStore.messages,
          "steamIdFriendSelect"
        );

        $appStore.friends = getFriendsInfo($appStore.user.steamId).then(
          data => ($appStore.friends = data)
        );
      }
    }
  }

  const getAppIdsFromFriends = FriendsArr => {
    const games = FriendsArr.map(friend => {
      const games = friend.games;

      const gameAppIds = games.map(game => game.appid);

      return gameAppIds;
    });

    return games;
  };

  const getSameGames = games => findSimilar(games);

  const getGameInfo = async sameGames => {
    try {
      await asyncForEach(sameGames, async appId => {
        const data = { appId };

        // associated script = /src/routes/process/gameInfo.js
        const url = "/process/gameInfo";

        // request steam store game info of this game
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const gameInfo = (await res.json()).data.gameInfo[appId].data;

        // save game Info in appStore
        if (gameInfo) $appStore.sameGames = [...$appStore.sameGames, gameInfo];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getGamesOfUser = async () => {
    const data = { friendSteamId: $appStore.user.steamId };

    // associated script = /src/routes/process/games.js
    const url = "/process/games";

    // request all games
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const games = (await res.json()).data.games.response.games;

    $appStore.user.games = games;
  };

  const getGamesOfFriends = async () => {
    await asyncForEach($appStore.selectedFriends, async (friend, index) => {
      const friendSteamId = friend.steamid;
      const data = { friendSteamId };

      // associated script = /src/routes/process/games.js
      const url = "/process/games";

      // request all games of this friend
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const games = (await res.json()).data.games.response.games;

      // slam this games in to the sellectedFriend Object in the selectedFriends array
      $appStore.selectedFriends[index] = {
        ...$appStore.selectedFriends[index],
        games
      };
    });
  };

  const handleSelectedFriend = e => {
    const friendIndex = e.detail;

    $appStore.selectedFriends = [
      ...$appStore.selectedFriends,
      $appStore.friends[friendIndex]
    ];
  };

  const handleWhat2Game = async e => {
    await getGamesOfUser();
    await getGamesOfFriends();

    const friendsAppIds = getAppIdsFromFriends($appStore.selectedFriends);
    const userAppIds = getAppIdsFromFriends([$appStore.user]);

    const appIds = [...friendsAppIds, ...userAppIds];

    const sameGames = getSameGames(appIds);

    // get's gameInfo and saves same games in appStore
    await getGameInfo(sameGames);

    saveLocalStorage($appStore, "appStore");

    // similar behavior as an HTTP redirect
    window.location.replace("/games");
  };
</script>

<style>
  .info {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .infoText {
    color: #5da67c;
  }
</style>

<svelte:head>
  <title>Friend Selection</title>
</svelte:head>

<div class="info">
  <h3>Select Friends you want to game with!</h3>
  <p class="infoText">You can select up to 8 friends.</p>
</div>

{#await $appStore.friends}
  <Loader style="fullPageCentered" />
{:then friends}

  {#each friends as friend, index}
    <FriendCard {friend} />
  {/each}

  <Button on:click={handleWhat2Game}>What2Game</Button>
  {#if !friendDataa && !$appStore.sameGames[0]}
    <p>no Friends :(</p>
  {/if}
{/await}
