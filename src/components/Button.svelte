<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .btn {
    cursor: pointer;
    padding: 1.5rem 10rem;
    display: inline-block;
    color: #eee;
    background-color: #5da67c;
    border: 4px solid #5da67c;
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 1px;
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
