import { writable, derived } from "svelte/store";

export const appStore = writable({
  user: {},
  friends: [],
  // removed that - So I don't have to maintain 2 redundant friend objects
  // selectedFriends: [],
  sameGames: [],
  messages: [],
  currentPage: [],
});

// Sort Friends ABC
export const sortedFriends = derived(appStore, ($appStore) => {
  if (!$appStore.friends[0]) return;

  // 1) get Friend from App Store
  let { friends } = $appStore;

  friends.sort((a, b) => a.personaname.localeCompare(b.personaname));
});
