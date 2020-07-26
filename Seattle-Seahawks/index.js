var Page_Number = 0;
var Options;
var getingData = false;

async function LoadData(url) {
	return fetch(url).then((response) => response.json()).then((data) => {
		return data;
	});
}

(async () => {
	var data = await LoadData("Options.json");
	Options = data;
	document.body.style.background = Options.Background;
	document.getElementById("last_modified").innerHTML = "Last Modified: " + Options.LastModified;
	await LoadMorePlayers();
})();

async function LoadMorePlayers() {
	document.getElementById("LoadMorePlayers").innerText = "Loading...";
	document.getElementById("LoadMorePlayers").disabled = true;
	var data = await LoadData(Options.Pages[Page_Number]);
	ShowPlayers(data);
	Page_Number++;
	if(Page_Number >= Options.Pages.length) {
		document.getElementById("LoadMorePlayers").style.display = "none";
	}
	document.getElementById("LoadMorePlayers").innerText = "Load More Players";
	document.getElementById("LoadMorePlayers").disabled = false;
}

function ShowPlayers(Data) {
	var i;
	for (i = 0; i < Data.Players.length; i++) {
		document.getElementById("Players").innerHTML += '<div id="Player"><a href="' + Data.Players[i].Link + '" target="_blank"><img src="' + Data.Players[i].Image + '" id="Player_Image"></a><center><div id="Player_Name">' + Data.Players[i].Name + '</div></center></div>';
	}
}


//--------------------------------------------------------------------------

var TotalVisits = firebase.database().ref('TotalVisits');
TotalVisits.transaction(function (current) {
	return current + 1;
});

firebase.database().ref().on('child_added', function (snapshot) {
	if (snapshot.key == "TotalVisits") {
		document.getElementById("total_visits").innerHTML = "Total Visits: " + snapshot.val();
	}
});

firebase.database().ref().on('child_changed', function (snapshot) {
	if (snapshot.key == "TotalVisits") {
		document.getElementById("total_visits").innerHTML = "Total Visits: " + snapshot.val();
	}
});



/*
var Players = [];

var playerDivs = document.querySelectorAll("div.d3-o-table--horizontal-scroll td.sorter-lastname div.d3-o-media-object");

var links = document.querySelectorAll("#main-content > section:nth-child(5) > div > div > div > div.d3-o-table--horizontal-scroll > table > tbody > tr > td.sorter-lastname > div > a");

playerDivs.forEach((element, i) => {
	Players[i] = {};
	var link = element.querySelector("a");
	var img = element.querySelector("img");
	if(img === null) {
		Players[i].Image = "https://static.www.nfl.com/image/private/t_player_profile_landscape/f_auto/league/gptuonxbaawq5nixes85";
	}
	else {
		Players[i].Image = img.src;
	}
	Players[i].Link = link.href;
	Players[i].Name = link.innerHTML;
});

JSON.stringify(Players);

*/