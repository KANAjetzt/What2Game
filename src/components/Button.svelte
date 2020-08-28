<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .btn {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    padding: 25px 80px;
    display: inline-block;
    color: #333;
    background: #eee;
    border: 4px solid #eee;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    transition: all 0.3s;
  }

  .btn:hover {
    background: transparent;
    color: #eee;
  }

  .btn:active {
    top: 2px;
  }
</style>

<button class="btn" on:click={() => dispatch('click')}>
  <slot />
</button>
