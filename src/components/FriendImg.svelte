<script>
  export let src;
  export let alt;
  export let width = 50;
  export let height = 50;
</script>

<style>
  .avatar {
    height: auto;
    filter: drop-shadow(0px 0px 4px rgba(93, 166, 124, 0.2));
  }
</style>

<img class="avatar" {src} {alt} loading="lazy" {width} {height} />
