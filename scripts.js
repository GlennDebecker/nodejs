
function addMovie(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const directorInput = document.getElementById('director');
  const movieReleaseInput = document.getElementById('movieRelease');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const director = directorInput.value;
  const movieRelease = parseInt(movieReleaseInput.value, 10);

  // Krijg het huidige jaar
  const currentYear = new Date().getFullYear();

  if (director.match(/\d/)) {
    alert('Director name should not contain numbers.');
    return;
  }

  if (title.length > 30) {
    alert('Title should not exceed 30 characters.');
    return;
  }

  if (movieRelease < 1895 || movieRelease > currentYear) {
    alert('Release year must be between 1895 and the current year.');
    return;
  }

  const movieData = {
    title: title,
    description: description,
    director: director,
    movieRelease: movieRelease
  };

  fetch('http://localhost:8888/api/Movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Movie added:', data);
      getMovies(); // Herlaad lijst na toevoegen
    })
    .catch(error => console.error('Error adding movie:', error));
}

function searchMovies() {
  const searchQuery = prompt('Enter search term:');
  console.log('Search Query:', searchQuery);
  if (searchQuery) {
      fetch(`http://localhost:8888/api/Movies/search?q=${searchQuery}`)
          .then(response => response.json())
          .then(data => {
              const movieList = document.getElementById('movieList');
              movieList.innerHTML = ''; // Maak de huidige lijst leeg

              data.forEach(movie => {
                  const listItem = document.createElement('li');
                  listItem.innerHTML = `
                      <h2>${movie.titleMovie}</h2>
                      <p>Description: ${movie.description}</p>
                      <p>Director: ${movie.director}</p>
                      <p>Release Date: ${movie.movieRelease}</p>
                      <button onclick="editMovie('${movie._id}')">Edit</button>
                      <button onclick="deleteMovie('${movie._id}')">Delete</button>
                  `;
                  movieList.appendChild(listItem);
              });
          })
          .catch(error => console.error('Error searching data:', error));
  }
}

function removeMovieList() {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = ''; // maak het movieList element leeg, zodat er niks meer te zien is
}

