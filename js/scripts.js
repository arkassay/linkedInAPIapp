// 2. Runs when the JavaScript framework is loaded
 function onLinkedInLoad() {
   IN.Event.on(IN, "auth", onLinkedInAuth);
 }

 // 2. Runs when the viewer has authenticated
 function onLinkedInAuth() {
   IN.API.Profile("me", "url=http://www.linkedin.com/in/amanda").result(displayProfiles);
 }

 // 2. Runs when the Profile() API call returns successfully (RETURNS MULTIPLE PROFILES)
 function displayProfiles(profiles) {
   var profilesDiv = document.getElementById("profiles");

	  var members = profiles.values;
	  for (var member in members) {
	    profilesDiv.innerHTML += "<p>Welcome " + members[member].firstName + " " + members[member].lastName + "</p>";
	  }
 }