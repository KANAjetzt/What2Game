<script>
  import { appStore } from "../stores";
  import { quintOut } from "svelte/easing";
  import { fly, crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  import Modal from "../components/Modal.svelte";
  import GameCard from "../components/GameCard.svelte";
  import ModalGame from "../components/ModalGame.svelte";

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
  .games {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    color: #eee;
    padding: 2rem;
  }
</style>

{#if $appStore.clickedGameIndex >= 0 && $appStore.modalIsOpen}
  <Modal
    backgroundImage={$appStore.sameGames[$appStore.clickedGameIndex].background}>
    <ModalGame />
  </Modal>
{/if}

<section class="games">
  {#each $appStore.sameGames as game, index (index)}
    <div
      class="gameCard"
      in:receive={{ key: index }}
      out:send={{ key: index }}
      animate:flip>
      <GameCard {game} {index} />
    </div>
  {/each}
</section>
