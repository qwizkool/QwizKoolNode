/*
 QwizBook represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
 The QwizBook primarily maintains a list of QwizPage references, and the starte transitions between them.
 A QwizPage could be an intro page, a multiple choice question, summary etc.
 */

define([
    "app",
    "text!templates/qwizbookListItem.html",
    "text!templates/qwizbookList.html"

], function (App, TmplQwizbookItem, TmplQwizbookList) {

    // Create a new module
    var QwizBook = App.module();

    QwizBook.Model = Backbone.Model.extend({

        //Root of the REST url for QwizBooks
        urlRoot:"/qwizbooks/",

        defaults:{
            id:null,
            uniqueKey:null,
            title:"Welcome to a new way of learning ..",
            description:"Qwizbook Description",
            ownerEmail:"qwizkool_user@qwizkool.com",
            date:Date.now,
			userrating:"0",
            isAddedqwizBook:false,
            AddedqwizBookAttempted:false,
            AddedqwizBookStatus:null
        },

        create:function () {

            this.set({
                AddedqwizBookAttempted:true,
                isAddedqwizBook:false,
                AddedqwizBookStatus:null
            });

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isAddedqwizBook:false,
                        AddedqwizBookStatus:response.statusText,
                        action:'none'
                    });
                    model.trigger('qwizbook-create-failed-event');

                },

                success:function (model, response) {

                    model.set({
                        isAddedqwizBook:true,
                        AddedqwizBookStatus:"Successfully Added Qwizbook" + model.get('title') + "Qwizbook id is #" + model.get('id') + ".",
                        action:'none'
                    });
                    model.trigger('qwizbook-create-success-event');
                }
            });

        }
    });

    QwizBook.Collection = Backbone.Collection.extend({

        model:QwizBook.Model,

        url:function () {
            var urlRoot = "/qwizbooks";

            if (this.searchval != '') {
                urlRoot = urlRoot + "?search_str=" + this.searchval + "&sort_by=" + this.filterval;


            } else {

                urlRoot = urlRoot + "?search_str=" + '' + "&sort_by=" + this.filterval;

            }
            return urlRoot;

        },

        initialize:function () {
            this.searchval = '';
            this.filterval = 'Recently Updated';
            this.isListedqwizBook = false;
          },

        qwizbookSearch:function (searchedstring) {
            this.searchval = searchedstring;
            this.urlroot = this.url(searchedstring);
        },

        qwizbookFilter:function (filterstring) {
            this.filterval = filterstring;
            this.urlroot = this.url();
        },

        QwizbookList:function () {
            var qwizbookList = this;
            var jqxhr = qwizbookList.fetch({

                error:function (collection, response) {
                    this.isListedqwizBook = false;
                    console.log("Failed to get QwizBooks!");
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedqwizBook = true;
                    var List = Array();
                    List = qwizbookList.toJSON();
                    collection.trigger('list-qwizbook-event');
                }
            });
        }
    });

    QwizBook.Router = Backbone.Router.extend({/* ... */ });

    QwizBook.View = Backbone.View.extend({

        template:TmplQwizbookItem,

        initialize:function () {
        },

        render:function (done) {

            var view = this;
            var qbook_item_template;
            qbook_item_template = _.template(this.template, view.model.toJSON());
            
            view.el.innerHTML = qbook_item_template;
            return this;
        },

        events:{
            'click button.qwizbookListItem':'openQwizbook'
        },

        openQwizbook:function (e) {
            var clickedEl = $(e.currentTarget);
            var id = clickedEl.attr("id");
            Backbone.history.navigate("#qwizbookDetails/" + id, true);

            //this.trigger('getQwizbook', {qwizbookCriteria: id, openDescription:this.options.collection});
        }
    });


    QwizBook.ListView = Backbone.View.extend({

        template:TmplQwizbookList,

        initialize:function () {
        },

        render:function (done) {

            var view = this;
            var qbook_list_template;

            qbook_list_template = this.template;

            view.el.innerHTML = qbook_list_template;

            $(view.el).find("#qwizbook-list-container").empty();

            _.each(view.model.models, function (qwizbook) {

                var qwizbookView = new QwizBook.View({
                    model:qwizbook
                });
				
                $(view.el).find("#qwizbook-list-container").append(qwizbookView.render().el);

            });

            return this;

        }
    });

    return QwizBook;

});