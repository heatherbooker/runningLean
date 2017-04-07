window.onload = function() {

  const canvasId = location.pathname.split('/')[2];
  const saveBtn = document.querySelector('#rl-saveChanges');
  saveBtn.onclick = sendUpdate;
  window.onkeyup = (e) => { e.key === 'Enter' ? sendUpdate() : null };


  function getData () {
    const data = {
      title: document.querySelector('input[name="title"]').value,
      problem: document.querySelector('input[name="problem"]').value,
      solution: document.querySelector('input[name="solution"]').value,
      customersegments: document.querySelector('input[name="customersegments"]').value,
      uniquevalueproposition: document.querySelector('input[name="uniquevalueproposition"]').value,
      channels: document.querySelector('input[name="channels"]').value,
      coststructure: document.querySelector('input[name="coststructure"]').value,
      keymetrics: document.querySelector('input[name="keymetrics"]').value,
      unfairadvantage: document.querySelector('input[name="unfairadvantage"]').value,
      revenuestreams: document.querySelector('input[name="revenuestreams"]').value,
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
        alert("cool we'll think about " + data.title + '.');
      }
    });
  };

};
