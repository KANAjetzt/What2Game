<script>
  import { createEventDispatcher } from "svelte";

  export let id;

  let checked;

  $: if (checked) {
    dispatch("checked", id);
  }

  const dispatch = createEventDispatcher();
</script>

<style>
  /* Quelle: https://codepen.io/bbodine1/pen/novBm */

  .checkbox {
    width: 20px;
    position: relative;
  }

  :global(.checkbox label) {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#222222),
      to(#45484d)
    );
    background: linear-gradient(to bottom, #222222 0%, #45484d 100%);
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
      0px 1px 0px rgba(255, 255, 255, 0.4);
  }

  :global(.checkbox label:after) {
    content: "";
    width: 9px;
    height: 5px;
    position: absolute;
    top: 4px;
    left: 4px;
    border: 3px solid #fcfff4;
    border-top: none;
    border-right: none;
    background: transparent;
    opacity: 0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  :global(.checkbox label:hover::after) {
    opacity: 0.3;
  }

  :global(.checkbox input[type="checkbox"]) {
    visibility: hidden;
  }

  :global(.checkbox input[type="checkbox"]:checked + label:after) {
    opacity: 1;
  }
</style>

<div class="checkbox">
  <input
    type="checkbox"
    id={`checkbox-${id}`}
    accept=""
    name="check"
    bind:checked />
  <label for={`checkbox-${id}`} />
</div>
