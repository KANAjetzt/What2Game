<script>
  import { fly } from "svelte/transition";
  import { appStore } from "../stores";
  import FriendImg from "./FriendImg.svelte";
  import Loader from "./Loader.svelte";

  export let friend;
  export let index;

  const handleLastLogOff = friend => {
    // check if currently online
    if (friend.personastate !== 0) return "online";

    // ceck if lastlogoff is available
    if (!friend.lastlogoff) return "";

    // convert unix timestamp to js world
    const lastLogOff = friend.lastlogoff * 1000;

    // calculate the time since last log off
    // in seconds /minutes /  houres / days / weeks / years
    const currentTime = Date.now();

    // time difference in seconds
    const timeDif = Math.floor((currentTime - lastLogOff) / 1000);

    // seconds
    if (timeDif <= 60) {
      return `Last online: ${timeDif} seconds ago`;
    }
    // minutes
    else if (timeDif > 60 && timeDif <= 3600) {
      return `Last online: ${Math.floor(timeDif / 60)} minutes ago`;
    }
    // houres
    else if (timeDif > 3600 && timeDif <= 86400) {
      return `Last online: ${Math.floor(timeDif / 60 / 60)} houres ago`;
    }
    // days
    else if (timeDif > 86400 && timeDif <= 604800) {
      return `Last online: ${Math.floor(timeDif / 60 / 60 / 24)} days ago`;
    }
    // weeks
    else if (timeDif > 604800 && timeDif <= 31536000) {
      return `Last online: ${Math.floor(timeDif / 60 / 60 / 24 / 7)} weeks ago`;
    }
    // years
    else if (timeDif > 31536000) {
      return `Last online: ${Math.floor(
        timeDif / 60 / 60 / 24 / 365
      )} years ago`;
    }
  };

  const handleCardStyling = () => {
    let classes = ["friend"];
    // 1) Check if friend has error state
    if (friend.error) {
      classes = [...classes, "friend--error"];
    } else if (friend.selected) {
      classes = [...classes, "friend--selected"];
    }

    return classes.join(" ");
  };
</script>

<style>
  .friend {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    column-gap: 2rem;
    padding: 2rem 3rem;
  }

  .friend--selected {
    background-color: var(--primaryColorDark);
    box-shadow: 0 0 5px rgb(0 0 0 / 85%);
  }

  .friend--error {
    background-color: var(--errorColor);
    box-shadow: 0 0 5px rgb(0 0 0 / 85%);
  }

  .avatar {
    grid-column: 1 / 2;
    width: 4.5rem;
  }

  .info {
    grid-column: 2 / 3;
    display: grid;
    grid-template-rows: min-content min-content;
  }
  p {
    padding: 0.2rem 0;
  }
  .name {
    margin: 0;
    font-size: 1.8rem;
  }

  .lastLogOff {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 300;
    opacity: 0.8;
  }

  .errorMessage {
    color: rgba(238, 238, 238, 0.95);
    grid-column: span 2;
  }

  .errorMessage a {
    font-size: 1.4rem;
    color: rgba(93, 166, 123, 0.98);
    text-decoration: none;
  }
</style>

<div
  class={friend.selected || friend.error ? handleCardStyling() : 'friend'}
  transition:fly|local={{ duration: 200, x: -200 }}>
  <div class="avatar">
    <FriendImg
      src={friend.avatarfull}
      alt={`Avatar image of ${friend.personaname}`} />
  </div>
  {#if $appStore.selectedFriendLoading.isLoading && index === $appStore.selectedFriendLoading.index}
    <Loader />
  {:else}
    <div class="info">
      <p class="name">{friend.personaname}</p>
      <p class="lastLogOff">{handleLastLogOff(friend)}</p>
    </div>
    {#if friend.error}
      <div class="errorMessage">
        <p>Make sure "Profile" and "Game details" are both set to "Public".</p>
        <a href="https://steamcommunity.com/my/edit/settings">
          Steam Privacy Settings
        </a>
      </div>
    {/if}
  {/if}
</div>
