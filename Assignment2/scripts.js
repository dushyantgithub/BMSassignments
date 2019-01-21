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
function showScreen(params) {
      document.getElementById('movieScreenback').classList.add("show");
      document.getElementById('blurEffect').classList.add("show");
      var paramsnew = params.split(',');
      //0 movie.TrailerURL, 
      //1 movie.EventName, 
      //2 movie.EventLanguage, 
      //3 movie.EventGenre, 
      //4 movie.DispReleaseDate,
      //5 DispReleaseYear
      //6 movie.wtsPerc,
      //7 movie.wtsCount,
      //8 movie.maybeCount,
      //9 movie.dwtsCount,
      //10 movie.EventImageCode
      paramsnew[0] = paramsnew[0].replace("watch?v=", "embed/");
      console.log(paramsnew);
      if(paramsnew[0].includes('&feature=youtu.be')) {
          paramsnew[0] = paramsnew[0].replace("&feature=youtu.be", "?autoplay=1");
          document.getElementById('movieScreen').src = paramsnew[0];  
      } else {
            document.getElementById('movieScreen').src = paramsnew[0] + '?autoplay=1';
      }
      document.getElementById('blurEffect').style.backgroundImage = "url('https://in.bmscdn.com/events/moviecard/"+ paramsnew[10] +".jpg')";
      document.getElementById('movieDname').innerHTML = paramsnew[1];
      document.getElementById('movieDlang').innerHTML = paramsnew[2];
      var genres = paramsnew[3].split('|');

      document.getElementById('movieDgenre1').classList.add("movieDgenre");
      document.getElementById('movieDgenre1').innerHTML = genres[0];
      if(genres[1]) {
            document.getElementById('movieDgenre2').classList.add("movieDgenre");
            document.getElementById('movieDgenre2').innerHTML = genres[1]; 
     } if(genres[2]) {
            document.getElementById('movieDgenre3').classList.add("movieDgenre");
            document.getElementById('movieDgenre3').innerHTML = genres[2];
     }
      document.getElementById('movieDLikes').innerHTML = paramsnew[6];
      document.getElementById('movieDvotes').innerHTML = paramsnew[7] + ' votes';
      document.getElementById('movieDreleaseDate').innerHTML = moment(paramsnew[4], "MMMM D YYYY").format("D MMM");
      document.getElementById('movieDreleaseYear').innerHTML = paramsnew[5];
}
function closeScreen() {
      document.getElementById('movieScreenback').classList.remove("show");
      document.getElementById('blurEffect').classList.remove("show");
}

function generateCards(movie) {

      const card = document.createElement('div');
      card.setAttribute('class', 'moviecard');
      const cardImg = document.createElement('img');
      cardImg.setAttribute('class', 'moviecardImg');
      var params = [];
      params.push(
            movie.TrailerURL, 
            movie.EventName, 
            movie.EventLanguage, 
            movie.EventGenre, 
            movie.DispReleaseDate,
            movie.wtsPerc,
            movie.wtsCount,
            movie.maybeCount,
            movie.dwtsCount,
            movie.EventImageCode
            );
      // console.log(params, typeof(params));
      cardImg.setAttribute('onClick', 'showScreen("'+ params +'")');
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
	console.log(movieData);
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