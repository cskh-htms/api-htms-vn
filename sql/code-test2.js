<!DOCTYPE html>
<html>
<head>
	<title><%= title %></title>
	<link rel='stylesheet' href='/<%= js_css_version %>/stylesheets/style.css' />
	<link rel="stylesheet" href="/<%= js_css_version %>/stylesheets/loadding-message.css" />	
	
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="/<%= js_css_version %>/uploads/files/tinymce.min.js"></script>
	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">	
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>	
	
	<script src="/<%= js_css_version %>/javascripts/loadding-message-callback_speciality.js"></script>
	<script src="/<%= js_css_version %>/javascripts/loadding-message.js"></script>
	<script src="/<%= js_css_version %>/javascripts/loader.js"></script>	
	<% include ./function-share %>	
	<style>
    .mce-notification {display: none !important;}
	.tox-notifications-container{display: none !important;}
	</style>
</head>

<body>




<%
//menu-taget
if (typeof menu_taget == 'string' && menu_taget ) { 
	menu_taget = menu_taget;
} else{ 
	menu_taget = "abc";
}

%>