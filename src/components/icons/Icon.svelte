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
    box-shadow: 2px 2px 2px rgba(15, 38, 30, 0.9);
    background-image: linear-gradient(
      155.22deg,
      rgba(7, 13, 12, 0.9) -3.82%,
      rgba(15, 38, 30, 0.9) 104.08%
    );
    border-radius: 100%;
    z-index: 20;
  }
</style>

{#if bg}
  <div
    class="bg"
    style="width: {width < 25 ? width + 10 : width + 20}px; height: {height < 25 ? height + 10 : height + 20}px;
    {border ? 'border: solid 4px var(--color-primary);' : null}">
    <slot />
  </div>
{:else}
  <slot />
{/if}
