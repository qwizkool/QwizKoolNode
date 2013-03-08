define([
    "app",
    "text!templates/commentList.html",
    "text!templates/commentListView.html"
], function (App, TemplateList, TemplateListView) {

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
        template:TemplateListView,

        initialize:function () {
            //this.model = new QwizBook.Model();
        },

        render:function (done) {
            var view = this;
            view.el.innerHTML = _.template(this.template, view.model.toJSON());
            return view;
        }

    });

    Comments.ListView = Backbone.View.extend({

        template:TemplateList,

        initialize:function () {

        },

        render:function (done) {

            var view = this;
            view.el.innerHTML = _.template(this.template, view.model.toJSON());

            _.each(view.model.models, function (comment) {

                var commentView = new Comments.View({
                    model:comment
                });

                $(view.el).find("#comment-list-container").append(commentView.render().el);

            });

            return view;
        }
    });

    return Comments;

});
