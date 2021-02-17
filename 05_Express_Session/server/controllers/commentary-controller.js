//Dummy Data
const dataResponse = 
    [
        {
            id: 111,
            user: "product in offer 1",
        },
        {
            id: 222,
            user: "product in offer 2",
        },
        {
            id: 333,
            user: "product in offer 3",
        },
        {
            id: 444,
            user: "t-product in offer 4",
        }
    ];

//COMMENTARY LIST
const listCommentary = (request, response) => {
    response.json({
        ok: true,
        commentary: dataResponse
    });
};

//SAVE COMMENTARY
const saveCommentary = (request, response) => {
    response.json({
        ok: true,
        commentary: dataResponse
    });
};

//UPDATE COMMENTARY
const updateCommentary = (request, response) => {
    response.json({
        ok: true,
        commentary: dataResponse[0]
    });
};

//DELETE COMMENTARY
const deleteCommentary = (request, response) => {
    response.json({
        ok: true,
        commentary: dataResponse[0]
    });
};

module.exports = {
    listCommentary,
    saveCommentary,
    updateCommentary,
    deleteCommentary
};