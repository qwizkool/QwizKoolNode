define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var Comments = App.module();

    Comments.Model = Backbone.Model.extend({

        urlRoot:function () {

            urlRootBase = "/";

            if (this.action == "addQwizbookComments") {
                return urlRootBase + "comments/";
            }

        },

        defaults:{
            id:null,
            comment:'qwizbook comments',
            qwizbookId:null
        },

        initialize:function () {


        },

        isUserAuthenticated:function () {
            var state = this.get('isLoggedIn');
            return state;
        },

        addQwizbookComments:function (comments, qId) {
            this.set('comment', comments);
            this.set('qwizbookId', qId);
            this.action = "addQwizbookComments";

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    console.log('error');
                },

                success:function (model, response) {
                }
            });

        }



    });

    Comments.Collection = Backbone.Collection.extend({

        model:Comments.Model,
        url:function () {

            if (this.qwizbookId) {

                urlRoot = "/comments" + "/" + this.qwizbookId;
            }


            return urlRoot;
        },
        QwizbookComments:function (qwizbookId) {
            this.qwizbookId = qwizbookId;
            this.urlroot = this.url();

            var qwizbookComments = this;

            var jqxhr = qwizbookComments.fetch({

                error:function (collection, response) {
                },

                success:function (collection, response) {
                    List = qwizbookComments.toJSON();
                }
            });

        }


    });


    Comments.Router = Backbone.Router.extend({/* ... */ });

    Comments.View = Backbone.View.extend({
        template:"app/templates/commentListView.html",

        initialize:function () {
            //this.model = new QwizBook.Model();
        },

        render:function (done) {
            var view = this;
            var qcomments_template;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {
                //alert("Templ " + tmpl(view.model.toJSON()) + " " + "json" + view.model.get('title'));
                qcomments_template = _.template(tmpl(view.model.toJSON()));
                view.el.innerHTML = qcomments_template();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }
            });
        }

    });

    Comments.ListView = Backbone.View.extend({

        template:"app/templates/commentList.html",

        initialize:function () {

        },

        render:function (done) {

            var view = this;
            var commentTemplate;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {

                commentTemplate = _.template(tmpl());
                view.el.innerHTML = commentTemplate();
                _.each(view.model.models, function (comment) {
                    var commentView = new Comments.View({
                        model:comment
                    });
                    commentView.render(function (elv) {

                        $(view.el).find("#home-content-container").append(elv);
                    });
                });

// If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }
            });

            return this;
        }
    });


    // Required, return the module for AMD compliance
    return Comments;

});
