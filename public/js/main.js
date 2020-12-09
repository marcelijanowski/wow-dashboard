(function () {
  let token = '';
  let jobId = '';
  const getToken = function () {
    try {
      return $.ajax({
        type: 'POST',
        url: '/api/auth/token'
      }, (data) => data);
    } catch (error) {
      console.log(error);
    }
  };
  const generateJob = function (token) {
    try {
      return  $.ajax({
        type: 'POST',
        url: '/api/report/job',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }, (data) => data);
    } catch (error) {
      console.log(error)
    }
  }
  const getReport = function (token, jobId) {
    try {
      return $.ajax({
        method: 'GET',
        url: `/api/report/job/${jobId}`,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  const formatData = (data) => data.reduce((acc, item) => {
    if (!acc[item.status_code]) {
      acc[item.status_code] = [];
    }
    acc[item.status_code].push({ name: item.host.name, alert: item.total_alerts });
    return acc;
  }, {});
  const generateChart = (data) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Summary of error response code for services providers',
          backgroundColor: 'rgb(255, 23, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: Object.values(data).map(data => data.length),
        }]
      },

      // Configuration options go here
      options: {}
    });
  };
  getToken().then(data  => {
    token = data.access_token;
    generateJob(token).then(data => {
      jobId = data.job_id
      setTimeout(() => getReport(token, jobId).then(data => {
        const groupData = formatData(data);
        generateChart(groupData);
      }), 2000)
    })
  });
})();
