<?php
    /**
     *  Created by PhpStorm.
     *  User: mtoledo
     *  Date: 3/8/17
     *  Time: 8:19 AM
     **/

    // Loads css or js files
	add_action('wp_enqueue_scripts', 'mre_enqueue_scripts');

    // Register custom navigation walker
    require_once('wp_bootstrap_navwalker.php');

    register_nav_menus(
    	array(
	        'primary'    => __( 'Primary Menu', 'mre' ),
	        'extra-menu' => __( 'Extra Menu', 'mre'  )
        )
    );

    add_theme_support( 'menus' );

	function mre_enqueue_scripts() {
		wp_enqueue_style( 'style', get_template_directory_uri() . 'style.css', array(), '1' );
		//wp_enqueue_script( 'script', get_template_directory_uri() . '/js/basic.css', array(), '1' );
		wp_enqueue_script( 'ajax-blog_cats', get_template_directory_uri() . '/js/ajax-blog-categories.js', array(), '1' );
		global $wp_query;
		wp_localize_script( 'ajax-blog_cats', 'ajaxblog', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'query_vars' => json_encode( $wp_query->query )
		));
	}

	// Directories that contain post-types
	$postTypeDir = array (
		__DIR__.'/includes/post-types/about-us/',
		__DIR__.'/includes/post-types/broker/',
		__DIR__.'/includes/post-types/developer/',
		__DIR__.'/includes/post-types/header-footer/',
    __DIR__.'/includes/post-types/services/'
	);

	// File names inside post-types dirs
	$files = array (
		'meta-boxes.php',
		'post-type.php'
	);

	foreach ($postTypeDir as $directory) {
		foreach ($files as $file) {
			if ( file_exists( $directory . $file ) ) {
				require_once( $directory . $file );
			}
		}
	}

/**
* ┌───────────────────┐
* │ Custom Post Types │
* └───────────────────┘
*/

	add_action( 'init', 'call_create_post_types' );

	function call_create_post_types() {

		// Post Type for About Us
		create_post_type_about_us();
		// Post Type for Broker
		create_post_type_broker();
		// Post Type for Developer
		create_post_type_developer();
		// Post Type for Header and Footer
		create_post_type_header_footer();
		// Post Type for Services
		create_post_type_services();
	}

	/* Remove text area field from header and footer */
	function remove_page_editor() {
		remove_post_type_support( 'header_footer', 'editor' );
	}
	add_action( 'init', 'remove_page_editor' );


/**
 * ┌───────────────────┐
 * │ Custom Meta Boxes │
 * └───────────────────┘
 */

	add_action( 'cmb2_admin_init', 'call_metaboxes' );

	function call_metaboxes() {

		// Metaboxes for About Us
		about_us_metaboxes();
		// Metaboxes for Broker
		broker_metaboxes();
		// Metaboxes for Developer
		developer_metaboxes();
		// Metaboxes for Header and Footer
		header_footer_metaboxes();
		// Metaboxes for Services
		services_metaboxes();
	}

  function custom_form_validation_filter($result, $tag) {
    $name = $tag['name'];
    $value = $_POST[$name];
    if($name == 'your-name') {
      if (!preg_match('/[a-zA-Z]/', $value)){
        $result->invalidate( $tag, "You can only use characters." );
      }
    }
    if($name == 'your-email') {
      if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
        $result->invalidate( $tag, "Invalid email format." );
      }
    }
    return $result;
  }
  add_filter('wpcf7_validate_text','custom_form_validation_filter', 10, 2);
  add_filter('wpcf7_validate_text*', 'custom_form_validation_filter', 10, 2);
  add_filter('wpcf7_validate_email', 'custom_form_validation_filter', 10, 2);

  //Featured images theme support
  add_theme_support( 'post-thumbnails' );

// Unset URL from comment form
function crunchify_move_comment_form_below( $fields ) {
	$comment_field = $fields['comment'];
	unset( $fields['comment'] );
	$fields['comment'] = $comment_field;
	return $fields;
}
add_filter( 'comment_form_fields', 'crunchify_move_comment_form_below' );

// Add placeholder for Name and Email
function modify_comment_form_fields($fields){
	$commenter = wp_get_current_commenter();
	$fields['author'] = '<div class="form-group">' .
		'<input id="author" name="author" type="text" class="form-control" placeholder="* Nombre y Apellido" value=""/>'; //' . esc_attr( $commenter['comment_author'] ) . '
	$fields['email'] =
		'<input id="email" name="email" type="email" class="form-control" placeholder="* Email" value=""/>'; //' . esc_attr(  $commenter['comment_author_email'] ) . '
	$fields['url'] = '';

	return $fields;
}
add_filter('comment_form_default_fields','modify_comment_form_fields');

function wpbeginner_comment_text($arg) {

	$arg['comment_notes_before'] = "";

	return $arg;
}

add_filter('comment_form_defaults', 'wpbeginner_comment_text');

add_filter('show_admin_bar', '__return_false');


//SVG Hook
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

//Ajax blog categories

add_action( 'wp_ajax_nopriv_ajax_blog_cat', 'trv_ajax_blog_cats' );
add_action( 'wp_ajax_ajax_blog_cat', 'trv_ajax_blog_cats' );

function trv_ajax_blog_cats() {
	$query_vars = json_decode( stripslashes( $_POST['query_vars'] ), true );
	$cat = $_POST['category'];
	$query_vars['post_type'] = 'post';
	$query_vars['post_status'] = 'publish';
	if( $cat != "all"):
		$query_vars['tax_query'] = array(
			array(
				'taxonomy' => 'category',
				'field' => 'slug',
				'terms' => $cat,
			)
		);
	endif;

	$posts = new WP_Query( $query_vars );

	if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post();

		$link = get_permalink($posts->post->ID);
		$taxonomy = get_post_taxonomies($posts->post);
		$term = get_the_terms($posts->post->ID, $taxonomy[0]);
		$author = get_user_by('ID', $posts->post->post_author);
		$date = strtotime($posts->post->post_date);
		$url = "background-image: url('".get_the_post_thumbnail_url($posts->post->ID)."')";
	echo '<div class="col-xs-12 col-sm-6 blog-post">
			<a href="'.$link.'">
			<div class="blog-image" style="'.$url.'">
									<span class="blog-category">'.$term[0]->name.'</span>
			</div>
			<div class="blog-text">
				<a href="'.$link.'"><h1 class="blog-text-title">'.$posts->post->post_title.'</h1></a>
				<h2 class="blog-text-author">Por: '.$author->display_name.'<span
						class="blog-text-date">'.date('d F, Y', $date).'</span><span
						class="blog-text-comments hidden-xs hidden-sm">- '.$posts->post->comment_count.'
						Comments</span></h2>
				<p class="blog-text-summary">'.$posts->post->post_excerpt.'</p>
			</div>
		</a>
	</div>';

	endwhile;
	endif;
	//wp_send_json( $posts );
	//echo get_bloginfo( 'title' );

	die();
}
?>