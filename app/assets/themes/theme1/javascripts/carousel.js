//= require theme1/javascripts/jquery.jcarousel.min.js
/* ---------------------------------------------------------------------- */
/*	Projects Carousel & Post Carousel
/* ---------------------------------------------------------------------- */
// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// When DOM is fully loaded
jQuery(document).ready(function($) {

	(function() {

			var $carousel = $('.jcarousel');

			if( $carousel.length ) {

				var scrollCount;

				function getWindowWidth() {

					if( $(window).width() < 480 ) {
						scrollCount = 1;
					} else if( $(window).width() < 768 ) {
						scrollCount = 2;
					} else if( $(window).width() < 960 ) {
						scrollCount = 3;
					} else {
						scrollCount = 4;
					}

				}

				function initCarousel( carousels ) {

					carousels.each(function() {

						var $this  = $(this);

						$this.jcarousel({
							animation           : 600,
							easing              : 'easeOutCubic',
							scroll              : scrollCount,
							itemVisibleInCallback : function() {
								onBeforeAnimation : resetPosition( $this );
								onAfterAnimation : resetPosition( $this );
							},
							auto                : ( $this.data('auto') ? parseInt( $this.data('auto') ) : 0 ),
							wrap                : ( $this.data('auto') ? 'both' : null )
						});

					});

				}

				function adjustCarousel() {
					
					$carousel.each(function() {

						var $this    = $(this),
							$lis     = $this.children('li')
							newWidth = $lis.length * $lis.first().outerWidth( true ) + 100;

						getWindowWidth();

						// Resize only if width has changed
						if( $this.width() !== newWidth ) {
console.log(scrollCount)
							$this.css('width', newWidth )
								 .data('resize','true');

							initCarousel( $this );

							$this.jcarousel('scroll', 1);

							var timer = window.setTimeout( function() {
								window.clearTimeout( timer );
								$this.data('resize', null);
							}, 600 );

						}

					});

				}

				function resetPosition( elem, resizeEvent ) {
					if( elem.data('resize') )
						elem.css('left', '0');
				}

				getWindowWidth();

				initCarousel( $carousel );

				// Detect swipe gestures support
				if( Modernizr.touch ) {

					function swipeFunc( e, dir ) {

						var $carousel = $(e.currentTarget);

						if( dir === 'left' )
							$carousel.parent('.jcarousel-clip').siblings('.jcarousel-next').trigger('click');

						if( dir === 'right' )
							$carousel.parent('.jcarousel-clip').siblings('.jcarousel-prev').trigger('click');

					}

					$carousel.swipe({
						swipeLeft       : swipeFunc,
						swipeRight      : swipeFunc,
						allowPageScroll : 'auto'
					});

				}

				// Window resize
				$(window).on('resize', function() {

					var timer = window.setTimeout( function() {
						window.clearTimeout( timer );
						adjustCarousel();
					}, 30 );

				});

			}

		})();


		/* end Projects Carousel & Post Carousel */
	
});

