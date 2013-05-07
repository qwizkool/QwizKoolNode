/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBook
 *
 */



define([
    "app",
    "modules/qwizbook/qwizbookModel"
], function(App, QwizBook){
    QwizBook.Collection = Backbone.Collection.extend({

        model:QwizBook.Model,

        url:function () {
            var urlRoot = "/";

            if (this.searchval != '') {
                urlRoot = "qwizbooks"+urlRoot + "?search_str=" + this.searchval + "&sort_by=" + this.filterval+"&page=1&limit=10";


            }
            
            else if(this.myQwizbook)
            {
                //urlRoot ="myQwizbook";
                urlRoot ="users/"+this.userId+"/qwizbooks?page=1&limit=10";
                if(this.search)
            {
                if(this.searchParam != '')
                {
                    urlRoot ="users/"+this.userId+"/qwizbooks?search_str=" + this.searchParam+"&archived=false&page=1&limit=10";
                }
            }
            }
            
             else if(this.search)
            {
                if(this.searchParam != '')
                {
                    urlRoot ="users/"+this.userId+"/qwizbooks?search_str=" + this.searchParam + "&page=1&limit=10";
                }
                else{
                    urlRoot ="users/"+this.userId+"/qwizbooks?archived=true&page=1&limit=10";
                }
                
            }
            
            
            else if(this.deleteQwizbookId){
                urlRoot ="deleteQwizbook/"+this.deleteQwizbookId;
            }
            
           
            
            else if(this.archiveQwizbook){
                urlRoot ="users/"+this.userId+"/qwizbooks?archived=true&page=1&limit=10";
            }
            
            
             else {

                urlRoot = "qwizbooks"+urlRoot + "?search_str=" + '' + "&sort_by=" + this.filterval +"&page=1&limit=10";

            }
            return urlRoot;

        },

        initialize:function () {

            /* Set the default properties */
            this.userId='';
            this.searchval = '';
            this.searchParam ='';
            this.search =false;
            this.myQwizbook = false;
            this.deleteQwizbookId =false;
            this.archiveQwizbook =false;
            this.filterval = 'Recently Updated';
            this.isListedqwizBook = false;

        },

        setSearchParams:function (searchedstring) {
            this.searchval = searchedstring;
        },

        setFilterParams:function (filterstring) {
            this.filterval = filterstring;
        },

        //TODO: qwizbook collection or model should not have direct reference to session.
        // need to cleanup to use user id . Also setting these properties need to be done
        // through collection constructor by passing it as options

        setMyQwizbookMode:function(session){
            this.myQwizbook =true; 
            this.userId = session.id;
        },
        setSearchParameter : function(session,seachPArameter)
        {
            this.search = true;
            this.userId = session.id;
            this.searchParam = seachPArameter;
        },


        setArchiveQwizbookMode: function(session){
            this.userId = session.id;
            this.archiveQwizbook =true;
        },
       

        getAllBooks:function () {
             var jqxhr = this.fetch({

                // specify fetch to reset the collection instead
                // of add/merge using set.
                reset: true,

                error:function (collection, response) {
                    this.isListedqwizBook = false;
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedqwizBook = true;


                    if (response == null) {
                        
                        
                        collection.trigger('no-qwizbook-tolist');
                    }

                    collection.trigger('list-qwizbook-event');
                }
            });
        },
        
        getMybooks:function(){
            
            var qwizbookList = this;
            var jqxhr = qwizbookList.fetch({
             reset: true,

                error:function (collection, response) {
                    this.isListedqwizBook = false;
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedqwizBook = true;
                    var List = Array();
                    if (response && response.page == "Archive") {
                        collection.trigger('no-qwizbook-tolist');
                        return;
                    }
                    collection.trigger('list-qwizbook-event');
                }
            });
            
        }
        
    });

    return QwizBook;
});