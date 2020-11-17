<script>
  import { appStore } from "../stores.js";

  export let categorie;
  let isImportant = false;

  // check if categorie is important (coop / multiplayer)
  if ($appStore.importantGameCategorieIds.includes(categorie.id)) {
    isImportant = true;
  }
</script>

<style>
  .categorie {
    display: inline-block;
    padding: 0 1rem;
    cursor: default;
    border: 3px solid rgb(140 136 74 / 73%);
  }

  .categorie--isHighlighted {
    display: inline-block;
    padding: 0 1rem;
    cursor: default;
    border: 3px solid rgb(140 136 74 / 73%);
    background-color: rgb(140 136 74 / 43%);
    box-shadow: 2px 3px 2px 0px rgb(140 136 74 / 16%);
  }
</style>

<li class={`categorie categorie--${isImportant ? 'isHighlighted' : ''}`}>
  <p>{categorie.description}</p>
</li>
