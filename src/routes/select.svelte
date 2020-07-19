<script>
  import { fly } from "svelte/transition";

  import { appStore } from "../stores";
  import asyncForEach from "../utils/asyncForEach";
  import findSimilar from "../utils/findSimilar";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import { fetchGames } from "../components/FetchGames.svelte";
  import Checkbox from "../components/Checkbox.svelte";
  import Button from "../components/Button.svelte";
  import Loader from "../components/Loader.svelte";

  export let friendDataa;

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
      console.log(friendInfo.data.friendDataa);
      return friendInfo.data.friendDataa;
    } catch (err) {
      console.log(err);
    }
  };

  if (process.browser) {
    const ls = getLocalStorage("appStore");
    if (ls) {
      $appStore = ls;
    } else {
      $appStore.friends = getFriendsInfo("76561198029394113").then(
        data => ($appStore.friends = data)
      );
      console.log($appStore);
    }
  }

  const getSameGames = selectedFriendsArr => {
    const allGames = selectedFriendsArr.map(friend => {
      console.log(friend);
      const games = friend.games;

      const gameAppIds = games.map(game => game.appid);

      return gameAppIds;
    });

    return findSimilar(allGames);
  };

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

        console.log(gameInfo);

        // save game Info in appStore
        if (gameInfo) $appStore.sameGames = [...$appStore.sameGames, gameInfo];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getGamesOfFriends = async () => {
    await asyncForEach($appStore.selectedFriends, async (friend, index) => {
      console.log($appStore.selectedFriends);
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

    console.log($appStore.friends);

    $appStore.selectedFriends = [
      ...$appStore.selectedFriends,
      $appStore.friends[friendIndex]
    ];
  };

  const handleWhat2Game = async e => {
    await getGamesOfFriends();

    console.log($appStore);

    const sameGames = getSameGames($appStore.selectedFriends);

    console.log(sameGames);

    await getGameInfo(sameGames);

    console.log($appStore);

    saveLocalStorage($appStore, "appStore");
  };
</script>

<style>
  .friend {
    display: flex;
    align-items: center;
    padding: 1rem;
    box-shadow: 1px 4px 10px 0px rgba(0, 0, 0, 0.05);
  }

  .avatar {
    width: 7rem;
    height: auto;
    margin-left: 3rem;
  }

  .name {
    margin-left: 2rem;
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#await $appStore.friends}
  <Loader />
{:then friends}

  {#if friends && !$appStore.sameGames[0]}
    {#each friends as friend, index}
      <div class="friend" transition:fly={{ duration: 200, x: -200 }}>
        <Checkbox id={index} on:checked={handleSelectedFriend} />
        <img
          class="avatar"
          src={friend.avatarfull}
          alt={`Avatar image of ${friend.personaname}`}
          loading="lazy"
          width="70"
          height="70" />
        <p class="name">{friend.personaname}</p>
      </div>
    {/each}

    <Button on:click={handleWhat2Game} />
  {:else if !friendDataa && !$appStore.sameGames[0]}
    <p>no Friends :(</p>
  {/if}
{/await}

{#if $appStore.sameGames}
  {#each $appStore.sameGames as game (game.steam_appid)}
    <div class="game" transition:fly={{ duration: 1000, x: -200 }}>
      <h2>{game.name}</h2>
      <img
        class="gameImg"
        src={game.header_image}
        alt={`Header image of ${game.name}`} />
      <ul class="categorieList">
        {#each game.categories as categorie}
          <li class="categorie">{categorie.description}</li>
        {/each}
      </ul>

    </div>
  {/each}
{/if}
