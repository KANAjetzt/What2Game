<script>
  import { appStore } from "../stores";
</script>

<style>
  .material {
    position: relative;
    padding: 0;
    margin: 5px;
    border: none;
    overflow: visible;
  }
  .material input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 10px 8px;
    border: none;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 3px solid #eee;
    background-color: transparent;
    color: var(--colorFontMain);
    font-size: 120%;
    outline: none;
    cursor: text;
  }
  .material input::-webkit-input-placeholder {
    -webkit-transition: color 300ms ease;
    transition: color 300ms ease;
  }
  .material input:not(:focus)::-webkit-input-placeholder {
    color: transparent;
  }
  .material hr {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 2px;
    border: none;
    background: #333;
    font-size: 1px;
    will-change: transform, visibility;
    -webkit-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    visibility: hidden;
    z-index: 10;
  }
  .material input:focus ~ hr {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    visibility: visible;
  }
  .material label {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 120%;
    color: var(--colorFontMain);
    -webkit-transform-origin: 0 -150%;
    transform-origin: 0 -150%;
    -webkit-transition: -webkit-transform 300ms ease;
    transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
    transition: transform 300ms ease, -webkit-transform 300ms ease;
    pointer-events: none;
  }
  .material input:focus ~ label,
  .material input:valid ~ label {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
</style>

<fieldset class="material">
  <input
    id="steamId"
    name="steamId"
    type="text"
    placeholder="01234567899876543"
    autocomplete="off"
    required
    value={$appStore.user.steamId ? $appStore.user.steamId : null} />
  <hr />
  <label>Steam ID</label>
</fieldset>
