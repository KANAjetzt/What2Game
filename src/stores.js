import { writable, derived } from "svelte/store";

export const appStore = writable({
  user: {},
  friends: [],
  selectedFriends: [],
  selectedFriendsArchive: [],
  selectedFriendLoading: { isLoading: false, index: undefined },
  selectedFriendsHaveChanged: false,
  sameGames: [],
  messages: [],
  currentPage: [],
  importantGameCategorieIds: [1, 9, 38],
  clickedGameIndex: undefined,
  modalIsOpen: false,
  showSinglePlayerGames: true,
  version: 'commitRef',
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

  return ($appStore.selectedFriends = friends.filter(
    (friend) => friend.selected
  ));
});

export const noSinglePlayerGames = derived(appStore, ($appStore) => {
  let { sameGames } = $appStore;
  return sameGames.filter((game) => game.importantCategorie);
});
