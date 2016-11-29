var filter = function(){
  var scope = angular.element(document.getElementById('productsCtrl')).scope();
    scope.$apply(function () {
      scope.filterUnderAmount(20);
    });
}

$('document').ready(function(){
  //vertical alignment for switch
  $('.pull-down-switch').each(function() {
    var $this=$(this);
    $this.css('margin-top', $this.parent().height()-$this.height()-15)
  });
  //vert. align. for buttons
  $('.pull-down-buttons').each(function() {
    var $this=$(this);
    $this.css('margin-top', $this.parent().height()-$this.height()-3)
  });
  $("[name='filter-checkbox']").bootstrapSwitch({offText:'Show all under $20', onText:'Show all', handleWidth:'150px', onColor:'default', offColor:'info', onSwitchChange:filter});
});