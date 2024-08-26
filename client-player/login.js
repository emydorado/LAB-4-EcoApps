document.getElementById('login-form').addEventListener('submit', function (event) {
	event.preventDefault();
	const username = document.getElementById('username_input').value;
	const password = document.getElementById('password_input').value;

	loginUser(username, password);
});

async function loginUser(username, password) {
	try {
		const response = await fetch('http://localhost:5050/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			window.location.href = 'newpost.html';
		} else {
			const message = document.getElementById('login-message');
			message.textContent = 'Invalid username or password';
			message.style.color = 'red';
		}
	} catch (error) {
		console.error('Error:', error);
		const message = document.getElementById('login-message');
		message.textContent = 'Error connecting to the server';
		message.style.color = 'red';
	}
}
