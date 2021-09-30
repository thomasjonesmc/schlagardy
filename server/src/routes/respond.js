// service function is any function from our controllers folder that has a req, res, and next
const respond = (controllerFunction) => {
 
    return async (req, res, next) => {
        try {
            const response = await controllerFunction(req, res, next);
            res.status(200).json(response);
        } catch (err) {      
            next(err);
        }
    }
}

module.exports = respond;