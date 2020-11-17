import axios from "axios";

export async function post(req, res, next) {
  /* Initializes */
  res.setHeader("Content-Type", "application/json");

  /* Retrieves the data */
  const steamId = req.body.steamId;

  // Do something with the data...
  const gameReq = await axios(
    `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`
  );

  const friends = gameReq.data.friendslist.friends;
  const steamIds = friends.map((friend) => friend.steamid).join(",");

  const friendData = await axios(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamIds}`
  );

  const friendDataa = friendData.data.response.players;

  /* Returns the result */
  return res.end(JSON.stringify({ success: true, data: { friendDataa } }));
}
