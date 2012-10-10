//= require theme1/javascripts/jquery.quicksand.js
/* ---------------------------------------------------------------------- */
/*	Categories filter
/* ---------------------------------------------------------------------- */

// When DOM is fully loaded
jQuery(document).ready(function($) {

	(function() {



		/*-----------------------------------------------------------------------------------*/
		/*	Portfolio Page Scripts
		/*===================================================================================*/

		// get the action filter option item on page load
		var $filterType = jQuery('#parent-categories-filter li.active').data('categories');

		// get and assign the ourHolder element to the
		// $holder varible for use later
		var $holder = jQuery('#grid-galleries');

		// clone all items within the pre-assigned $holder element
		var $data = $holder.clone();
		
		// remove the IE6/7/8 SUPPORT for .grids 
		//$data.find('li').css({clear:'none'});

		// attempt to call Quicksand when a filter option
		// item is clicked
		jQuery('#parent-categories-filter li a').click(function(e) {

			// reset the active class on all the buttons
			jQuery('#parent-categories-filter li').removeClass('active');

			// assign the class of the clicked filter option
			// element to our $filterType variable
			var $filterType = jQuery(this).parent().data('categories');
			jQuery(this).parent().addClass('active');
			if ($filterType == '*') {
				// assign all li items to the $filteredData var when
				// the 'All' filter option is clicked
				var $filteredData = $data.find('li');
			}
			else {
				// find all li elements that have our required $filterType
				// values for the data-type element
				var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
			}

			// call quicksand and assign transition parameters
			if (jQuery().quicksand) {
				console.log("$filterType " + $filterType)
				console.log("$filteredData " + $filteredData)
				$holder.quicksand($filteredData, {
					duration: 400, adjustHeight: 'auto'
				});
				return false;

			}	

		});

		})();


		/* end Categories filter */
	
});
