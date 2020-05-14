<script>
  import { createEventDispatcher } from "svelte";

  export let id;

  let checked;

  const dispatch = createEventDispatcher();

  $: if (checked) {
    dispatch("checked", id);
  }
</script>

<style>
  .checkbox {
    position: relative;
  }
  .input {
    opacity: 0;
  }

  /* --- Unchecked  --- */

  .span {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: #eee;
    border: 2px solid #eee;
    transition: all 0.3s;
  }

  .span::after {
    position: absolute;
    content: "";
    left: 12px;
    top: 12px;
    height: 0px;
    width: 0px;
    border-width: 0 3px 3px 0;
    transform: rotate(0deg) scale(0);
    opacity: 1;
  }

  .span:hover {
    background-color: transparent;
  }

  /* --- Checked --- */

  .input:checked ~ .span {
    background-color: transparent;
    transform: rotate(0deg) scale(1);
  }

  .input:checked ~ .span::after {
    transform: rotate(45deg) scale(1);
    opacity: 1;
    left: 8px;
    top: 1px;
    width: 6px;
    height: 17px;
    border: solid #eee;
    border-width: 0 2px 2px 0;
    background-color: transparent;
  }

  .label .span {
    transition: all 0.1s ease-out;
  }

  .label .span:after {
    transition: all 0.1s ease-out;
  }
</style>

<div class="checkbox">

  <label class="label" for={`checkbox-${id}`}>
    <input
      type="checkbox"
      class="input"
      id={`checkbox-${id}`}
      accept=""
      name="check"
      bind:checked />
    <span class="span" />
  </label>
</div>
