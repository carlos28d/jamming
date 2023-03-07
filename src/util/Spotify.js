const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/";
let accessToken;
const Spotify = {
  getAcessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Acess Token", null, "/");
      return accessToken;
    } else {
      const scope = encodeURIComponent(
        "playlist-modify-public user-read-recently-played"
      );
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location.href = accessUrl;
    }
  },
  search(term) {
    const accessToken = Spotify.getAcessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        const tracks = jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
        return tracks;
      });
  },
  async savePlaylist(name, trackUris) {
    if (!name && !trackUris.length) {
      return;
    }
    const accessToken = await Spotify.getAcessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const userJsonReponse = await userResponse.json();
    const userId = await userJsonReponse.id;
    const playlistReponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      }
    );
    const playlistJsonResponse = await playlistReponse.json();
    const playlistId = await playlistJsonResponse.id;
    //Is the return keyword needed?
    return fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  },
  async getRecentlyPlayed() {
    const accessToken = await Spotify.getAcessToken();
    const playedResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const playedJsonResponse = await playedResponse.json();
    const items = playedJsonResponse.items;
    const tracks = items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      uri: item.track.uri,
    }));
    return tracks;
  },
};

export default Spotify;
