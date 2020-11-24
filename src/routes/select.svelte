<script>
  // TODO: - on click show loader until games are fetched

  import { fly } from "svelte/transition";

  import { appStore, sortedFriends, selectedFriends } from "../stores";
  import asyncForEach from "../utils/asyncForEach";
  import findSimilar from "../utils/findSimilar";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler";
  import { removeMessage, addMessage } from "../utils/messageHandler";
  import PageTranstion from "../components/PageTransition.svelte";
  import FriendCard from "../components/FriendCard.svelte";
  import Button from "../components/Button.svelte";
  import SelectedFriendsList from "../components/SelectedFriendsList.svelte";
  import Loader from "../components/Loader.svelte";
  import Message from "../components/Message.svelte";

  $appStore.currentPage = "select";

  let sortedFriendss = $sortedFriends;
  let selectedFriendss = $selectedFriends;

  const getFriendsInfo = async steamId => {
    try {
      const data = { steamId };

      const url = "api/friends";

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

        const url = "/api/gameInfo";

        // request steam store game info of this game
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const gameInfo = (await res.json()).data.gameInfo[appId].data;

        // check if game has important game categories
        if (
          gameInfo.categories.filter(categorie =>
            $appStore.importantGameCategorieIds.includes(categorie.id)
          ).length > 0
        ) {
          gameInfo.importantCategorie = true;
        } else {
          gameInfo.importantCategorie = false;
        }

        // save game Info in appStore
        if (gameInfo) $appStore.sameGames = [...$appStore.sameGames, gameInfo];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getGamesOfUser = async steamId => {
    const data = { steamId };

    const url = "/api/game";

    // request all games
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return (await res.json()).data.games.response.games;
  };

  const getGamesOfFriends = async () => {
    await asyncForEach($appStore.selectedFriends, async (friend, index) => {
      const steamId = friend.steamid;
      const data = { steamId };

      const url = "/api/game";

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

  const handleSelectedFriend = async friend => {
    const appStoreIndex = $appStore.friends.findIndex(
      f => f.steamid === friend.steamid
    );

    // 1) Check if friend was allready selected
    if (
      $appStore.friends[appStoreIndex].selected === true ||
      $appStore.friends[appStoreIndex].selected === false
    ) {
      // toggle selected property and return
      $appStore.friends[appStoreIndex].selected = !$appStore.friends[
        appStoreIndex
      ].selected;
      return;
    }

    // 2) Find all Games of this friend
    const friendGames = await getGamesOfUser(friend.steamid);

    // 3) Check if we can get friends games
    if (!friendGames) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "error",
        "privacyFriendSelect",
        "The Games of this person are not public!"
      );

      // Mark friends as error
      $appStore.friends[appStoreIndex].error = true;
    } else {
      $appStore.messages = removeMessage(
        $appStore.messages,
        "privacyFriendSelect"
      );

      // Mark friend as selected
      $appStore.friends[appStoreIndex].selected = true;

      // Add them to the friend in the appStore
      $appStore.friends[appStoreIndex].games = friendGames;

      // Save the new data to LS
      saveLocalStorage($appStore, "appStore");

      // Make shure we know that the selection has changed so we search for new games later
      $appStore.selectedFriendsHaveChanged = true;
    }
  };

  const handleWhat2Game = async e => {
    // same games as before

    // --- search new games ---
    // if no user games get them
    if (!$appStore.user.games) {
      $appStore.user.games = await getGamesOfUser($appStore.user.steamId);
    }
    // if selection of friends changed or no games we have no games jet --> get the games
    if (!$appStore.sameGames[0] || $appStore.selectedFriendsHaveChanged) {
      // make room for the new games
      $appStore.sameGames = [];

      await getGamesOfFriends();

      // find games all selected friends have
      const friendsAppIds = getAppIdsFromFriends($selectedFriends);
      const userAppIds = getAppIdsFromFriends([$appStore.user]);

      const appIds = [...friendsAppIds, ...userAppIds];

      const sameGames = getSameGames(appIds);

      // get's gameInfo and saves same games in appStore
      await getGameInfo(sameGames);

      saveLocalStorage($appStore, "appStore");
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
</script>

<style>
  .select {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    min-height: 100vh;
  }

  .info {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .infoText {
    color: var(--primaryColor);
  }

  .inputFriend {
    display: none;
  }

  .friendsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .labelFriend {
    display: block;
  }

  .selectedFriendsList {
    margin-top: 5rem;
  }

  .btnCTA {
    display: flex;
    justify-content: center;
    padding: 4rem 2rem 2rem 2rem;
  }
</style>

<svelte:head>
  <title>Friend Selection</title>
</svelte:head>

<PageTranstion>

  <div class="select">

    <section class="top">

      <div class="info">
        <h3>Select Friends you want to game with!</h3>
        <p class="infoText">You can select up to 8 friends.</p>
      </div>

    </section>

    {#await $appStore.friends}
      <Loader style="fullPageCentered" />
    {:then friends}

      <section class="friendsList">

        {#each friends as friend, index}
          <input
            id={`friend-${index}`}
            class="inputFriend"
            type="checkbox"
            on:change={handleSelectedFriend(friend)} />
          <label class="labelFriend" for={`friend-${index}`}>
            <FriendCard {friend} />
          </label>
        {/each}

      </section>

      <section class="bottom">

        <div class="selectedFriendsList">
          <SelectedFriendsList />
        </div>

        <div class="btnCTA">
          <a href="/games">
            <Button on:click={handleWhat2Game}>What2Game</Button>
          </a>
        </div>

      </section>
    {/await}

  </div>
</PageTranstion>
