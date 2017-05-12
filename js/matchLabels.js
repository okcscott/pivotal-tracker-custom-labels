chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(handleMutationEvents);
      });

      // configuration of the observer:
      var config = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      };

      observer.observe(document, config);

      var handleMutationEvents = function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, styleLabelsInNode);
        styleLabelsInNode(mutation.target);
      }

      var styleLabelsInNode = function styleLabelsInNode(node) {
        if (nodeIsElement(node)) {
          styleLabels(findLabelsInNode(node));
        }
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.querySelectorAll !== 'undefined');
      }

      var findLabelsInNode = function findLabelsInNode(node) {
        return node.querySelectorAll('a.label');
      }

      var styleLabels = function styleLabels(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          if (label.textContent.match("planner")) {
            label.classList.add("planner-label");
          } else if (label.textContent.blocked("blocked")) {
            label.classList.add("blocked-label");
          } else if (label.textContent.match("needs")) {
            label.classList.add("blocked-label");
          } else if (label.textContent.match("investigate")) {
            label.classList.add("attention-label");
          } else if (label.textContent.match("live")) {
            label.classList.add("live-label");
          }
        });
      }
    }
  }, 10);
});
