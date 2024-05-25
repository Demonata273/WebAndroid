$(function () {
  var doughnutPieData = {
    datasets: [{
      data: [], // Khởi tạo mảng rỗng để chứa số liệu
      backgroundColor: [
        'rgba(255, 0, 0, 0.5)',   // Red
        'rgba(255, 165, 0, 0.5)', // Orange
        'rgba(255, 255, 0, 0.5)', // Yellow
        'rgba(0, 128, 0, 0.5)',   // Green
        'rgba(0, 0, 255, 0.5)',   // Blue
        'rgba(75, 0, 130, 0.5)',  // Indigo
        'rgba(128, 0, 128, 0.5)', // Purple
        'rgba(255, 192, 203, 0.5)', // Pink
        'rgba(255, 105, 180, 0.5)', // Hot Pink
        'rgba(255, 69, 0, 0.5)',   // Red-Orange
        'rgba(255, 140, 0, 0.5)',  // Dark Orange
        'rgba(255, 215, 0, 0.5)',  // Gold
        'rgba(154, 205, 50, 0.5)', // Yellow Green
        'rgba(0, 255, 255, 0.5)',  // Aqua
        'rgba(0, 0, 128, 0.5)',    // Navy
        'rgba(128, 0, 0, 0.5)',    // Maroon
        'rgba(128, 0, 128, 0.5)',  // Purple
        'rgba(255, 20, 147, 0.5)', // Deep Pink
        'rgba(0, 139, 139, 0.5)',  // Dark Cyan
      ],
      borderColor: [
        'rgba(255, 0, 0, 1)',     // Red
        'rgba(255, 165, 0, 1)',   // Orange
        'rgba(255, 255, 0, 1)',   // Yellow
        'rgba(0, 128, 0, 1)',     // Green
        'rgba(0, 0, 255, 1)',     // Blue
        'rgba(75, 0, 130, 1)',    // Indigo
        'rgba(128, 0, 128, 1)',   // Purple
        'rgba(255, 192, 203, 1)', // Pink
        'rgba(255, 105, 180, 1)', // Hot Pink
        'rgba(255, 69, 0, 1)',    // Red-Orange
        'rgba(255, 140, 0, 1)',   // Dark Orange
        'rgba(255, 215, 0, 1)',   // Gold
        'rgba(154, 205, 50, 1)',  // Yellow Green
        'rgba(0, 255, 255, 1)',   // Aqua
        'rgba(0, 0, 128, 1)',     // Navy
        'rgba(128, 0, 0, 1)',     // Maroon
        'rgba(128, 0, 128, 1)',   // Purple
        'rgba(255, 20, 147, 1)',  // Deep Pink
        'rgba(0, 139, 139, 1)',   // Dark Cyan
      ],
    }],
    labels: []
  };

  var doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: {
      position: 'right', // Di chuyển nhãn sang bên phải
    }
  };

  var doughnutChartPlugins = {
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = 1.5;
      ctx.font = fontSize + "rem sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";

      var text = "947137",
        textX = Math.round((width / 2 - ctx.measureText(text).width) / 1.5),
        textY = height / 2.4;

      ctx.fillText(text, textX, textY);

      ctx.restore();
      var fontSize = 1;
      ctx.font = fontSize + "rem sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#6c7293";

      var texts = "Movies",
        textsX = Math.round((width / 2 - ctx.measureText(text).width) / 1.53),
        textsY = height / 1.7;

      ctx.fillText(texts, textsX, textsY);
      ctx.save();
    }
  }

  var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
  var doughnutChart = new Chart(doughnutChartCanvas, {
    type: 'doughnut',
    data: doughnutPieData,
    options: doughnutPieOptions,
    plugins: doughnutChartPlugins
  });


  // Fetch dữ liệu và cập nhật biểu đồ
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWRmZjc1NDE1ZThkODc2NmMxZWViZjEzYjEyNjlkNyIsInN1YiI6IjY1ZmIxYzQ3MDQ3MzNmMDE0YWU1ZDQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0yoYG2Qeb_O8U_Ecd9Y9V5NtZXb3NnWNfwxhh5FojM'
    }
  };

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  var genreTotalResults = {};

  const fetchMovies = (genreName) => {
    const genreId = genres.find(genre => genre.name === genreName)?.id;
    if (!genreId) {
      console.error(`Genre ${genreName} not found!`);
      return;
    }
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    return fetch(url, options)
      .then(response => response.json())
      .then(data => {
        genreTotalResults[genreName] = data.total_results;
        // Cập nhật số liệu vào biểu đồ
        doughnutPieData.datasets[0].data.push(data.total_results);
        doughnutPieData.labels.push(genreName);
        doughnutChart.update(); // Cập nhật biểu đồ
      })
      .catch(err => console.error(err));
  };

  var genreNames = genres.map(genre => genre.name);

  Promise.all(genreNames.map(genreName => fetchMovies(genreName)))
    .then(() => {
      console.log(genreTotalResults); // Object containing total_results for each genre
    })
    .catch(err => console.error(err));
});