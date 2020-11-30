<script>
  import { appStore } from "../stores.js";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";

  import BtnRemove from "../components/BtnRemove.svelte";

  export let backgroundImage = undefined;

  onMount(() => {
    $appStore.modalIsOpen = true;
  });
</script>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(30px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .modal {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    max-width: 80rem;
    padding: 3rem;
    overflow-y: auto;
    background-size: cover;
    z-index: 1001;
  }

  @media only screen and (min-width: 480px) {
    .modal {
      padding: 5rem;
    }
  }

  .content {
    grid-row: 1 / 2;
    grid-column: 1 /2;
  }

  .btnRemove {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    justify-self: end;
    margin: -2rem;
  }
</style>

<div
  class="backdrop"
  in:fade|local={{ duration: 200 }}
  out:fade|local={{ delay: 200, duration: 200 }}
  on:click|self={() => {
    $appStore.modalIsOpen = false;
  }}>
  <div
    class="modal"
    style={backgroundImage ? `background-image:linear-gradient(to right bottom, rgb(15 38 30), rgb(93 166 123 / 38%)), url(${backgroundImage})` : ''}>
    <div
      in:scale|local={{ delay: 400, duration: 200 }}
      out:scale|local={{ duration: 200 }}
      class="content">
      <slot />
    </div>
    <div class="btnRemove">
      <BtnRemove
        on:removebtnclick={() => {
          $appStore.modalIsOpen = false;
        }} />
    </div>
  </div>
</div>
