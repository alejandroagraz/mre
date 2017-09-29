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
  wp_enqueue_script( 'script', get_template_directory_uri() . '/js/basic.css', array(), '1' );
}

// Directories that contain post-types
$postTypeDir = array (
  __DIR__.'/includes/post-types/broker/',
  __DIR__.'/includes/post-types/header-footer/'
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
  // Post Type for Broker
  create_post_type_broker();
  // Post Type for General Settings
  create_post_type_header_footer();
}

/* Remove text area field from header and footer */
function remove_page_editor() {
  remove_post_type_support( 'header_footer', 'editor' );
  remove_post_type_support( 'broker', 'editor' );
}
add_action( 'init', 'remove_page_editor' );


/**
 * ┌───────────────────┐
 * │ Custom Meta Boxes │
 * └───────────────────┘
 */

add_action( 'cmb2_admin_init', 'call_metaboxes' );

function call_metaboxes() {
  // Metaboxes for Broker
  broker_metaboxes();
  // Metaboxes for General Settings
  header_footer_metaboxes();
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