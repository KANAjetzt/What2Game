<script>
  import { appStore } from "../stores";

  export let game;
  export let index;
</script>

<style>
  /* Inspired by https://codepen.io/offeringofpie/pen/ExagprG */
  h2 {
    display: none;
  }

  .game {
    overflow: hidden;
    object-fit: contain;
    cursor: pointer;
    position: relative;
    padding: 0;
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.8);
    transition: 0.3s all ease-out;
    backface-visibility: hidden;
  }

  .game img {
    width: 100%;
    display: inherit;
    transition: 0.2s all ease-out;
  }

  .game:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(
      205deg,
      rgb(255 255 255 / 8%) 0%,
      rgb(255 255 255 / 10%) 50%,
      transparent 52%
    );
    background-size: 200%;
    box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
    transition: 0.3s all ease-out;
    z-index: 10;
  }

  .game:hover {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  .game:hover > img {
    transform: scale(1.05);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  .game:hover:before {
    background-position: 17%;
  }
</style>

<div
  class="game"
  on:click={() => {
    $appStore.clickedGameIndex = index;
    $appStore.modalIsOpen = true;
  }}>
  <img
    class="gameImg"
    src={game.header_image}
    alt={`Header image of ${game.name}`} />
  <h2>{game.name}</h2>
</div>
