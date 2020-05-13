import { writable } from "svelte/store";

export const appStore = writable({
  friends: [],
  selectedFriends: [],
  sameGames: [],
});
