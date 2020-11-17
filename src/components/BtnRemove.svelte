<script>
  import { createEventDispatcher } from "svelte";

  import CrossIcon from "./icons/Cross.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  const dispatch = createEventDispatcher();

  // Remove Preview Img --> simple dispatch an event and handle it where it get used.
  const handleremoveBtn = e => {
    e.preventDefault();
    dispatch("removebtnclick");
  };
</script>

<style>
  .removeBtn {
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
  class="removeBtn"
  on:click={e => handleremoveBtn(e)}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
  <CrossIcon {width} {height} fill={'#f9fafb'} bg={true} />
</button>
