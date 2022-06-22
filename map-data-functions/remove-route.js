let routeRemoveButton = document.querySelector('#remove-route')
routeRemoveButton.addEventListener('click', function() {
    
    controller.spliceWaypoints(0,2)
})