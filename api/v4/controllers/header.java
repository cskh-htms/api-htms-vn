<?php
/**
 * ヘッダーテンプレートです。
 * Google Fonts, Adobe Fonts, Google Tag Magagerタグを埋め込む場所を恣意的に空けてます。
 * 
 * @package WordPress
 * @subpackage ManaSys
 * @author Trendmake
 * 
 * スマホメニューについて
 * Themifyでは、id="menu-icon"のクリックをjQueryで拾い、id="main-navをfadeIn, Outしています。
 * Themifyの干渉をなくすため、menu-iconをmenu-btn、main-navをmain-menuとリネームしました。
 * そしてcustom_bodys_end.jsにてjQueryにて表示非表示を実装しています。
 * これにより、ThemifyのレスポンシブデザインのMobile Menuが効かなくなりました。
 * 
 * Themify標準のSocialWidgetエリアを出力しないよう削除
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>



<?php
/** Themify Default Variables
 *  @var object */
global $themify; ?>

<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- wp_header -->
<?php wp_head(); ?>



</head>

<body <?php body_class(); ?>>



<?php themify_body_start(); // hook ?>

<?php 
/* ローディングスクリーンを追加する
get_template_part( 'trendmake/loadingScreen' );
*/
?>

<div id="pagewrap" class="hfeed site">

	<div id="headerwrap" class="headerwrap">

		<?php themify_header_before(); // hook ?>
		<header id="header" class="header pagewidth" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
			<?php themify_header_start(); // hook ?>


			<?php
			/* Site Logo and Description
			 * サイトロゴとDescription
			 */
			?>
        	<div class="header-brand-container">
            	<div class="lb">
   				 <?php echo themify_logo_image('site_logo'); ?>
   				 <?php if ( $site_desc = get_bloginfo( 'description' ) ) : ?>
   				 <?php global $themify_customizer; ?>
   				 <div id="site-description" class="site-description"><?php echo class_exists( 'Themify_Customizer' ) ? $themify_customizer->site_description( $site_desc ) : $site_desc; ?></div>
   				 <?php endif; ?>                      	 
           	</div><!-- //lb -->
          	 
            	<div class="rb">
                	<div class="rb1">
                  	 	<div class="time1">
							<span class="sp1">【Open】</span>
							<span class="sp2">8:00 ～ 20:00</span>
						</div>
                  	 	<div class="time2">
							<span class="sp1">【Close】</span>
							<span class="sp2">水曜日（臨時休業あり）</span>
						</div>						
                	</div>
                	<div class="rb2">
     	 				<div class="contact"><a href="<?php echo home_url(); ?>/?page_id=123">WEB予約</a></div>  
                	</div>  					 
            	</div>    
   			 <!-- //rb -->
        	</div><!-- //header-brand-container --> 


			<?php
			/* Header Main Nav Container
			 * ヘッダーナビ
			 */
			?>
			<nav id="main-menu-container" class="main-menu-container" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
				<?php
				// Themifyサーチフォームがオンなら、検索フォームを表示する
				if(!themify_check('setting-exclude_search_form')) {
					get_search_form();
				}
				// メインナビを呼び出す
				wp_nav_menu( array(
					'theme_location' => 'main-nav',
					'fallback_cb'    => 'themify_default_main_nav',
					'container'      => false,
					'menu_id'        => 'main-menu',
					'menu_class'     => 'main-menu'
				));
				?>
			</nav>
			<?php
			/* Smartphone menu button
			 * スマホ時のメニューボタン
			 */
			?>
				<div id="menu-button" class="menu-button">
				<div class="ham-lines">
					<span></span>
				</div>
				<div class="ham-text">MENU</div>
				</div>
		

			<?php themify_header_end(); // hook ?>
		</header>
        <?php themify_header_after(); // hook ?>
		<!-- /#header -->

	</div>
	<!-- /#headerwrap -->

	<div id="body" class="clearfix bodywrap">
    <?php themify_layout_before(); //hook ?>
