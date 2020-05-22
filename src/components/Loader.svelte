<script>
  export let style;
</script>

<style>
  .loaderWrapper,
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .loaderWrapper-fullPageCentered {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  .loader {
    width: 10rem;
    height: 5rem;
  }

  .loader-bar-1,
  .loader-bar-2,
  .loader-bar-3 {
    margin: 0 0 1rem 0;
    background-color: #fff;
    height: 1rem;
    clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
  }

  .loader-bar-1 {
    width: 6rem;
    animation: loader-bar-1 1s infinite alternate;
  }

  .loader-bar-2 {
    width: 7rem;
    animation: loader-bar-2 1s 150ms infinite alternate;
  }

  .loader-bar-3 {
    width: 5rem;
    animation: loader-bar-3 1s 220ms infinite alternate;
  }

  @keyframes loader-bar-1 {
    0% {
      transform: translate3d(-3rem, 0, 0);
      opacity: 0.5;
    }

    100% {
      transform: translate3d(3rem, 0, 0);
      opacity: 0.95;
    }
  }

  @keyframes loader-bar-2 {
    0% {
      transform: translate3d(-5rem, 0, 0);
      opacity: 0.5;
    }

    100% {
      transform: translate3d(5rem, 0, 0);
      opacity: 0.95;
    }
  }

  @keyframes loader-bar-3 {
    0% {
      transform: translate3d(-6rem, 0, 0);
      opacity: 0.5;
    }

    100% {
      transform: translate3d(6rem, 0, 0);
      opacity: 0.95;
    }
  }
</style>

<div class={`loaderWrapper loaderWrapper-${style}`}>
  <div class="loader">
    <div class="loader-bar-1" />
    <div class="loader-bar-2" />
    <div class="loader-bar-3" />
  </div>
</div>
