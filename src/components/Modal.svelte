<script>
  import { appStore } from "../stores.js";
  import { onMount } from "svelte";

  export let backgroundImage = undefined;

  console.log(backgroundImage);

  onMount(() => {
    $appStore.modalIsOpen = true;
  });
</script>

<style>
  .backdrop {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(30px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    position: relative;
    max-width: 100vw;
    max-height: 100vh;
    padding: 5rem;
    overflow-y: scroll;
    background-size: cover;
    z-index: 1001;
  }
</style>

<div
  class="backdrop"
  on:click={() => {
    console.log('clicked');
  }}>
  <div
    class="modal"
    style={backgroundImage ? `background-image:url(${backgroundImage})` : ''}>
    <slot />
  </div>
</div>
