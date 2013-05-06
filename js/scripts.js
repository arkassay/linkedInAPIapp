// 2. Runs when the JavaScript framework is loaded
 function onLinkedInLoad() {
   IN.Event.on(IN, "auth", onLinkedInAuth);
 }

 // 2. Runs when the viewer has authenticated
 function onLinkedInAuth() {
   IN.API.Profile("me").result(displayProfiles);
   $('.needAuth').show();
	getID();
	getConnections();
	getGroups();
 }

 // 2. Runs when the Profile() API call returns successfully (RETURNS MULTIPLE PROFILES)
 function displayProfiles(profiles) {
   var profilesDiv = document.getElementById("profiles");

	  var members = profiles.values;
	  for (var member in members) {
	    profilesDiv.innerHTML += "<p>Welcome " + members[member].firstName + " " + members[member].lastName + "</p>";
		profilesDiv.innerHTML += "<p> " + members[member].headline + "</p>";
	  }
 }

function getID() {
   	IN.API.Profile("me")
	   .result(function(result) { 
	      $("#memberProfile").html('<script type="IN\/FullMemberProfile" data-id="' + result.values[0].id + '"><\/script>');
	      IN.parse(document.getElementById("memberProfile"))
	   })
	}

function getConnections(){
	IN.API.Connections("me")
      .fields("firstName", "lastName", "industry")
      .result(displayConnections)
      .error(displayConnectionErrors);
}

function getGroups(){
	IN.API.Raw("/people/~/group-memberships?membership-state=member ").result(displayUserGroups); 
}

function displayConnections(connections) {
    var connectionsDiv = document.getElementById("connectionsList");

    var members = connections.values; // The list of members you are connected to
    for (var member in members) {
      connectionsDiv.innerHTML += "<p>" + members[member].firstName + " " + members[member].lastName
                           + " works in the " + members[member].industry + " industry";
    }     
  }

function displayUserGroups(groups) {
    var groupsDiv = document.getElementById("groupsList");
	$.each(groups.values, function(index, value){
			IN.API.Raw("/groups/"+value.group.id+":(id,name,short-description,description,posts:(title,summary,creator,site-group-post-url),site-group-url)").result(function(result){
				groupsDiv.innerHTML += "<p>You belong to group: <a href='"+result.siteGroupUrl+"'>" + value.group.name + "</a></p>";
				if(result.posts != null){
					groupsDiv.innerHTML += "<h3>Recent Posts</h3><ul>";
					$.each(result.posts.values, function(ind, post){
						//IN.API.Raw("/groups/12345/posts:(title,summary,creator)?order=recency")
						groupsDiv.innerHTML += "<li><a href='"+post.siteGroupPostUrl+"'>"+post.title+"</a></li>"
					});
					groupsDiv.innerHTML += "</ul>";
				}
				
			});
			
			
	});
}

function displayConnectionErrors(error) { /* do nothing */ }
function displayGroupErrors(error) { /* do nothing */ }