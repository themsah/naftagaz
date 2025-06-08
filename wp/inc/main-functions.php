<?php
// add style and sctipt files to theme 
function naftagaz_style_script()
{

    // enqueue styles 
    wp_enqueue_style('main-style', get_template_directory_uri() . 'assets/css/main-style.css', array(), '1.0.0', 'all');

    // enqueue scripts 
    wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'naftagaz_style_script');
