<script>
  import { fly } from "svelte/transition";

  export let friend;

  console.log(friend);
  // console.log((Date.now() / 1000 - friend.lastlogoff) * 60);
</script>

<style>
  .friend {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    box-shadow: 1px 4px 10px 0px rgba(0, 0, 0, 0.05);
  }

  .avatar {
    width: 4.5rem;
    height: auto;
    margin-left: 3rem;
  }

  .name {
    margin-left: 2rem;
  }
</style>

<div class="friend" transition:fly={{ duration: 200, x: -200 }}>
  <img
    class="avatar"
    src={friend.avatarfull}
    alt={`Avatar image of ${friend.personaname}`}
    loading="lazy"
    width="50"
    height="50" />
  <p class="name">{friend.personaname}</p>
  <p class="name">Last Logon:</p>
</div>
