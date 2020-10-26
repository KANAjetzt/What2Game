<script>
  import { appStore } from "../stores.js";

  import GameCard from "../components/GameCard.svelte";
  import Carousel from "@beyonk/svelte-carousel";

  let clickedGame = $appStore.sameGames[$appStore.clickedGameIndex];

  console.log(clickedGame);
  console.log();
</script>

<style>
  .screenshots {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .gameImg {
    width: 100%;
    height: auto;
  }
</style>

<GameCard game={clickedGame} />

<div class="screenshots">
  {#each clickedGame.screenshots as screenshot, index}
    <img
      class="gameImg"
      src={screenshot.path_thumbnail}
      alt={`Screenshot ${index} of ${clickedGame.name}`} />
  {/each}
</div>

<!-- <Carousel autoplay={1000 * 1} perPage={1}>
  {#each clickedGame.screenshots as screenshot, index}
    <div class="slide-content">
      <img
        class="gameImg"
        src={screenshot.path_thumbnail}
        alt={`Screenshot ${index} of ${clickedGame.name}`} />
    </div>
  {/each}
</Carousel> -->
