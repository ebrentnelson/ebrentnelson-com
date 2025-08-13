(function(ebn, undefined) {

  let _timer;

  const getRandomElement = function(elements) {
    if (elements.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  };

  const startBoogying = function() {
    _timer = setInterval(function() {
      const listItems = document.querySelectorAll('main ul li');

      // Remove shaking class from all items
      listItems.forEach(function(item) {
        item.classList.remove('shaking');
      });

      // Add shaking class to random item
      const randomItem = getRandomElement(listItems);
      if (randomItem) {
        randomItem.classList.add('shaking');
      }
    }, 2000);
  };

  ebn.init = function() {
    const listItems = document.querySelectorAll('main ul li');

    listItems.forEach(function(item) {
      item.addEventListener('mouseover', function() {
        listItems.forEach(function(li) {
          li.classList.remove('shaking');
        });
        clearInterval(_timer);
      });

      item.addEventListener('mouseout', startBoogying);
    });

    startBoogying();
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    ebn.init();
  });

}(window.ebn = window.ebn || {}));
