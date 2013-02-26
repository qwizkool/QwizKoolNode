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

            isAddedqwizBook:false,
            AddedqwizBookAttempted:false,
            AddedqwizBookStatus:null
        },
        
        initialize : function() {

			
		},

        createqwizbook:function () {

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
                    model.trigger('create-qwizbook-event');

                    // alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
                },

                success:function (model, response) {
                    //alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");

                    model.set({
                        AddedqwizBookStatus:true,
                        AddedqwizBookStatus:"Successfully Added Qwizbook" + model.get('title') + "Qwizbook id is #" + model.get('id') + ".",
                        action:'none'
                    });
                    model.trigger('create-qwizbook-event');
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
                //return urlRoot;

            } else {

                urlRoot = urlRoot + "?search_str=" + '' + "&sort_by=" + this.filterval;
                //return urlRoot;
            }

            

            return urlRoot;

        },

        initialize:function () {

            // default url for search

            // /qwizbooks?search_str=scala&sort_by=popular&req_count=10&page_num=1

            //search_str : search string
            //sort_by : sort criteria
            //req_count : number of items requested
            //page_num : the page # in the search result to be returned.
            this.searchval = '';
            this.filterval = 'Recently Updated';
            this.isListedqwizBook = false;
            // Commented --needed later

            //this.req_count = '10';
            //this.page_num = '1';
            //this._meta = {};
        },

        //meta : function(prop, value) {
        // if (value === undefined) {
        // return this._meta[prop]
        // } else {
        // this._meta[prop] = value;
        // }
        //},

        qwizbookSearch:function (searchedstring) {
            this.searchval = searchedstring;
            this.urlroot = this.url(searchedstring);

            //alert(this.urlroot);
            //this._meta['action'] = "searchqwizbook";
            //alert(this._meta['action']);
            //alert(this._meta['searchedval']);
        },

        qwizbookFilter:function (filterstring) {
            this.filterval = filterstring;
            this.urlroot = this.url();

            //this.model= new QwizBook.Model();
            //qwizbookAction = "searchqwizbook";
            //this.action = "searchqwizbook";
            //this._meta['action'] = "filterqwizbook";
            //alert(this._meta['action']);
            //alert(this._meta['filterval']);
            //return qwizbookAction;
        },

        QwizbookList:function () {
            var qwizbookList = this;

            var jqxhr = qwizbookList.fetch({

            error : function(collection, response) {
                this.isListedqwizBook = false;
                //alert("Failed to get QwizBooks!");
                console.log("Failed to get QwizBooks!");
                collection.trigger('list-qwizbook-event');
            },

            success : function(collection, response) {
                this.isListedqwizBook = true;
                var List = Array();
                List = qwizbookList.toJSON();
                //alert(List[0].title);
                //console.log(List);
                collection.trigger('list-qwizbook-event');
            }
         });

         //qwizbookList.fetch(function() {

        //console.log(qwizbookList);

        //});

        // $('#qwizbook-lists').html(this.qwizbookListView.render().el);
     }
    });

    QwizBook.Router = Backbone.Router.extend({/* ... */ });

     // This will fetch the tutorial template and render it.
    //Item view
    QwizBook.View = Backbone.View.extend({
        template : "app/templates/qwizbookListItem.html",

        initialize : function() {
            //this.model = new QwizBook.Model();
        },

        render : function(done) {
            var view = this;
            var qbook_template;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function(tmpl) {
            //alert("Templ " + tmpl(view.model.toJSON()) + " " + "json" + view.model.get('title'));
            qbook_template = _.template(tmpl(view.model.toJSON()));
            view.el.innerHTML = qbook_template();

             // If a done function is passed, call it with the element
             if (_.isFunction(done)) {
                 done(view.el);
             }
        });
    },
         events : {
            'click button.qwizbookListItem':'openQwizbook'
        },

         openQwizbook: function(e){
             var clickedEl = $(e.currentTarget);
             var id = clickedEl.attr("id");
             Backbone.history.navigate("#qwizbookDetails/" + id, true);
               
             //this.trigger('getQwizbook', {qwizbookCriteria: id, openDescription:this.options.collection});
          }
     });

   
    QwizBook.ListView = Backbone.View.extend({

        //template:"app/templates/qwizbooklist.html",
        template : "app/templates/qwizbookList.html",

        initialize : function() {
        this.model.on("reset", this.render, this);

    },

    render : function(done) {

        var view = this;
        var qbookview_template;

        // Fetch the template, render it to the View element and call done.
        App.fetchTemplate(this.template, function(tmpl) {

        //alert("Templ " + tmpl(view.model.toJSON()) + " " + "json" + view.model.get('title'));
        qbookview_template = _.template(tmpl());
        view.el.innerHTML = qbookview_template();

        _.each(view.model.models, function(qwizbook) {
            var qwizbookView = new QwizBook.View({
            model : qwizbook
         });
         qwizbookView.render(function(elv) {
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
    return QwizBook;

});