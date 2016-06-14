/* listeners.js
 *
 * Julia Jansen
 * Programmeerproject
 * Listeners defined
 */

// listeners for bargraph buttonclicks 
var loggen = d3.selectAll(".bargraphbutton").on("click", console.log("value", value));
console.log("value ", loggen);