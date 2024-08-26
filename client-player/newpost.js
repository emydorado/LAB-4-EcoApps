document.getElementById('createPost').addEventListener('click', function (event) {
	event.preventDefault();
	console.log('hola');
	createPost();
});

async function createPost() {
	try {
		renderLoadingState();

		const createdPost = document.getElementById('post_input').value;
		console.log('Post:', createdPost);

		const post = {
			post: createdPost,
		};

		const response = await fetch('http://localhost:5050/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(post),
		});

		if (response.ok) {
			console.log('Data sent successfully');
			renderData();
		} else {
			console.log('Response not ok:', response.status);
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
	const container = document.getElementById('posts-container');
	if (container) {
		container.innerHTML = '<p>Registered complete</p>';

		fetch('http://localhost:5050/posts')
			.then((response) => response.json())
			.then((data) => {
				container.innerHTML = data.posts.map((post) => `<p>${post.post}</p>`).join('');
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);
				container.innerHTML = '<p>Error loading posts</p>';
			});
	} else {
		console.log('Data container not found');
	}
}
