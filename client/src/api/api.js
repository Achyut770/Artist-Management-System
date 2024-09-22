export const apiPath = {
    login:"auth/login",
    logout:"auth/logout",
    fetchMyUser:"auth/get-user",
    fetchUser:"auth?page=${page}&pageSize=10",
    fetchArtist:"artist?page=${page}&limit=5",
    fetchSongs:"song/${artistId}/?page=${page}&limit=5",
    userArtistWithOutArtist:"auth/get_artist_without_artist_table",
    fetchUserById:"/auth/${userId}",
    addArtist:"/artist/register",
    addBultkArtist:"/artist/bulk_register",
    addSong:"/song/${artist_id}",
    addUser:"auth/register",
    editArtist:"artist/edit",
    editSong:"song/${artistId}",
    editUser:"auth/edit",
    deleteUser:"auth/delete",
    deleteArtist:"artist",
    deleteSong:"song/${artist_id}"
}

export function template(
  str,
  options,
) {
  let templatedString = str;
  for (const [key, value] of Object.entries(options)) {
    templatedString = templatedString.replaceAll(
      "${" + key + "}",
      value ,
    );
  }
  return templatedString;
}