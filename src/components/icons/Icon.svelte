<script>
  export let width;
  export let height;
  export let bg = false;
  export let border = false;
</script>

<style>
  .bg {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    background-image: linear-gradient(
      155.22deg,
      #0476d0 -3.82%,
      #047dd9 104.08%
    );
    border-radius: 100%;
    z-index: 20;
  }
</style>

{#if bg}
  <div
    class="bg"
    style="width: {width < 25 ? width + 10 : width + 20}px; height: {width < 25 ? width + 10 : width + 20}px;
    {border ? 'border: solid 4px var(--color-primary);' : null}">
    <slot />
  </div>
{:else}
  <slot />
{/if}
