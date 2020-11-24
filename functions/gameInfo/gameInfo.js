const axios = require("axios");

const handler = async (event, context) => {
  const appId = JSON.parse(event.body).appId;

  const gameReq = await axios(
    `https://store.steampowered.com/api/appdetails?appids=${appId}`
  );

  const gameInfo = gameReq.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: { gameInfo } }),
  };
};

exports.handler = handler;
