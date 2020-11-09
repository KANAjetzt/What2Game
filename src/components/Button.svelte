<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .btn {
    cursor: pointer;
    padding: 1.5rem 10rem;
    display: inline-block;
    color: var(--colorFontMain);
    background-color: var(--primaryColor);
    border: 4px solid var(--primaryColor);
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 1px;
    outline: none;
    position: relative;
    transition: all 0.3s;
  }

  .btn:hover {
    background: transparent;
    color: var(--colorFontMain);
  }

  .btn:active {
    top: 2px;
  }
</style>

<button class="btn" on:click={() => dispatch('click')}>
  <slot />
</button>
