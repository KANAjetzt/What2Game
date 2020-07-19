import axios from "axios";

export async function post(req, res, next) {
  /* Initializes */
  res.setHeader("Content-Type", "application/json");

  /* Retrieves the data */
  const steamId = req.body.steamId;

  // Do something with the data...
  const gameReq = await axios(
    `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=2F15898C280E0CD2F2D007CEB140476E&steamid=${steamId}&relationship=friend`
  );

  const friends = gameReq.data.friendslist.friends;
  const steamIds = friends.map((friend) => friend.steamid).join(",");

  const friendData = await axios(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=2F15898C280E0CD2F2D007CEB140476E&steamids=${steamIds}`
  );

  const friendDataa = friendData.data.response.players;

  /* Returns the result */
  return res.end(JSON.stringify({ success: true, data: { friendDataa } }));
}
