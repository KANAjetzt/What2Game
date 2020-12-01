<script>
  // TODO: - Settings Btn - mount when all games are loaded
  // TODO: - Fix flashing when all games are loaded

  import { appStore, noSinglePlayerGames } from "../stores";
  import { quintOut } from "svelte/easing";
  import { fly, crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  import PageTransition from "../components/PageTransition.svelte";
  import Modal from "../components/Modal.svelte";
  import GameCard from "../components/GameCard.svelte";
  import ModalGame from "../components/ModalGame.svelte";
  import SettingsBtn from "../components/BtnSettings.svelte";

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
</script>

<style>
  .filterBtn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
  }

  .games {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    color: var(--colorFontMain);
    padding: 2rem;
  }
</style>

<svelte:head>
  <title>What2Game - Games</title>
</svelte:head>

<PageTransition>
  <div class="filterBtn">
    <SettingsBtn />
  </div>
  {#if $appStore.clickedGameIndex >= 0 && $appStore.modalIsOpen}
    <Modal
      backgroundImage={$appStore.sameGames[$appStore.clickedGameIndex].background}>
      <ModalGame />
    </Modal>
  {/if}

  <section class="games">
    {#each $appStore.showSinglePlayerGames ? $appStore.sameGames : $noSinglePlayerGames as game, index (game.steam_appid)}
      <div
        class="gameCard"
        in:receive={{ key: index }}
        out:send={{ key: index }}
        animate:flip>
        <GameCard {game} {index} />
      </div>
    {/each}
  </section>

</PageTransition>
