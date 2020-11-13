<script>
  import { appStore } from "../stores.js";

  let checked = false;

  const root = document.documentElement.style;
  $: if (checked) {
    root.setProperty("--settingsBtnNOShadowOpacity", "1");
  } else {
    root.setProperty("--settingsBtnNOShadowOpacity", "0");
  }
</script>

<style>
  /* Button 3 */
  .settings {
    margin: 0;
    padding: 2rem;
    position: relative;
    background-image: linear-gradient(
      155.22deg,
      rgba(7, 13, 12, 0.9) -3.82%,
      rgba(15, 38, 30, 0.9) 104.08%
    );
    backdrop-filter: blur(10px);
  }

  li {
    display: grid;
    grid-template-columns: min-content max-content;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .button {
    position: relative;
    width: 74px;
    height: 36px;
    overflow: hidden;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
    /* background-color: hsl(145, 29%, 90%); */
  }

  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .layer {
    position: absolute;
    width: 100%;
    background-color: transparent;
    transition: 0.3s ease all;
    z-index: 1;
  }

  #button-3 {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    box-shadow: 0 0 0 3px var(--primaryColor);
    transition: all 0.2s;
  }

  label {
    font-size: 1.4rem;
    color: var(--colorFontMain);
    grid-column: 2 / 3;
    grid-row: 1 /2;
  }

  #button-3 .knobs:before {
    content: "YES";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: var(--primaryColor);
    border-radius: 50%;
    transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    pointer-events: none;
    z-index: 3;
  }

  #button-3 .checkbox:active + .knobs:before {
    width: 46px;
    border-radius: 100px;
  }

  #button-3 .checkbox:checked:active + .knobs:before {
    margin-left: -26px;
  }

  #button-3 .checkbox:checked + .knobs:before {
    content: "NO";
    left: 42px;
    background-color: #f44336;
  }

  #button-3 .checkbox:checked ~ .layer::before {
    /* background-color: #fcebeb; */
    opacity: 1;
  }
</style>

<ul class="settings">
  <li>
    <label for="showSinglePlayerGames">Show Singleplayer Games</label>
    <div
      class="button r"
      id="button-3"
      style={!checked ? 'box-shadow: 0 0 0 3px var(--primaryColor);' : 'box-shadow: 0 0 0 3px #fcebeb'}>
      <input
        type="checkbox"
        class="checkbox"
        id="showSinglePlayerGames"
        bind:checked
        on:change={() => {
          $appStore.showSinglePlayerGames = !checked;
        }} />
      <div class="knobs" />
      <div class="layer" />
    </div>
  </li>
</ul>
