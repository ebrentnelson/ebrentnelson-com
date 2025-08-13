(function(ebn, $, undefined) {
    
    var _timer;
    
    $.jQueryRandom = 0;
    $.extend($.expr[":"], {
        random: function(a, i, m, r) {
            if (i == 0) {
                $.jQueryRandom = Math.floor(Math.random() * r.length);
            };
            return i == $.jQueryRandom;
        }
    });
    
    var startBoogying = function() {
        _timer = setInterval(function() {
            $(".content ul li").removeClass("shaking");
            $(".content ul li:random").addClass("shaking");
        }, 2000);
    };
        
    ebn.init = function() {
        
        $(".content ul li").mouseover(function(){ 
            $(".content ul li").removeClass("shaking"); 
            clearInterval(_timer); 
        }).mouseout(startBoogying);
            
        startBoogying();
    };
    
    // initialize stuff
    $(function(){
        ebn.init(); 
    });
}(window.ebn = window.ebn || {}, jQuery));