import { writable, derived } from "svelte/store";

export const appStore = writable({
  user: {},
  friends: [],
  selectedFriends: [],
  sameGames: [],
  messages: [],
});

// Sort Friends ABC
export const sortedFriends = derived(appStore, ($appStore) => {
  if (!$appStore.friends[0]) return;

  // 1) get Friend from App Store
  let { friends } = $appStore;

  friends.sort((a, b) => a.personaname.localeCompare(b.personaname));
});
