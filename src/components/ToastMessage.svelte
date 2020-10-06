<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import { removeMessage, addMessage } from "../utils/messageHandler.js";
  import { appStore } from "../stores";
  import ErrorIcon from "./Icons/ExclamationMark.svelte";
  import InfoIcon from "./Icons/Info.svelte";

  export let message;
  let timerWidth;

  onMount(() => {
    setTimeout(() => {
      // remove Message
      $appStore.messages = removeMessage($appStore.messages, message.location);
    }, message.timeout * 1000);
  });
</script>

<style>
  .toasti {
    position: fixed;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr 5px;
    align-items: center;
    top: 0;
    left: 0;
    width: 90vw;
    margin: 0;
    margin-top: 5rem;
    z-index: 9999;
  }

  .toasti--error {
    background-color: rgba(179, 0, 0, 0.815);
  }

  .toasti--info {
    background-color: var(--color-secondary);
  }

  :global(.toasti svg) {
    padding: 2rem 0 2rem 2rem;
  }

  .message {
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    font-size: 1.6rem;
    margin: 0;
    padding: 2rem;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  .timer {
    position: absolute;
    bottom: 0;
    background-color: rgb(0, 0, 0, 0.3);
    height: 6px;
    width: 100%;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }

  :global(.timer__shrinking) {
    animation-name: shrink;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes shrink {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(var(--timerWidth), 0, 0);
    }
  }
</style>

{#if $appStore.messages[0]}
  <div
    class={`toasti toasti--${message.type}`}
    transition:fly={{ x: -150, duration: 200 }}
    on:introend={() => {
      const timer = document.querySelector('.timer');
      const timerBoundingClient = timer.getBoundingClientRect();
      timerWidth = timerBoundingClient.width;
      document.documentElement.style.setProperty('--timerWidth', `-${timerWidth}px`);
      timer.classList.add('timer__shrinking');
    }}>

    {#if message.type === 'error'}
      <ErrorIcon width="30px" height="30px" fill="#fff" />
    {:else if message.type === 'info'}
      <InfoIcon width="30px" height="30px" fill="#fff" />
    {/if}

    <p class="message">{message.message}</p>
    <div
      class="timer"
      style="animation-duration: {message.timeout * 1000}ms;" />
  </div>
{/if}
