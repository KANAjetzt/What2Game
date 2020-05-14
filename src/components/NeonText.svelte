<style>
  @font-face {
    font-family: "Liberty";
    src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf");
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    align-content: center;
  }

  .back {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    transform: skewX(-12deg);
    border-radius: 5px;
    border: 5px solid #d9fdff;
    box-shadow: 0 0 20px #d9fdff;
    height: 15em;
    width: 35rem;
    animation: glow 170ms ease infinite forwards;
  }

  .animate {
    animation: flicker 2s ease-in-out alternate;
  }

  .text {
    margin: 0;
    text-align: center;
    transform: translateX(-1rem);
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-family: "Liberty";
    font-weight: 100;
    font-size: 10rem;
    letter-spacing: -0.25em;
  }
  .text .letter {
    color: #d9fdff;
    text-shadow: 0 0 2rem #00f0ff;
    display: inline-block;
  }
  .text .letter-2 {
    transform: translate(-0.2rem, 1rem) rotate(20deg);
    filter: drop-shadow(0px 0px 15px #fb5d3a);
  }

  @keyframes flicker {
    0% {
      opacity: 1;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
    5% {
      opacity: 1;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
    5.5% {
      opacity: 0;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
    6% {
      opacity: 1;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
    50% {
      opacity: 1;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
    100% {
      opacity: 1;
      transform: translate(-0.2rem, 1rem) rotate(20deg);
    }
  }
  @keyframes puls {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    50.5% {
      opacity: 0.5;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes glow {
    50% {
      filter: drop-shadow(0px 0px 25px rgba(217, 253, 255, 0.1));
    }
  }
</style>

<div class="wrapper">
  <div class="back" />
  <h1 class="text">
    <span class="letter letter-1">N</span>
    <span id="animate" class="letter letter-2 animate">E</span>
    <span class="letter letter-3">O</span>
    <span class="letter letter-4">N</span>
  </h1>
</div>
