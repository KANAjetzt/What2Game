import { writable } from "svelte/store";

export const appStore = writable({
  user: {},
  friends: [],
  selectedFriends: [],
  sameGames: [],
});
