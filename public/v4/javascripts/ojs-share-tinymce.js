


/*
----------------------------------------------------------------------
[loadTinyMCE]


----------------------------------------------------------------------------
*/




$(document).ready(function($){	

//@
//@
//@
//@ tat thong bao tiniMCE
$(window).on('load', function () {
  $('.tox-notifications-container').css('display','none');	  
});	



ojs_share_tinymce = {	


	//@
	//@
	//@
	//@ [loadTinyMCE]
	loadTinyMCE: function(textareaID,user_id){
		tinymce.init({
			selector: '#' + textareaID,
			menubar: false,
			forced_root_block : false,
			relative_urls : false,
			remove_linebreaks : false,
			force_br_newlines : true,
			force_p_newlines : false,
			remove_script_host : false,
			convert_urls : true,
			plugins: "link lists checklist table advtable image imagetools",
			toolbar: 'imageoptions | undo redo | fontsizeselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | numlist bullist | table | link image',
			fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px',
			content_style: 'body{font-family: Arial;font-size:14px;}',
			imagetools_cors_hosts: ['appdala.com'],
			file_picker_types: 'image',
			images_upload_handler: function tinyFile(_blobInfo, _success, _failure, _progress){
				var formData = new FormData();
				formData.append('image',_blobInfo.blob());
				$.ajax({
					type : "POST",	  
					url : ojs_loader.host + "/upload-wp/" + user_id,
					processData: false,
					contentType: false,
					data : formData,
					dataType: 'json',
					error: function (request, status, error) {
						_failure(error);
					},
					success : function(img) {
						_success(img.datas[1]);
					}			 
				});
			}
		});	
	},	
	
	
	
	
	
	
	
}//enf of object	
});











