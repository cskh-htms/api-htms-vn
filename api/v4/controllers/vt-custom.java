@charset "UTF-8";
/*
writing-mode: vertical-rl; text-orientation: mixed; 
 * vt_custom css date : 06.06.2020 (dd.mm.yyy)
 * user:Văn Lực
*CSS-FONT
*CSS-LAYOUT
*CSS-HEADER
*CSS-SLIDER
*CSS-MENU
*CSS-FOOTER
*CSS-TITLE
*CSS-PAGE
*CSS-POST
*CSS-BTN
*CSS-FORM
*CSS-SINGLE
*CSS-ARCHIVE
*CSS-SHARE
*@939
*@768
*@680
Press [Ctrl + f] to search for the prefix [-] to move to the corrected location
for example: [-css-font] go to -> CSS-FONT
-------------- */

/*---------------------
CSS-FONT
--------------------*/
body .site{
    font-family: "ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","メイリオ",Meiryo,"ＭＳ Ｐゴシック",sans-serif;
    color: #2c2c2c;
    line-height: 30px;
    font-size:15px;
}
#pagewrap .font-min{
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
}
#pagewrap .font-font-min-title .module-title{
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
}



/*---------------------
end of CSS-FONT
--------------------*/



/*---------------------
CSS-LAYOUT
--------------------*/
#pagewrap {
    width: auto;
    max-width: 1600px;
    margin: 0px auto;
}
#pagewrap .pagewidth {
	width: 100%;
	max-width: 100%;
}

#pagewrap .row_inner{
    width:100%;
    max-width:1280px;
}
#pagewrap .fullwidth .row_inner{
    width:100%;
    max-width:1600px;
}



@media screen and (max-width: 939px){
    #pagewrap .pagewidth {width: 100%;max-width: 100%;}
    #pagewrap .row_inner{width: 100%;max-width: 100%; padding:0px 2%;}
  #pagewrap .full-inner  .row_inner{width: 100%;max-width: 100%; padding:0px 0%;}
}


/*---------------------
end of CSS-LAYOUT
--------------------*/



/*---------------------
CSS-HEADER
--------------------*/

#headerwrap {
    border-bottom: 7px solid #64bc72;
    padding-bottom: 6px;
}
#header.header {
}

#site-logo {
}
#site-description {
}
.header-brand-container {
    display: flex;
    max-width: 1280px;
    margin: 0px auto;
    align-items: center;
    justify-content: center;
	position:relative;
}
.rb {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
}

.rb2 {
    display: flex;
    justify-content: flex-end;
}

.sp1 {
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
    color: #64bc72;
    font-weight: bold;
    font-size: 16px;
}

.sp2 {
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
    font-weight: bold;
    font-size: 16px;
}

.rb1 {
    display: flex;
    justify-content: center;
    flex-direction: column;
}


#pagewrap .contact a {
    display: flex;
    background-color: #64bc72;
    width: 190px;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
    font-weight: bold;
    color: white;
    background-image: url(https://4th.trendmake.info/la_an_ge/wp-content/uploads/arr1.png);
    background-repeat: no-repeat;
    background-position: center right 20px;
	transition:all 0.3s;
}

#pagewrap .contact a:hover {
	text-decoration:none;
	background-color: #3da14d;
}


/*---------------------
end of CSS-HEADER
--------------------*/


