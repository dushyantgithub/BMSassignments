var screenWidth = document.getElementById('root').offsetWidth;
const app = document.getElementById('root');
const languageDropDown = document.getElementById('dropdown_language');
const genreDropdown = document.getElementById('dropdown_genre');
const cardContainer = document.createElement('div');
cardContainer.setAttribute('class', 'cardContainer');

app.appendChild(cardContainer);
var allMovies = [];
var globalLanguage = "All";
var globalGenre = "All";
function changeLanguage(text) {
      document.getElementById('language_selected').innerHTML = text;
      globalLanguage = text;
      updatedMovieList(globalLanguage, globalGenre);
}

function changeGenre(text) {
      if(text == "All") {
            document.getElementById('genre_selected').innerHTML = "All Genres"; 
      } else {
            document.getElementById('genre_selected').innerHTML = text;
      } 
      globalGenre = text;
      updatedMovieList(globalLanguage, globalGenre);
}

function generateCards(movie) {

      const card = document.createElement('div');
      card.setAttribute('class', 'moviecard');


      const cardImg = document.createElement('img');
      cardImg.setAttribute('class', 'moviecardImg');
      // One of the poster is missing
      if(movie.EventImageCode == "sheene-et00044696-17-04-2017-17-59-42") {
            cardImg.setAttribute('src', 'https://in.bmscdn.com/events/moviecard/maragatha-kaadu-et00083831-12-09-2018-10-46-35.jpg');
      } else {
            cardImg.setAttribute('src', 'https://in.bmscdn.com/events/moviecard/'+ movie.EventImageCode +'.jpg');
      }

      const moviecardPlayBtn = document.createElement('img');
      moviecardPlayBtn.setAttribute('class', 'moviecardPlayBtn');
      moviecardPlayBtn.setAttribute('src', './images/play_btn.png');

      const moviecardName = document.createElement('span');
      moviecardName.setAttribute('class', 'moviecardName');
      moviecardName.textContent = movie.EventName;

      const moviecardRelease = document.createElement('span');
      moviecardRelease.setAttribute('class', 'moviecardRelease');
      // Adding break tag
      moviecardRelease.textContent = moment(movie.DispReleaseDate, "MMMM D YYYY").format("D") +"\n"+ moment(movie.DispReleaseDate, "MMMM D YYYY").format("MMM");
      moviecardRelease.innerHTML = moviecardRelease.innerHTML.replace(/\n\r?/g, '<br />');

      const moviecardLikes = document.createElement('span');
      moviecardLikes.setAttribute('class', 'moviecardLikes');
      const moviecardLikesImg = document.createElement('img');
      moviecardLikesImg.setAttribute('src', './images/like.png');
      moviecardLikes.textContent = movie.wtsPerc + " %";

      const moviecardCount = document.createElement('span');
      moviecardCount.setAttribute('class', 'moviecardCount');
      moviecardCount.textContent = movie.wtsCount;

      cardContainer.appendChild(card);

      card.appendChild(cardImg);
      card.appendChild(moviecardPlayBtn);
      card.appendChild(moviecardName);
      card.appendChild(moviecardRelease);
      card.appendChild(moviecardLikes);
      moviecardLikes.appendChild(moviecardLikesImg);
      card.appendChild(moviecardCount);
}
selectedLanguageMovies = [];
selectedGenreMovies = [];
function updatedMovieList(globalLanguage, globalGenre) {
      selectedLanguageMovies = [];
      selectedGenreMovies = [];
      while (cardContainer.hasChildNodes()) {
            cardContainer.removeChild(cardContainer.firstChild);
      }
      //Show all movies
      if(globalLanguage == "All" && globalGenre == "All") {
            selectedLanguageMovies = allMovies;
            selectedGenreMovies = allMovies;
      } if(globalLanguage != "All" && globalGenre == "All") {
            allMovies.forEach(movie => {
                  if(movie.EventLanguage.includes(globalLanguage)) {
                        selectedLanguageMovies.push(movie);
                        selectedGenreMovies.push(movie);
                  }
            });
      } if(globalLanguage == "All" && globalGenre != "All") {
            allMovies.forEach(movie => {
                  if(movie.EventGenre.includes(globalGenre)) {
                        selectedLanguageMovies.push(movie);
                        selectedGenreMovies.push(movie);
                  }
            });
      } if(globalLanguage != "All" && globalGenre != "All") {
            allMovies.forEach(movie => {
                  if(movie.EventLanguage.includes(globalLanguage) && movie.EventGenre.includes(globalGenre)) {
                        selectedLanguageMovies.push(movie);
                        selectedGenreMovies.push(movie);
                  }
            });
      }
      // console.log(selectedLanguageMovies);
      selectedLanguageMovies.forEach(movie=> {
            generateCards(movie);
      });
}

var request = new XMLHttpRequest();
//Adding proxy URL to avoid CORS policy error
var proxyurl = "https://cors-anywhere.herokuapp.com/";

request.open('GET', proxyurl+'https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs', true);
request.onload = function () {

	// Begin accessing data here
	var data = JSON.parse(this.response);
	// console.log(typeof(data));
	var movieLanguage = data[0];
	movieLanguage.forEach(movieLanguage => {
		// console.log(movieLanguage);
            const movieLanguagedropdown = document.createElement('a');
            movieLanguagedropdown.setAttribute('class', 'language');
            movieLanguagedropdown.setAttribute('href', '#');
            movieLanguagedropdown.setAttribute('onClick', 'changeLanguage("'+ movieLanguage +'")');
            movieLanguagedropdown.textContent = movieLanguage;

            languageDropDown.appendChild(movieLanguagedropdown);
	});

	var moviedatawithkeys = data[1];
	var movieData = Object.values(moviedatawithkeys);
	// console.log(movieData);
      allMovies = movieData;
      
      var allGenres = [];
	movieData.forEach(movie => {

            //Listing all available genres
            var movieGenres = movie.EventGenre.split("|");
            for (var i = 0; i < movieGenres.length; i++) {
                  allGenres.push(movieGenres[i]);
            }
            // console.log(allGenres);

            generateCards(movie);

	});
      //storing only unique genres
      var uniqueGenres = [...new Set(allGenres)];
      // console.log(uniqueGenres);

      uniqueGenres.forEach(genres => {
            // console.log(genres);
            const genresDropdown = document.createElement('a');
            genresDropdown.setAttribute('class', 'language');
            genresDropdown.setAttribute('href', '#');
            genresDropdown.setAttribute('onClick', 'changeGenre("'+ genres +'")');
            genresDropdown.textContent = genres;

            genreDropdown.appendChild(genresDropdown);
      });
      // console.log(allMovies);


}
request.send();