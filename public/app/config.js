// Set the require.js configuration for your application.
require.config({

	// Initialize the application with the main application file and the JamJS
	// generated configuration file.
	deps : ["../vendor/jam/require.config", "main"],

	paths : {
		// Put paths here.<script src="js/bootstrap.min.js"></script>

		bootstrap : "../vendor/bootstrap/js/bootstrap.min",
		bootstrapValidation : "../vendor/bootstrap/js/jqBootstrapValidation",
		tabs : "../assets/js/libs/tabs",
		sha256 : "../assets/js/libs/sha256",
		sha512 : "../assets/js/libs/sha512",
		scion : "../assets/js/libs/SCION/lib/browser/SCXML",
		core_scxml : "../assets/js/libs/SCION/lib/core/scxml/SCXML",
		jsonml_dom : "../assets/js/libs/SCION/lib/external/jsonml/jsonml-dom",
		annotate_scxml_json : "../assets/js/libs/SCION/lib/core/util/annotate-scxml-json",
		json2model : "../assets/js/libs/SCION/lib/core/scxml/json2model",
		array_set : "../assets/js/libs/SCION/lib/core/scxml/set/ArraySet",
		state_kinds_enum : "../assets/js/libs/SCION/lib/core/scxml/state-kinds-enum",
		setup_default_opts : "../assets/js/libs/SCION/lib/core/scxml/setup-default-opts",
		scxml_dynamic_name_match_transition_selector : "../assets/js/libs/SCION/lib/core/scxml/scxml-dynamic-name-match-transition-selector",
		scxml_model : "../assets/js/libs/SCION/lib/core/scxml/model"

	},
	map : {
		// Ensure Lo-Dash is used instead of underscore.
		"*" : {
			"underscore" : "lodash"
		}

		// Put additional maps here.
	},

	shim : {
		// Put shims here.
		tabs : {
			deps : ["jquery"]
		},
		sha256 : {
			deps : ["jquery"]
		},
		bootstrap : {
			deps : ["jquery"],
			exports : 'bootstrap'
		}

	}

});
