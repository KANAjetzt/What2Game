<script>
  import { appStore } from "../stores";
  import { fly } from "svelte/transition";
</script>

{#each $appStore.sameGames as game (game.steam_appid)}
  <div class="game" transition:fly={{ duration: 1000, x: -200 }}>
    <h2>{game.name}</h2>
    <img
      class="gameImg"
      src={game.header_image}
      alt={`Header image of ${game.name}`} />
    <ul class="categorieList">
      {#each game.categories as categorie}
        <li class="categorie">{categorie.description}</li>
      {/each}
    </ul>

  </div>
{/each}
