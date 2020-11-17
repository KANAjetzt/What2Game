<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  import SettingsIcon from "./icons/Settings.svelte";
  import Settings from "../components/Settings.svelte";
  import BtnRemove from "../components/BtnRemove.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  let btn = true,
    settings;

  // https://stackoverflow.com/questions/59882179/svelte-transition-between-two-elements-jumps
  const change = () => {
    btn ? (btn = !btn) : settings ? (settings = !settings) : null;
  };

  const dispatch = createEventDispatcher();

  // Dispatch an event and handle it where it get used.
  const handleFilterBtn = e => {
    e.preventDefault();

    change();

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
    border-radius: 100%;
    border: 3px solid var(--primaryColor);
  }

  .btnRemove {
    float: right;
    margin: -1rem;
  }
</style>

{#if btn}
  <button
    transition:fly|local={{ duration: 150, x: 200 }}
    on:outroend={() => (settings = true)}
    type="button"
    class="filterBtn"
    on:click={e => handleFilterBtn(e)}
    style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
    <SettingsIcon {width} {height} fill={'#f9fafb'} bg={true} />
  </button>
{/if}

{#if settings}
  <div
    class="settings"
    transition:fly|local={{ duration: 150, x: 200 }}
    on:outroend={() => (btn = true)}>
    >
    <Settings />
    <div class="btnRemove">
      <BtnRemove
        width={20}
        height={20}
        on:removebtnclick={() => {
          change();
        }} />
    </div>
  </div>
{/if}
