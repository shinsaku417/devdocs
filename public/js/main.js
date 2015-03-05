$(document).ready(function() {

  var App = require('./components/App');

  React.render(
    <App />,
    document.body
  );

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
  
});
