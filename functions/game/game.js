const axios = require("axios");

const handler = async (event, context) => {
  const steamId = JSON.parse(event.body).steamId;

  const gameReq = await axios(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&include_played_free_games=true&include_appinfo=true&format=json`
  );

  const games = gameReq.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: { games } }),
  };
};

exports.handler = handler;
