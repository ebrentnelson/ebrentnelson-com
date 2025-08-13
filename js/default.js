(function(ebn, $, undefined) {
    // initialize stuff
    $(function(){
        $('.year').text((new Date()).getFullYear()); 
    });
}(window.ebn = window.ebn || {}, jQuery));