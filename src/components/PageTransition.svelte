<script>
  import { fly } from "svelte/transition";
</script>

<main in:fly={{ duration: 550, x: -500 }}>
  <slot />
</main>
