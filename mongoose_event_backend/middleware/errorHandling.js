const errorHandling = (error, req, res, next) => {
    console.error(error);
    res.status(500).send();
};

module.exports = errorHandling;
