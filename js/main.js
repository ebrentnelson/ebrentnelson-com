(function(ebn, undefined) {
    document.addEventListener('DOMContentLoaded', function() {
        var yearElements = document.querySelectorAll('.year');
        var currentYear = new Date().getFullYear();
        
        yearElements.forEach(function(element) {
            element.textContent = currentYear;
        });
    });
}(window.ebn = window.ebn || {}));
