const axios = require('axios')

const handler = async (event, context) => {
    /* Retrieves the data */
    const steamId = JSON.parse(event.body).steamId;
  
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
    return {
      statusCode: 200,
     body: JSON.stringify({ success: true, data: { friendDataa } })
    }
  }    

exports.handler = handler