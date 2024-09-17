import { checkUserRole } from "../utils/utils.js";

export const checkAdmin = checkUserRole('super_admin');
