<script>
  import { appStore } from "../stores";
</script>

<style>
  .steamId {
    margin: auto;
    margin-top: 2rem;
    font-size: 1.5rem;
    font-family: inherit;
    color: inherit;
    padding: 1.5rem 2rem;
    border-radius: 2px;
    background-color: rbga(#fff, 0.5);
    border: none;
    border-bottom: 3px solid transparent;
    width: 75%;
    display: block;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .steamId:focus:invalid {
    border-bottom: 3px solid #8c884a;
  }
  .steamId:focus {
    outline: none;
    -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid #55c57a;
  }

  input:placeholder-shown + label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }

  label {
    align-self: flex-start;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: 6.2rem;
    margin-top: 0.7rem;
    display: block;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
</style>

<input
  class="steamId"
  id="steamId"
  name="steamId"
  type="text"
  placeholder="Steam ID"
  autocomplete="off"
  required
  bind:value={$appStore.user.steamId} />
<label>Steam ID</label>
