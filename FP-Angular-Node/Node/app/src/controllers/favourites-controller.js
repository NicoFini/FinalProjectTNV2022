import Rating from "../models/rating.js";

export const getAllFavourites = async (req, res) => {
    try {
        const favourites = await Rating.findAll({
            where: {
                user_id: req.params.userId,
                
            }
        });
        
        if (favourites) {
            res.send(favourites);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}