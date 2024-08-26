document.getElementById('register').addEventListener('click', function (event) {
	event.preventDefault();
	createUser();
});

async function createUser() {
	try {
		renderLoadingState();

		const username = document.getElementById('username_input').value;
		const password = document.getElementById('password_input').value;
		const email = document.getElementById('email_input').value;

		console.log('Username:', username);
		console.log('Password:', password);
		console.log('Email:', email);

		const player = {
			username: username,
			password: password,
			email: email,
		};

		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(player),
		});

		if (response.ok) {
			console.log('Data sent successfully');
			renderData();
			window.location.href = 'dashboard.html';
		} else {
			throw new Error('Network response was not ok');
		}
	} catch (error) {
		console.error('Error:', error);
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	if (container) {
		container.innerHTML = '<p>Failed to load data</p>';
		console.log('Failed to load data');
	} else {
		console.log('Data container not found');
	}
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	if (container) {
		container.innerHTML = '<p>Loading...</p>';
	} else {
		console.log('Data container not found');
	}
}

function renderData() {
	const container = document.getElementById('data-container');
	if (container) {
		container.innerHTML = '<p>Registration complete</p>';
	} else {
		console.log('Data container not found');
	}
}
