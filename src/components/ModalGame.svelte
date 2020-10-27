<script>
  import { onMount } from "svelte";
  import { appStore } from "../stores.js";
  import { fade } from "svelte/transition";

  import Carousel from "@beyonk/svelte-carousel";
  import GameCard from "../components/GameCard.svelte";

  const clickedGame = $appStore.sameGames[$appStore.clickedGameIndex];
  const screenshots = clickedGame.screenshots.map(
    screenshot => screenshot.path_thumbnail
  );

  let currentScreenshotIndex = 0;

  const cycleScreenshots = time => {
    setInterval(() => {
      currentScreenshotIndex =
        (currentScreenshotIndex + 1) % screenshots.length;
    }, time * 1000);
  };

  onMount(() => {
    cycleScreenshots(2);
  });

  console.log(clickedGame);
</script>

<style>
  .screenshots {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    position: relative;
    width: 100%;
  }

  .gameImg {
    /* position: absolute; */
    width: 100%;
    height: 20rem;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    object-fit: cover;
  }
</style>

<GameCard game={clickedGame} />

<div class="screenshots">
  {#each [screenshots[currentScreenshotIndex]] as screenshot, index (currentScreenshotIndex)}
    <img
      transition:fade
      class="gameImg"
      src={screenshot}
      alt={`Screenshot  of ${clickedGame.name}`} />
  {/each}
</div>

<div class="description">
  <p>{clickedGame.short_description}</p>
</div>

<ul>
  {#each clickedGame.categories as categorie}
    <li>
      <p>{categorie.description}</p>
    </li>
  {/each}
</ul>
