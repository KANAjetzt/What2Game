<script>
  import { createEventDispatcher } from "svelte";

  import FilterIcon from "./icons/Filter.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  const dispatch = createEventDispatcher();

  // Dispatch an event and handle it where it get used.
  const handleFilterBtn = e => {
    e.preventDefault();
    dispatch("filterbtnclick");
  };
</script>

<style>
  .filterBtn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
  }
</style>

<button
  type="button"
  class="filterBtn"
  on:click={e => handleFilterBtn(e)}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
  <FilterIcon {width} {height} fill={'#f9fafb'} bg={true} />
</button>
