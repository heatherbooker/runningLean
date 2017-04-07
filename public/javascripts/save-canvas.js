window.onload = function() {

  const canvasId = location.pathname.split('/')[2];

  function getData() {
    const data = {
      title: document.querySelector('input[name="title"]').value,
      problem: document.querySelector('input[name="problem"]').value,
      solution: document.querySelector('input[name="solution"]').value,
      customerSegments: document.querySelector('input[name="customersegments"]').value,
      uniqueValueProp: document.querySelector('input[name="uniquevalueproposition"]').value,
      channels: document.querySelector('input[name="channels"]').value,
      costStructure: document.querySelector('input[name="coststructure"]').value,
      keyMetrics: document.querySelector('input[name="keymetrics"]').value,
      unfairAdvantage: document.querySelector('input[name="unfairadvantage"]').value,
      revenueStreams: document.querySelector('input[name="revenuestreams"]').value,
    };
    return data;
  }
  
  const saveBtn = document.querySelector('#rl-saveChanges');
  saveBtn.onclick = function() {
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
      } else {
        alert("nah, nope. nuh uh.");
      }
    });
  };

};
