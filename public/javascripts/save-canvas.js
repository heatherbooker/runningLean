window.onload = function() {

  const canvasId = location.pathname.split('/')[2];
  window.onkeyup = (e) => { e.key === 'Enter' ? sendUpdate() : null };


  function getData () {
    const data = {
      //title: document.querySelector('textarea[name="title"]').value,
      problem: document.querySelector('textarea[name="problem"]').value,
      solution: document.querySelector('textarea[name="solution"]').value,
      customersegments: document.querySelector('textarea[name="customersegments"]').value,
      uniquevalueproposition: document.querySelector('textarea[name="uniquevalueproposition"]').value,
      //channels: document.querySelector('textarea[name="channels"]').value,
      coststructure: document.querySelector('textarea[name="coststructure"]').value,
      //keymetrics: document.querySelector('textarea[name="keymetrics"]').value,
      unfairadvantage: document.querySelector('textarea[name="unfairadvantage"]').value,
      revenuestreams: document.querySelector('textarea[name="revenuestreams"]').value,
    };
    return data;
  }
  

  function sendUpdate () {
    const data = getData();

    const url = `/canvas/${canvasId}`;
    const options = {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options).then(didUpdate => {
      if (didUpdate) {
        console.log('Save successful.');
      }
    });
  };

};
