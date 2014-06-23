define([
  "backbone.layoutmanager",
  "app_config"

  // Include additional libraries installed with JamJS or placed in the
  // `vendor/js` directory, here.
],

function(LayoutManager, AppConfig) {

    /**
     * Allow underscore use of partials
     */
    var underscorePartials = (function(){
        var partialCache = {};

        var mixin = {
            declarePartial: function(name, template) {
                partialCache[name] = _.template(template);
            },
            partial: function(name, data) {
                return partialCache[name](data)
            }
        };

        return mixin;

    })();

    _.mixin(underscorePartials)


  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/",
    // Qwizkool Container object to hold configuration parameters
    appConfig :{}
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};


  // Configure LayoutManager with Backbone Boilerplate defaults.
  LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: false,

    prefix: "app/templates/",

    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (JST[path]) {
        return JST[path];
      }

      // Put fetch into `async-mode`.
      var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        done(_.template(contents));
      }, "text");
    }
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, AppConfig, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Check if a layout already exists, if so, update the template.
      if (this.layout) {
        this.layout.template = options.template;
      } else {
        // Create a new Layout with options.
        this.layout = new Backbone.Layout(_.extend({
          el: "main"
        }, options));
      }

      // Cache the reference.
      return this.layout;
    }
  }, Backbone.Events);

});
