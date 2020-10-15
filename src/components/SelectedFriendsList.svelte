<script>
  import { appStore } from "../stores.js";
  import FriendImg from "./FriendImg.svelte";

  let selectedFriends;
  $: selectedFriends = $appStore.friends.filter(friend => friend.selected);
</script>

<style>
  .selectedFriends {
    width: 92.5%;
    margin: auto;
  }

  .dash {
    width: 100%;
    height: 2px;
    background-color: #5da67c;
  }

  .imgs {
    display: flex;
    margin-top: 1rem;
  }

  .img {
    padding: 0 0.5rem;
  }
</style>

<section class="selectedFriends">

  <div class="dash" />

  <div class="imgs">
    {#each selectedFriends as selectedFriend}
      <div class="img">
        <FriendImg
          src={selectedFriend.avatarfull}
          alt={`Avatar image of ${selectedFriend.personaname}`}
          width={30}
          height={30} />
      </div>
    {/each}
  </div>

</section>
