<?php
get_header();

$headerPost = get_posts(
  array(
    'post_type' => 'header_footer',
    'numberposts' => 1
  )
);
$theMeta = get_post_meta($headerPost[0]->ID);
$heroImages = get_post_meta( $headerPost[0]->ID, '_hf_hero_images', true );
$aboutUs = get_post_meta( $headerPost[0]->ID, '_hf_about_us', true );
$aboutNumbers = get_post_meta( $headerPost[0]->ID, '_hf_about_numbers', true );
$partnerLeft = get_post_meta( $headerPost[0]->ID, '_hf_partner_left', true );
$partnerRight = get_post_meta( $headerPost[0]->ID, '_hf_partner_right', true );
$ourOffices = get_post_meta( $headerPost[0]->ID, '_hf_our_offices', true );
$officesVe = get_post_meta( $headerPost[0]->ID, '_hf_offices_ve', true );
$officesUs = get_post_meta( $headerPost[0]->ID, '_hf_offices_us', true );
$officesEs = get_post_meta( $headerPost[0]->ID, '_hf_offices_es', true );
$contact = get_post_meta( $headerPost[0]->ID, '_hf_contact_form', true );
?>
            <div class="swiper-container swiper-container-hero">
              <div class="swiper-wrapper">
                <?php
                  if(isset($heroImages)) {
                    foreach ( $heroImages as $heroImage ) {
                ?>
                <div class="swiper-slide" style="background-image: url('<?php echo $heroImage["_hf_hero_image"]  ?>');">
                  <div class="slide-overlay"></div>
                  <div class="slide-text">
                    <?php
                      if(isset($heroImage["_hf_hero_text"])) {
                        echo $heroImage["_hf_hero_text"];
                      }
                    ?>
                  </div>
                </div>
                <?php }} ?>
              </div>
              <i class="fa fa-chevron-circle-left swiper-button-prev" aria-hidden="true"></i>
              <i class="fa fa-chevron-circle-right swiper-button-next" aria-hidden="true"></i>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/hero-arrow.svg" class="hero-button">
            </div>
            <section id="mre-about-us" style="background-image: url('<?php echo $aboutUs[0]['_hf_about_us_background']; ?>');" alt="About Us Background">
              <div class="overlay">
                <?php if(isset($aboutUs[0]["_hf_about_us_image"])) {?>
                  <img class="about-us-image" src="<?php echo $aboutUs[0]["_hf_about_us_image"]; ?>" alt="About Us">
                <?php } ?>
                <?php if(isset($aboutUs[0]["_hf_about_us_text"])) {?>
                <p class="about-us-text"><?php echo $aboutUs[0]["_hf_about_us_text"]; ?></p>
                <?php } ?>
                <ul class="about-us-numbers">
                  <?php foreach ($aboutNumbers as $numbers) { ?>
                    <li>
                      <?php if(isset($numbers['_hf_about_numbers_digits'])){ ?>
                        <h2 class="numbers no-margin"><?php echo $numbers['_hf_about_numbers_digits']; ?></h2>
                      <?php } ?>
                      <?php if(isset($numbers['_hf_about_numbers_text'])){ ?>
                        <h3 class="title no-margin"><?php echo $numbers['_hf_about_numbers_text']; ?></h3>
                      <?php } ?>
                    </li>
                  <?php } ?>
                </ul>
                <a href="#" class="about-us-button">Ver más</a>
              </div>
            </section>
            <section id="mre-partners" class="container-fluid no-padding">
              <div class="col-xs-12 col-md-6 partner-left" style="background-image: url('<?php if(isset($partnerLeft[0]["_hf_partner_left_background"])){ echo $partnerLeft[0]["_hf_partner_left_background"]; } ?>');">
                <a href="">
                  <div class="overlay-left">
                    <?php
                    if (isset($partnerLeft[0]["_hf_partner_left_title"])) {
                      echo $partnerLeft[0]["_hf_partner_left_title"];
                    }
                    ?>
                    <?php
                    if(isset($partnerLeft[0]["_hf_partner_left_logo"])) { ?>
                      <img src="<?php  echo $partnerLeft[0]["_hf_partner_left_logo"]; ?>">
                    <?php } ?>
                  </div>
                </a>
              </div>
              <div class="col-xs-12 col-md-6 partner-right" style="background-image: url('<?php if(isset($partnerRight[0]["_hf_partner_right_background"])){ echo $partnerRight[0]["_hf_partner_right_background"]; } ?>');">
                <a href="">
                  <div class="overlay-right">
                    <?php
                    if (isset($partnerRight[0]["_hf_partner_right_title"])) {
                      echo $partnerRight[0]["_hf_partner_right_title"];
                    }
                    ?>
                    <?php
                    if(isset($partnerRight[0]["_hf_partner_right_logo"])) { ?>
                      <img src="<?php  echo $partnerRight[0]["_hf_partner_right_logo"]; ?>">
                    <?php } ?>
                  </div>
                </a>
              </div>
            </section>
            <section id="mre-offices" style="background-image: url('<?php if(isset($ourOffices[0]['_hf_our_offices_background'])) { echo $ourOffices[0]['_hf_our_offices_background']; } ?>');">
              <div class="swiper-container swiper-container-flags">
                <?php
                  if(isset($ourOffices[0]['_hf_our_offices_text'])) {
                    echo $ourOffices[0]['_hf_our_offices_text'];
                  }
                ?>
                <div class="flags-indicators">
                  <img id="flag-image-1" class="flag-image flag-image-opacity" data-pagination="1" src="<?php echo get_template_directory_uri(); ?>/assets/ven_flag.svg" />
                  <img id="flag-image-2" class="flag-image" data-pagination="2" src="<?php echo get_template_directory_uri(); ?>/assets/usa_flag.svg" />
                  <img id="flag-image-3" class="flag-image flag-image-opacity" data-pagination="3" src="<?php echo get_template_directory_uri(); ?>/assets/spain_flag.svg" />
                </div>
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <?php
                    if(isset($officesVe)) {
                      foreach ($officesVe as $office) {
                    ?>
                    <div class="office-detail">
                      <?php if(isset($office['_hf_offices_ve_city'])) { ?>
                      <h5>
                        <span><?php echo $office['_hf_offices_ve_city']; ?>:</span>
                      </h5>
                      <?php } ?>
                      <?php if(isset($office['_hf_offices_ve_address'])) { ?>
                      <h5><?php echo $office['_hf_offices_ve_address']; ?></h5>
                      <?php } ?>
                      <h5>Venezuela</h5>
                      <?php if(isset($office['_hf_offices_ve_phone'])) { ?>
                      <h5>Teléfonos: <?php echo $office['_hf_offices_ve_phone'];?></h5>
                      <?php } ?>
                    </div>
                    <?php }} ?>
                  </div>
                  <div class="swiper-slide">
                    <?php
                      if(isset($officesUs)) {
                        foreach ($officesUs as $office) {
                     ?>
                      <div class="office-detail">
                        <?php if(isset($office['_hf_offices_us_city'])) { ?>
                          <h5>
                            <span><?php echo $office['_hf_offices_us_city']; ?>:</span>
                          </h5>
                        <?php } ?>
                        <?php if(isset($office['_hf_offices_us_address'])) { ?>
                          <h5><?php echo $office['_hf_offices_us_address']; ?></h5>
                        <?php } ?>
                        <h5>USA</h5>
                        <?php if(isset($office['_hf_offices_us_phone'])) { ?>
                          <h5>Teléfonos: <?php echo $office['_hf_offices_us_phone'];?></h5>
                        <?php } ?>
                      </div>
                    <?php }} ?>
                  </div>
                  <div class="swiper-slide">
                    <?php
                      if(isset($officesEs)) {
                        foreach ($officesEs as $office) {
                    ?>
                      <div class="office-detail">
                        <?php if(isset($office['_hf_offices_es_city'])) { ?>
                          <h5>
                            <span><?php echo $office['_hf_offices_es_city']; ?>:</span>
                          </h5>
                        <?php } ?>
                        <?php if(isset($office['_hf_offices_es_address'])) { ?>
                          <h5><?php echo $office['_hf_offices_es_address']; ?></h5>
                        <?php } ?>
                        <h5>España</h5>
                        <?php if(isset($office['_hf_offices_es_phone'])) { ?>
                          <h5>Teléfonos: <?php echo $office['_hf_offices_es_phone'];?></h5>
                        <?php } ?>
                      </div>
                    <?php }} ?>
                  </div>
                </div>
              </div>
            </section>
            <section id="contact-us" class="col-xs-12 al-contact-div no-padding" style="background-image: url('<?php if(isset($contact[0]["_hf_contact_background"])) { echo $contact[0]["_hf_contact_background"]; }?>')">
              <div class="overlay"></div>
              <div class="container-mre center-block">
                <div class="row">
                  <p class="col-xs-12 text-center al-contact-text"><?php if(isset($contact[0]['_hf_contact_first'])) { echo $contact[0]['_hf_contact_first']; }?></p>
                  <p class="col-xs-12 text-center al-contact-text-bold"><?php if(isset($contact[0]['_hf_contact_second'])) { echo $contact[0]['_hf_contact_second']; }?></p>
                  <div class="col-xs-12 col-md-4 no-padding">
                    <div class="al-phone-box text-center center-block">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/smartphone.png" alt="Llamanos Ala19">
                      <p><?php if(isset($contact[0]['_hf_contact_text'])) { echo $contact[0]['_hf_contact_text']; }?></p>
                      <?php if(isset($contact[0]['_hf_contact_phone'])) { ?>
                        <a href="tel:<?php echo str_replace(array(".", " ", "-", "/"), "", $contact[0]['_hf_contact_phone']); ?>" class="al-phone-num"><?php echo $contact[0]['_hf_contact_phone']; ?></a>
                      <?php } ?>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-8 al-contact-form-div no-padding">
                    <?php echo do_shortcode( '[contact-form-7 id="4" title="Home - Contact form"]' ); ?>
                  </div>
                </div>
              </div>
            </section>
<?php get_footer(); ?>