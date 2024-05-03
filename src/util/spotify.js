let accessToken = "";
const clientId = "165ed747e7ee4081809a4930651a190b";
const redirectURI = "https://eli-jones-jammming.netlify.app/";

const Spotify = {
  getAccessToken() {
      if (accessToken) {
          return accessToken;
      }
      const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
      const expiryTime = window.location.href.match(/expires_in=([^&]*)/);
      if (tokenInURL && expiryTime) {
          // sets access token and expiry time variables
          accessToken = tokenInURL[1];
          const expiresIn = Number(expiryTime[1]);
          //sets function to reset token when it expires
          window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
          //clears URL after token expires
          window.history.pushState("Access Token", null, "/");
          return accessToken;
      } else {
          const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = redirect;
      }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then(jsonResponse => {
        if (!jsonResponse) {
            console.log('Error');
        }
        return jsonResponse.tracks.items.map(t => ({
            id: t.id,
            name: t.name,
            artist: t.artists[0].name,
            album: t.album.name,
            uri: t.uri
        }))
    })
  },
  savePlaylist(name, trackUris) {
      if (!name || !trackUris) return;
      const aToken = Spotify.getAccessToken();
      const header = {Authorization: `Bearer ${aToken}`};
      let userId;
      return fetch(`https://api.spotify.com/v1/me`, {headers: header})
      .then(response => response.json())
      .then(jsonResponse => {
          userId = jsonResponse.id;
          let playlistId; 
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers: header,
              method: 'POST',
              body: JSON.stringify({name: name})
          })
          .then(response => response.json())
          .then(jsonResponse => {
              playlistId = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/playlist/${playlistId}/tracks`, {
                  headers: header,
                  method: 'POST',
                  body: JSON.stringify({uris: trackUris})
              })
          })
      });
  }
};

export {Spotify};
