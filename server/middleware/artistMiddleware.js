import { checkUserRoles } from "../utils/utils.js"

export const checkArtistManager = checkUserRoles(["artist_manager"]);

