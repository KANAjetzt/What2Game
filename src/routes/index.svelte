<script context="module">
  //TODO: Freunde nach Freunschaftsdauer sortieren / alternativ ABC

  import asyncMap from "../utils/asyncMap";

  export async function preload(page, session) {
    const res = await this.fetch(
      "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=2F15898C280E0CD2F2D007CEB140476E&steamid=76561198029394113&relationship=friend"
    );
    const friends = (await res.json()).friendslist.friends;

    const steamIds = friends.map(friend => friend.steamid).join(",");

    const friendData = await this.fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=2F15898C280E0CD2F2D007CEB140476E&steamids=${steamIds}`
    );
    const friendDataa = (await friendData.json()).response.players;
    console.log("-----------------");
    console.log(friendDataa);
    console.log("-----------------");

    return { friendDataa };
  }
</script>

<script>
  import { appStore } from "../stores";
  import Checkbox from "../components/Checkbox.svelte";
  import Button from "../components/Button.svelte";

  export let friendDataa;

  $appStore.friends = friendDataa;

  const handleSelectedFriend = e => {
    const friendIndex = e.detail;

    $appStore.selectedFriends = [
      ...$appStore.selectedFriends,
      $appStore.friends[friendIndex]
    ];
  };
</script>

<style>
  .friend {
    display: flex;
    align-items: center;
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

{#if friendDataa}
  {#each friendDataa as friend, index}
    <div class="friend">
      <Checkbox id={index} on:checked={handleSelectedFriend} />
      <img
        class="avatar"
        src={friend.avatarfull}
        alt={`Avatar image of ${friend.personaname}`} />
      <p class="name">{friend.personaname}</p>
    </div>
  {/each}

  <Button />
{:else}
  <p>no Friends :(</p>
{/if}
