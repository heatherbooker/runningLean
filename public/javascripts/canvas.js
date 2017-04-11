window.onload = function() {

  let tooltipInstance = new Tooltip({
    target: document.querySelector('.tooltip-target'),
    content: "My awesome <b>content</b>.",
    classes: 'tooltip-tether-arrows',
    position: 'top left'
  })
}