/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoringContent
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "modules/editQwizbook",
    "text!templates/qwizbookAddDetailsContent.html"

], function (App, QwizBook, EditQwizbook , Template) {

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
			this.session = this.options.session;
            
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}
           
            this.qwizbookId = this.options.qwizbookId;
            this.qwizbookModel = new QwizBook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizbookModel.retreive();
            this.qwizbookModel.on("retreive-qwizbook-success-event", this.updateView, this);
			this.editQwizbook = new EditQwizbook.View({model: this.qwizbookModel, qwizbookId: this.qwizbookId, session:this.session});

        },
         updateView : function()
        {
        	$(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
        },

       events: {
            "click #icon-author-content": "showAuthorForm",
             "click #qwizbook-questionnare-form a": "showOrhideImageAudioVideoDiv",
           
            //Show reference container
            "click #add-more-references": "showReferenceContainer",
            //Submit Form
            "click #btn-qwizbook-author-submit": "submitAuthorForm",
            //Cancel Form
            "click #btn-qwizbook-author-cancel": "cancelAuthorForm",
            
            //edit qwizbook
            "click #btn-save-qwizbook" : "editBook"

        },
        
        showOrhideImageAudioVideoDiv :function(e)
        {
        	var div =e.target.parentNode.id;
        	var split_id = div.split("_");
        	var divId = split_id[0];
        	var DivtoShow = divId +'-container';
        	var clearInput = divId +'_input';
        	if($('#'+DivtoShow).is(":visible") == false)
        	{
        		$('#'+DivtoShow).show();
        	}
        	else
        	{
        		$('#'+clearInput).val("");
        		$('#'+DivtoShow).hide();
        	}
        },
        
       
        
        editBook :function ()
        {
        	var new_title = $('#qwizbook-title').val();
        	var new_description =  $('#qwizbook-description').val();
        	var view = this;
        	var qwizbook = view.qwizbookModel;
        	qwizbook.create(new_title, new_description);
        },

        showAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').show();

        },
        
        
        showReferenceContainer: function (e) {
        	var div =e.target.parentNode.id;
        	var count = $('#reference_count').val();
        	
        	var html = '<tr>';
        	html += '<td align="right" style="border: 1px solid #EEEEEE;padding:10px;" class="span3">Description </td>';
        	html += '<td align="left" class="span9" style="border: 1px solid #EEEEEE;padding:10px;">';
			html +='<div style="float:left">';
			html +='<textarea name="reference_description'+count+'" id="reference_description'+count+'"> </textarea>';
			html +='</div>'	;
			html +='<div style="float: right;width:72%;padding-top:18px;">';
			html +='<a class="btn" id="reference-link-'+count+'_show" title="Add Link"><i class="icon-external-link"></i> </a>';
			html +='<a class="btn" id="reference-image-'+count+'_show" title="Add Image"><i class="icon-picture"></i> </a>';
			html +='<a class="btn" id="reference-audio-'+count+'_show" title="Add Audio"><i class="icon-volume-up"></i> </a>';	
			html +='<a class="btn" id="reference-video-'+count+'_show" title="Add Video"><i class="icon-facetime-video"></i> </a>';					
			html +='</div></td></tr>';								
										
        	html +='<tr id="reference-link-'+count+'-container" style="display:none;">';
        	html +='<td align="right" style="border: 1px solid #EEEEEE;padding:10px;" class="span3">Link </td>';
        	html +='<td style="border: 1px solid #EEEEEE;padding:10px;">';
			html +='<div style="float:left;">';							
			html +='<input type="text" name="reference-link-'+count+'_input" id="reference-link-'+count+'_input">';
			html +='</div>'	;
			html +='<div id="reference-link-'+count+'">';	
			html +='<div class="span1">';	
			html +='<i class="icon-external-link"></i>';	
			html +='</div>';	
			html +='<a id="reference-link-'+count+'_hide" class="btn"><i class="icon-minus"></i> </a>';	
			html +='</div></td>';	
			html +='</tr>';
			html +='<tr id="reference-image-'+count+'-container" style="display:none;">';	
			html +='<td align="right" style="border: 1px solid #EEEEEE;padding:10px;" class="span3">Image </td>';	
			html +='<td style="border: 1px solid #EEEEEE;padding:10px;">';	
			html +='<div style="float:left;">';	
			html +='<input type="text" name="reference-image-'+count+'_input" id="reference-image-'+count+'_input">';	
			html +='</div>';	
			html +='<div id="reference-image-'+count+'">';	
			html +='<div class="span1">';	
			html +='<i class="icon-picture"></i>';	
			html +='</div>';
			html +='<a id="reference-image-'+count+'_hide" class="btn"><i class="icon-minus"></i> </a>';	
			html +='</div></td>';	
			html +='</tr>';	
			html +='<tr id="reference-audio-'+count+'-container" style="display:none;">';	
			html +='<td align="right" style="border: 1px solid #EEEEEE;padding:10px;" class="span3">Audio </td>';	
			html +='<td style="border: 1px solid #EEEEEE;padding:10px;">';	
			html +='<div style="float:left;">';	
			html +='<input type="text" name="reference-audio-'+count+'_input" id="reference-audio-'+count+'_input">';	
			html +='</div>';	
			html +='<div id="reference-audio-'+count+'">';
			html +='<div class="span1">';	
			html +='<i class="icon-picture"></i>';	
			html +='</div>';	
			html +='<a id="reference-audio-'+count+'_hide" class="btn"><i class="icon-minus"></i> </a>';	
			html +='</div></td>';	
			html +='</tr>';	
			html +='<tr id="reference-video-'+count+'-container" style="display:none;">';	
			html +='<td align="right" style="border: 1px solid #EEEEEE;padding:10px;" class="span3">Video </td>';	
			html +='<td style="border: 1px solid #EEEEEE;padding:10px;">';	
			html +='<div style="float:left;">';
			html +='<input type="text" name="reference-video-'+count+'_input" id="reference-video-'+count+'_input">';	
			html +='</div>';	
			html +='<div id="reference-video-'+count+'">';	
			html +='<div class="span1">';	
			html +='<i class="icon-picture"></i>';	
			html +='</div>';
			html +='<a id="reference-video-'+count+'_hide" class="btn"><i class="icon-minus"></i> </a>';	
			html +='</div></td>';	
			html +='</tr>';							
			count++;
			$('#reference_count').val(count);						
			$(html).insertBefore($((e.target.parentNode).parentNode).closest('tr'));
        },
        
        submitAuthorForm: function (e) {
            $('#qwizbook-questionnare-content').hide();
        },

        cancelAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').hide();

        },

        template: Template,

        render: function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
            return this;
        }
    });

    return QwizbookAddDetailsContent;

});