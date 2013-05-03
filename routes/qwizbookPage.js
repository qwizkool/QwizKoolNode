var QwizbookPage = require('../models/QwizbookPages');

module.exports = {

    /**
    * Create new Qwizbook page
    */
    create : function(req,res){
        var qbookId = req.route.params.id;
        var page = req.body;

        console.log(page);
        QwizbookPage.create(page, function(err, page){
            // If error send the error response
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            }
            res.send({
                id : page._id
            });
        });
    }
}