import { checkUserRoles } from "../utils/utils.js";

export const checkAdmin = checkUserRoles(["super_admin"]);
