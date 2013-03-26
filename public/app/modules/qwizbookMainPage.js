define([
    "app",
    "modules/header",
    "modules/qwizbook",
    "modules/comments",
    "modules/userSettings",
    "modules/qwizbookContent",
    "modules/qwizbookComments",
    "modules/footer"
], function (App, Header, Qwizbook, Comments, UserSettings, QwizbookContent, QwizbookComments, Footer) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({


        initialize:function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.session});

            this.header = new Header.View({htbuView:this.userSettings});

            this.footer = new Footer.View();


            this.qbookid = this.options.qwizbookId;

            this.selectedQwizbook = new Qwizbook.Model({id:this.qbookid, session:this.session});
            this.selectedQwizbook.retreive();
            this.selectedQwizbook.on("retreive-qwizbook-success-event", this.getComments, this);


        },

        getComments:function () {
            var view = this;
            this.qwizbookData = view.selectedQwizbook;
            this.commentList = new Comments.Collection({qwizbookId:this.qbookid});
            this.commentList.on("reset", this.updateModel, this);

            this.commentList.QwizbookComments(this.qbookid);

            this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookData, commentmodel:this.commentList, qwizbookId:this.qbookid, el : '#qwizkool-content', session:this.session});

        },


        updateModel:function () {
            this.qwizbookContent.render();
        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function () {

            this.header.render();
            this.footer.render();


        }
    });

    return QwizbookMainPage;
});

