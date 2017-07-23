function populate() {
	if(quiz.isEnded()) {
		showScores();
	}

	else {
		//show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for (var i=0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}

		showProgress();
	}
		
	};

function guess(id,guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		quiz.guess(guess);
		populate();
	}
};

function showProgress() {
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
	var gameOverHtml = "<h1>Result</h1>";
		gameOverHtml += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
		var element = document.getElementById("quiz");
		element.innerHTML = gameOverHtml;
}

//function addImage() {
	//var src= "https://giphy.com/embed/rSCVJasn8uZP2";
	//show benderPic("https://giphy.com/embed/rSCVJasn8uZP2",480,346, "bender high five");
//}

//function showImage(src,width,height,alt){
	//var img = document.createElement('img');
	//img.src = src
	//img.width = width;
	//img.height = height;
	//img.alt = alt;
	//document.body.appendChild(img);
//}

function countDown(secs,elem) {
	var elementTime = document.getElementById(elem);
	elementTime.innerHTML = "You have " + secs + " seconds left.";
	if (secs < 1) {
		clearTimeout(timer);
		showScores();
	}
	secs--;
	var timer = setTimeout('countDown('+secs+', "'+elem+'")', 1000);
}

var questions = [
	new Question("Where was Bender born?", ["USA", "Belgium", "Cuba", "Mexico"], "Mexico"),
	new Question("What is the name of Leela's pet?", ["Nabbler", "Nibbler", "Nobbler", "Nubbler"], "Nibbler"),
	new Question("What company does Dr. Farsworth own?", ["Planet Express", "Space Express", "Earth Express", "Federal Express"], "Planet Express"),
	new Question("Who is Captain Zapp's second in command?", ["Zif", "Kif", "Cif", "Yif"], "Kif"),
	new Question("Bender is Bending Unit ____?", ["20", "21", "22", "23"], "21"),
	new Question("Who was Fry's college roommate?", ["A Dog", "A Monkey", "Santa Claus", "Flexo"], "A Monkey"),
	new Question("What is Fry's favorite soft drink?", ["Slurm", "Glurm", "Gloop", "Slurp"], "Slurm"),
	new Question("What did the Professor's smelloscope detect in space?", ["A cheese planet", "A comet", "A ball of garbage", "A space orchid"], "A ball of garbage")
];

var quiz = new Quiz(questions);

countDown(70,'status');
populate();