import { writable, derived } from "svelte/store";

export const appStore = writable({
  user: {},
  friends: [],
  // removed that - So I don't have to maintain 2 redundant friend objects
  selectedFriends: [],
  sameGames: [],
  messages: [],
  currentPage: [],
  importantGameCategorieIds: [1, 9, 38],
  clickedGameIndex: undefined,
  modalIsOpen: false,
});

// Sort Friends ABC
export const sortedFriends = derived(appStore, ($appStore) => {
  if (!$appStore.friends[0]) return;

  // 1) get Friend from App Store
  let { friends } = $appStore;

  friends.sort((a, b) => a.personaname.localeCompare(b.personaname));
});

export const selectedFriends = derived(appStore, ($appStore) => {
  if (!$appStore.friends[0]) return;

  // 1) get Friend from App Store
  let { friends } = $appStore;

  return $appStore.selectedFriends = friends.filter(friend => friend.selected)
});

export const sortedGames = derived(appStore, $appStore => {

  // 1) get same games from appStore
  let {sameGames} = $appStore

  return sameGames.sort((a, b) => {
    if(a){
      a = a.categories.filter(categorie => $appStore.importantGameCategorieIds.includes(categorie.id))
    if(a.length === 0){ a = false} else {
      a = true
    }
    } else {
      b = b.categories.filter(categorie => $appStore.importantGameCategorieIds.includes(categorie.id))
    if(b.length === 0){ b = false} else {
      b = true
    }
    }
    

    return (a === b) ? 0 : a ? -1 : 1})
})