/*
*
* Utils 
* Collection of utility functions that can be used sitewide
*
*/

exports.merge = function(a, b) {
  for (var key in b) a[key] = b[key];
  return a;
};