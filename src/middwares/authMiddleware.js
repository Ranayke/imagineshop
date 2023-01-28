export const authMiddleware = (req, res, next) => {
    const id = req.params.id;
    if(id === '63d4699cb5ebf2caddd30cb9') {
        return next();
    }
    return res.status(401).json({ message: 'Não autorizado.' })

};