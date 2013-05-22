var Qwizbook = require('../models/Qwizbooks')
    _ = require('underscore');

module.exports = {

    /**
    * Create new Qwizbook page
    */
    create: function(req, res){
        var bookId = req.route.params.id;
            data = req.body,
            page = data.qwizbookPage,
            refs = data.pageReference;
        Qwizbook.createQwizbookPage(bookId, page, function(err,page){
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            } else {
                _.each(refs, function(ref){
                    ref.pageId = page._id;
                })
                Qwizbook.createPageReference(bookId, refs, function(err, pageRefs){
                    if(err){
                        res.send(400, err);
                        return;
                    }
                    else {
                        res.send({
                            qwizbookPage: page,
                            pageReference: pageRefs
                        });
                    }
                });
            }
        });
    },

    getAll : function(req, res){
        var bookId = req.route.params.id,
            p = req.query,
            page = p.page - 1,
            limit = p.limit;
        Qwizbook.retrieveQwizbookPages(bookId,page,limit, function(err, pages){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                res.send(pages);
            }
        });
    },

    getReferences: function(req, res){
        var bookId = req.route.params.bookId,
            pageId = req.route.params.pageId;

        Qwizbook.getAllPageReferenes(bookId, pageId, function(err, pages){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                res.send(pages);
            }
        });
    },

    delete : function(req, res){
        var bookId = req.route.params.bookId,
            pageId = req.route.params.pageId;
            
        Qwizbook.deleteQwizbookPage(bookId,pageId, function(err, pages){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                res.send(pages);
            }
        })
    }
}