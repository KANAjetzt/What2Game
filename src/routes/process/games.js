import axios from "axios";

export async function post(req, res, next) {
  /* Initializes */
  res.setHeader("Content-Type", "application/json");
  /* Retrieves the data */
  const steamId = req.body.friendSteamId;
  // Do something with the data...

  const gameReq = await axios(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=2F15898C280E0CD2F2D007CEB140476E&steamid=${steamId}&include_played_free_games=true&include_appinfo=true&format=json`
  );

  // console.log(gameReq);

  const games = gameReq.data;

  /* Returns the result */
  return res.end(JSON.stringify({ success: true, data: { games } }));
}
