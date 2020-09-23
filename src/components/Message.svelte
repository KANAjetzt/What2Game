<script>
  import { appStore } from "../stores.js";

  export let messageBoxStyle = "";
  export let location;

  // filter out error messages from current location
  const messages = $appStore.messages.filter(
    message => message.location === location
  );
</script>

<style>
  .messageBox {
    margin: 1rem;
    padding: 1rem;
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    font-size: 1.6rem;
    background-color: rgba(255, 0, 0, 0.25);
    box-shadow: 0px 0px 0 2px var(--color-error-primary);
    z-index: 500;
  }

  .messageBox--todoInput {
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    font-size: 1.6rem;
  }

  .messageList {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<div class={`messageBox messageBox--${messageBoxStyle}`}>
  <ul class="messageList">
    {#each messages as message}
      <li class="messageItem">{message.message}</li>
    {/each}
  </ul>
</div>
