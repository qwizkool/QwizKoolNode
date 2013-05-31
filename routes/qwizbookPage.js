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


        Qwizbook.createPageReference(bookId, refs, function(err, pageRefs){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                var refIds = [];
                _.each(pageRefs, function(ref){
                    refIds.push(ref._id);
                })
                console.log(pageRefs);
                page.referenceIds = refIds;
                console.log(page);
                Qwizbook.createQwizbookPage(bookId, page, function(err,page){
                    if (err) {
                        res.send(400, err);
                        console.log(err);
                        return;
                    } else {
                        res.send({
                            page:page,
                            pageReferences:pageRefs
                        })
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

    saveReferences: function(req, res){
        var bookId = req.route.params.bookId,
            pageId = req.route.params.pageId,
            refs   = req.body;

        Qwizbook.createOrUpdatePageReferences(bookId, pageId, refs, function(err, pages){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                res.send(pages);
            }
        });
        
    },

    update : function(req, res){
        var bookId = req.route.params.bookId,
            pageId = req.route.params.pageId,
            page   = req.body;
        Qwizbook.updateQwizbookPage(bookId, pageId, page, function(err, page){
            if(err){
                res.send(400, err);
                return;
            }
            else {
                res.send(page);
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