function getMovies(limit, offset) {
  fetch(`http://localhost:8888/api/Movies?limit=${limit}&offset=${offset}&sort=alphabetical`)
      .then(response => response.json())
      .then(data => {
          const movieList = document.getElementById('movieList');
          movieList.innerHTML = '';

          data.forEach(movie => {
              const listItem = document.createElement('li');
              listItem.innerHTML = `
              <h2>${movie.titleMovie}</h2>
              <p>Description: ${movie.description}</p>
              <p>Director: ${movie.director}</p>
              <p>Release Date: ${movie.movieRelease}</p>
              <button onclick="editMovie('${movie._id}')">Edit</button>
              <button onclick="deleteMovie('${movie._id}')">Delete</button>
          `;
              movieList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}

function editMovie(id) {
  const newTitle = prompt('Enter new title:');
  const newDescription = prompt('Enter new description:');
  const newDirector = prompt('Enter new director:');
  const newRelease = prompt('Enter new release year (number):');

  if (isNaN(newRelease)) {
      alert('Release year must be a number.');
      return; // exit de functie als het geen nummer is
  }

  const updatedMovie = {
      title: newTitle,
      description: newDescription,
      director: newDirector,
      movieRelease: parseInt(newRelease, 10)
  };

  if (newTitle === null || newDescription === null || newDirector === null || newRelease === null) {
      console.log('Edit canceled');
      return; // exit de functie als je canceled
  }

  fetch(`http://localhost:8888/api/Movies/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMovie)
  })
      .then(response => response.json())
      .then(data => {
          console.log('Movie updated:', data);
          getMovies();
      })
      .catch(error => console.error('Error updating movie:', error));
}

function deleteMovie(id) {
  if (confirm('Are you sure you want to delete this movie?')) {
      fetch(`http://localhost:8888/api/Movies/${id}`, {
          method: 'DELETE'
      })
          .then(response => response.json())
          .then(data => {
              console.log('Movie deleted:', data);
              getMovies();
          })
          .catch(error => console.error('Error deleting movie:', error));
  }
}

function sortMovies(sortType, sortOrder) {
  const movieList = document.getElementById('movieList');
  removeMovieList();

  let sortQueryParam = '';
  if (sortType === 'alphabetical') {
    sortQueryParam = `sort=${sortOrder === 'descending' ? 'alphabeticalDesc' : 'alphabeticalAsc'}`;
  } else if (sortType === 'release') {
    sortQueryParam = 'sort=release';
  }

  fetch(`http://localhost:8888/api/Movies?${sortQueryParam}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h2>${movie.titleMovie}</h2>
          <p>Description: ${movie.description}</p>
          <p>Director: ${movie.director}</p>
          <p>Release Date: ${movie.movieRelease}</p>
          <button onclick="editMovie('${movie._id}')">Edit</button>
          <button onclick="deleteMovie('${movie._id}')">Delete</button>
        `;
        movieList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// <--------------------- Comment gedeelte -----------------------> 

function fetchComments() {
  fetch('http://localhost:8888/api/commentBox')
    .then(response => response.json())
    .then(data => {
      const commentsList = document.getElementById('commentsList');
      commentsList.innerHTML = '';

      data.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `
          <p>${comment.userName}: ${comment.textBox}</p>
          <button onclick="editComment('${comment._id}', '${comment.textBox}')">Edit</button>
          <button onclick="deleteComment('${comment._id}')">Delete</button>
        `;
        commentsList.appendChild(commentItem);
      });
    })
    .catch(error => console.error('Error fetching comments:', error));
}

function postComment() {
  const commenterNameInput = document.getElementById('commenterName');
  const commenterEmailInput = document.getElementById('commenterEmail');
  const newCommentInput = document.getElementById('newComment');
  const commentCharCount = document.getElementById('commentCharCount');

  const commenterName = commenterNameInput.value;
  const commenterEmail = commenterEmailInput.value;
  const newCommentText = newCommentInput.value;

  if (commenterName.length > 30) {
    alert('Username should not exceed 30 characters.');
    return;
  }

  if (!isValidEmail(commenterEmail)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (newCommentText.length > 250) {
    alert('Comment should not exceed 250 characters.');
    return;
  }

  const newCommentData = {
    userName: commenterName,
    email: commenterEmail,
    textBox: newCommentText
  };

  fetch('http://localhost:8888/api/commentBox', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCommentData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Comment posted:', data);
      fetchComments();
    })
    .catch(error => console.error('Error posting comment:', error));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateCharCount() {
  const maxChars = 250; // Maximum allowed characters
  const newCommentInput = document.getElementById('newComment');
  const charCountElement = document.getElementById('commentCharCount');

  const currentChars = newCommentInput.value.length;
  const remainingChars = maxChars - currentChars;

  charCountElement.textContent = `Characters left: ${remainingChars}`;
}


// edit een comment
function editComment(commentId, initialText) {
  const updatedComment = prompt('Edit comment:', initialText);

  if (updatedComment === null) {
    console.log('Edit canceled');
    return;
  }

  const editedCommentData = {
    textBox: updatedComment
  };

  fetch(`http://localhost:8888/api/commentBox/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedCommentData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Comment updated:', data);
    fetchComments(); 
  })
  .catch(error => console.error('Error updating comment:', error));
}

// delete een comment
function deleteComment(commentId) {
  if (confirm('Are you sure you want to delete this comment?')) {
    fetch(`http://localhost:8888/api/commentBox/${commentId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Comment deleted:', data);
      fetchComments(); 
    })
    .catch(error => console.error('Error deleting comment:', error));
  }
}

// Fetch initial comments wanneer de pagina laad
fetchComments();
