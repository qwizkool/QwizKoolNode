/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizEngineView
 * The module renders the view for qwiz engine.
 *
 */

define([
    "app",
    "modules/qwizengine/qwizEngineController",
    "text!modules/qwizengine/templates/qwizEngineView.html"
], function (App, QwizEngine, Template) {

    // Create a new module
    var QwizEngineView = new App.module();

    // Top level view for the qwizkool
    QwizEngineView.View = Backbone.View.extend({

        template: Template,


        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Instantiate the qwiz engine.
            this.engine = new QwizEngine.Controller();

            // Register for transition event.
            this.listenTo(this.engine, "qwiz-transition-view", this.transitionView);
            this.listenTo(this.engine, "qwiz-transition-exit", this.exitQwiz);

            // Initialize the starting view object.
            this.currentView = this.engine.getCurrentView();

        },


        // Default renderer
        render: function () {

            this.$el.html(this.template);
            $(this.el).find('#qwiz-container').html(this.currentView.render().el);

            return this;
        },
        exitQwiz: function() {
            Backbone.history.navigate("#qwizbookDetails/"+ this.options.qwizbookId, true);
        },

        transitionView: function() {
            var view = this.engine.getCurrentView();
            this.renderQwizView(view)
        },

        renderQwizView: function(view) {

            if (this.currentView) {
                this.currentView.remove();
            }

            this.currentView = view;
            $(this.el).find('#qwiz-container').html(this.currentView.render().el);
            return view;
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            if (this.currentView) {
                this.currentView.remove();
            }
            return this;

        }

    });

    return QwizEngineView;
});
