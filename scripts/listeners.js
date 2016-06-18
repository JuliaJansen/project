/* listeners.js
 *
 * Julia Jansen
 * Programmeerproject
 * Listeners defined
 */

function listeners() {
	$("#energy").on('click', function(e) {
		barchart(country, "energy");
	});
	$("#emission").on('click', function(e) {
		barchart(country, "emission");
	});
	$("#waste").on('click', function(e) {
		barchart(country, "waste");
	});
}
	