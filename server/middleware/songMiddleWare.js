import { verifyToken } from '../utils/utils.js';

export const checkSongOwnership = (req, res, next) => {
    const { decoded, error } = verifyToken(req, res);
    if (error) return error;

    const tokenUserId = decoded.userId;
    const paramUserId = req.params.id;

    if (tokenUserId !== paramUserId) {
        return res.status(403).json({ error: 'Access denied. Not authorized to perform this action' });
    }

    next();
};