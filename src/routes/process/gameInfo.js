import axios from "axios";

export async function post(req, res, next) {
  /* Initializes */
  res.setHeader("Content-Type", "application/json");
  /* Retrieves the data */
  const appId = req.body.appId;
  // Do something with the data...

  const gameReq = await axios(
    `https://store.steampowered.com/api/appdetails?appids=${appId}`
  );

  const gameInfo = gameReq.data;

  /* Returns the result */
  return res.end(JSON.stringify({ success: true, data: { gameInfo } }));
}
