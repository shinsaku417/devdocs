$(document).ready(function() {

  var App = require('./components/App');

  React.render(
    <App />,
    document.body
  );

  var recalculateHeight = function(obj) {
    var wrapHeight = $('.resources').innerHeight();
    var groupHeight = $('.panel-heading').first().outerHeight();
    var cnt = $('.panel-heading').length;
    var freeSpace = wrapHeight - cnt * (groupHeight + 5);        
    obj.attr('style', 'height: ' + freeSpace + 'px !important')
  };
  recalculateHeight($('.in'));
  $('.collapse').on('shown.bs.collapse', function() {
    console.log('shown');
    recalculateHeight($(this));
  });
  $('.collapse').on('hide.bs.collapse', function() {
    $(this).attr('style', '');
  });
  
});
