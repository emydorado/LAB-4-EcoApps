function loadPage(page) {
	fetch(page)
		.then((response) => response.text())
		.then((data) => {
			document.querySelector('#content').innerHTML = data;
		})
		.catch((error) => console.error('Error al cargar la página:', error));
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('nav a').forEach((link) => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const page = event.target.getAttribute('href');
			loadPage(page);
		});
	});

	loadPage('dashboard.html');
});

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}
