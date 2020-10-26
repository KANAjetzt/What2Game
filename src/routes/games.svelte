<script>
  import { appStore } from "../stores";
  import { fly } from "svelte/transition";

  import Modal from "../components/Modal.svelte";
  import GameCard from "../components/GameCard.svelte";
  import ModalGame from "../components/ModalGame.svelte";

  $: if ($appStore.clickedGameIndex) {
    console.log($appStore.sameGames[$appStore.clickedGameIndex].background);
  }
</script>

<style>
  .games {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    color: #eee;
    padding: 2rem;
  }
</style>

{#if $appStore.clickedGameIndex && $appStore.modalIsOpen}

  <Modal
    backgroundImage={$appStore.sameGames[$appStore.clickedGameIndex].background}>
    <ModalGame />
  </Modal>
{/if}

<section class="games">
  {#each $appStore.sameGames as game, index (game.steam_appid)}
    <GameCard {game} {index} />
  {/each}
</section>
