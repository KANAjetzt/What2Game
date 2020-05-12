<script context="module">
  export async function fetchGames(steamId) {
    const gameReq = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=2F15898C280E0CD2F2D007CEB140476E&steamid=${steamId}&format=json`
    );
    const games = (await gameReq.json()).response.players;

    return { games };
  }
</script>