/*---------------------
CSS-MENU
--------------------*/
#main-menu-container {
    padding-bottom: 20px;
    border-bottom: 1px solid #64bc72;
    padding-top: 30px;
}
#main-menu {
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    max-width: 1280px;
    margin: 0px auto;
}
#main-menu > li {
    display: flex;
    padding: 0;
    margin: 0;
    position: relative;
}
#main-menu > li >a {
    font-size: 16px;
    line-height: 30px;
    color: #2c2c2c;
    padding: 0px 40px;
    font-family: "ヒラギノ明朝 ProN W3", "HiraMinProN-W3", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
    font-weight: bold;
    border-left: 1px solid #2c2c2c;
    outline: none;
	transition:all 0.3s;
}
#main-menu > li:last-child{
	
}
#main-menu > li > a:before{
}
#main-menu > li > a:hover:before{
}
#main-menu > li > a:hover{
	text-decoration:none;
	color:#64bc72;
}
/*menu-edit*/
#main-menu > li.nav00{
   display:none;
}
#main-menu > li.nav01 > a{
 
}
#main-menu > li.nav02 > a{
 
}
#main-menu > li.nav03 > a{
 
}
#main-menu > li.nav04 > a{
 
}
#main-menu > li.nav05 > a{
 
}
#main-menu > li.nav06 > a{
 
}
#main-menu > li:last-child a{
    border-right: 1px solid #2c2c2c;
}
/*menu hover*/
#main-menu > li.nav01 > a:hover{
 
}
#main-menu > li.nav02 > a:hover{
 
}
#main-menu > li.nav03 > a:hover{
 
}
#main-menu > li.nav04 > a:hover{
 
}
#main-menu > li.nav05 > a:hover{
 
}
#main-menu > li.nav06 > a:hover{
 
}
/*menu sub*/
#main-menu .menu-item-has-children{
}
#main-menu  li .sub-menu{
    z-index:9;
    display: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100px;
    width: 150%;
    transform: translateX(25%);
}
#main-menu  li .sub-menu li{
    list-style: none;
    margin: 0;
    padding: 0;
}
#main-menu  li .sub-menu li a{
    display: block;
    text-align: center;
    padding: 10px 10px;
    color: #4d4d4d;
    font-size: 14px;
    background-color: #f7f7f7;
    line-height: 40px;  
}
#main-menu  li .sub-menu li a:hover{
 
}
/*sub hover*/
#main-menu > li:hover .sub-menu{
    display: block;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    width: 150%;
    transform: translateX(-14%);
}


/*---------------------
CSS-TITLE
--------------------*/
/*title-main*/
#pagewrap .title-main{
}
#pagewrap .title-main .module-title{
 
}
/*title-01*/
#pagewrap .title-01{
   
}
#pagewrap .title-01 .module-title{
}

/*---------------------
end of CSS-TITLE
--------------------*/


/*---------------------
CSS-PAGE
--------------------*/



/*---------------------
end of CSS-PAGE
--------------------*/


/*---------------------
CSS-POST
--------------------*/


/*---------------------
end of CSS-POST
--------------------*/

/*---------------------
CSS-BUTTOM
--------------------*/
/*btn-01*/
#pagewrap .btn-fixed.module-buttons{
    position: absolute;
    z-index: 9;
    top: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;    
}
#pagewrap .btn-fixed.module-buttons *{
    width: 100%;
    height:100%;
    opacity: 0;   
    padding: 0;
    margin: 0;
}


/*---------------------
// CSS-BUTTOM
--------------------*/


/*---------------------
end of CSS-BOTTON
--------------------*/


/*---------------------
CSS-TABLE
--------------------*/

/*table-01*/
.table-01.module table{
}
.table-01.module table tr td,
.table-01.module table tr th{
}
.table-01.module table tr th{
}
@media screen and (max-width: 768px){body #body #layout #content .table-01.module  tbody th{display:table-cell;width:auto;}}
@media screen and (max-width: 768px){body #body #layout #content .table-01.module  tbody td{display:table-cell;width:auto;}}

/*---------------------
end of CSS-TABLE
--------------------*/


/*---------------------
CSS-FOOTER
--------------------*/
#pagewrap #footer {
}
#pagewrap .copyright-container {
 
}
#pagewrap .footer-nav{
    text-align: center;
    margin-top:40px;
}
#pagewrap .footer-nav li{
    margin: 0;
}
#pagewrap .footer-nav li a{
    color: white;
    padding: 0px 15px;
    border-right: 1px solid white;
    text-decoration: underline;   
}
#pagewrap .footer-nav li a:hover{
    text-decoration: none;   
}

/*---------------------
end of CSS-FOOTER
--------------------*/




