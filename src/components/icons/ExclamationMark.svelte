<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let bg = false;
</script>

<Icon {width} {height} {bg}>
  <svg
    {width}
    {height}
    viewBox="0 0 4 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 0H0V12H4V0ZM0 16C0 14.8954 0.895386 14 2 14C3.10461 14 4 14.8954 4
      16C4 17.1046 3.10461 18 2 18C0.895386 18 0 17.1046 0 16Z"
      {fill}
      fill-opacity="0.95" />
  </svg>

</Icon>
