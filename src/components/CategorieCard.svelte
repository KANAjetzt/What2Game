<script>
  export let categorie;
  let isImportant = false;
  const importantCategorieIds = [1, 9, 38];

  // check if categorie is important (coop / multiplayer)

  if (importantCategorieIds.includes(categorie.id)) {
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