/*--------------------
 * CSS-SINGLE
 * ------------------*/
.single #layout {
}
.single .post-title {
}
.single .history-back-container {
    text-align: center;
}
.single .history-back-container a {
}
.single .history-back-container a {
    display: inline-block;
    background-color: #7DCF23;
    color: white;
    padding: 10px 30px;
}

/*--------------------
 * end of CSS-SINGLE
 * ------------------*/



/*---------------------------
 * -@939@
 * ------------------------*/

@media screen and (max-width: 939px){
   
 /*header*/    
.header-brand-container {
    height: auto;
    padding: 30px 2%;
    flex-direction: column;
    justify-content: center;
}    
.rb1 {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
}    
.rb1 p{
    margin-bottom:0;
}       
    
.rb1 .contact{
    margin-top:10px;
}    
 
/*menu -footer*/ 
#pagewrap #main-menu {
    display: flex;
    flex-direction: column;
}
#main-menu li a:before {
    display:none;
}   
#main-menu li a {
    height: auto;
    padding: 10px;
}   
/*humbeger*/   
#menu-button {
    background-color: #81d522;
    color: white;
}   
#menu-button .ham-lines span {
    background-color: white;
}   
#menu-button .ham-lines::before {
     background-color: white;
}   
#menu-button .ham-lines::after {
     background-color: white;
}       
   
/*f-con*/   
.sp-footer-icons-container {
    background-color: #3b7b24;
    padding: 8px 0px;
    bottom:0px;
}   
   
/*single*/
.single    .post-image {
    text-align: center;
}
/*menu mobile*/
#main-menu .menu-item-has-children{
    display: flex;
    flex-direction: column;
}
#pagewrap #main-menu > li {
    width: 100%;
    max-width: 60%;
    border-bottom: 0;   
    text-align:center;
    padding:0;
    margin:0;
    background: none;
        height: auto;
}    
    
#pagewrap #main-menu > li.nav02 > a {
    color: #000;
    text-indent: 0;
}   
    
#pagewrap #main-menu li a {
    width: 100%;
    max-width: 100%;
    text-align:center;
    display:block;
    padding: 8px 0px;
    margin:0;   
    color: #000 ;
    text-indent: 0;
}   
    
    
    
    
    
#pagewrap #main-menu li .sub-menu {
    width: 100%;
    transform: none;
    display: block;
    position: static;
    padding:0;
    margin:0;
}
    
#pagewrap #main-menu li .sub-menu li a {
    color:#a9a1a1;
    padding: 8px 0px;
    margin:0;
    
}  
}/*@939-*/


/*---------------------------
 * end of @939
 * ------------------------*/



/*---------------------------
 * @768@
 * ------------------------*/
@media screen and (max-width: 768px){
#pagewrap .table-wrap .tb_text_wrap{
    width: 100%;
    overflow: auto;   
}
#pagewrap .table-wrap .tb_text_wrap table{
    width: 768px;
}

}/*@768-*/
/*---------------------------
 * end of @768
 * ------------------------*/



/*---------------------------
 * @680@
 * ------------------------*/

@media screen and (max-width: 680px){

}/*@680-*/

/*---------------------------
 * end of @680
 * ------------------------*/



/*---------------------
CSS-SHARE
--------------------*/
#pagewrap .frame-block iframe, #pagewrap .frame-block object {
    max-width: 100%;
    display: block;
}


#pagewrap .fix-link-button{
    overflow:hidden;
}
#pagewrap .module  p{
    margin-bottom: 0;
}

/*tel*/
#pagewrap .tel-link a{
    pointer-events:none;
}
/*max-width*/
#pagewrap .max-width-1000{max-width:1000px; margin:0px auto !important;}
#pagewrap .max-width-1100{max-width:1100px; margin:0px auto !important;}
#pagewrap .max-width-1280{max-width:1280px; margin:0px auto !important;}
@media screen and (max-width: 768px){
#pagewrap .tel-link a{
    pointer-events:auto;
}
}/*@768-*/

/*---------------------
end of CSS-SHARE
--------------------*/