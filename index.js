var searchText;
var objData;
var result = {};
var xttp = new XMLHttpRequest();
async function search() {
    searchText = document.getElementById("searchText").value;
    console.log(searchText);
    let url = `https://api.github.com/search/repositories?q=${searchText}`;
    objData = await logFetch(url);
    if(objData.items.length>0){ 
        endFunction();
    }
    else{
       console.log("No git hub data");
       alert("No git hub data")
       nodata();
    }
}
function logFetch(url) {
    try {
      let response = fetch(url).then(response=>response.json());
      return response;
    }
    catch (err) {
      console.log('fetch failed', err);

    }
}
 
async function endFunction(){
    
    //console.log(objData.items[0].owner.url);
    let owner = await logFetch(objData.items[0].owner.url);
    let branches_url = objData.items[0].branches_url.replace("{/branch}","");
    //console.log(branches_url);
    let branches = await logFetch(branches_url);    
    owner = {
        'login':owner.login,
        'name':owner.name,
        'followersCount':owner.followers,
        'followingCount':owner.following
    }
    result = {...result,
        'name':objData.items[0].name,
        'full_name':objData.items[0].full_name,
        'private':objData.items[0].private,
        'owner':owner,
        'licence_name':licensename(),
        'score':objData.items[0].score,
        'numberOfBranch':branches.length
    }
    let licence_name = JSON.stringify(result.licence_name);
    console.table(result);
    console.log(result.owner.login)
    document.getElementById("result_name").innerHTML = result.name;  
    document.getElementById("full_name").innerHTML = result.full_name;
    document.getElementById("licensename").innerHTML = licence_name; 
    document.getElementById("score").innerHTML = result.score;    
    document.getElementById("numberOfBranches").innerHTML = result.numberOfBranch;  
    document.getElementById("private").innerHTML = result.private;  
    document.getElementById("login").innerHTML = result.owner.login; 
    document.getElementById("owner_name").innerHTML = result.owner.name; 
    document.getElementById("followers").innerHTML = result.owner.followersCount; 
    document.getElementById("following").innerHTML = result.owner.followingCount; 
}
function licensename(){
    if(objData.items[0].license){
        return objData.items[0].license.name;
    }
    else{
        return null;
    }
}

function nodata(){
    document.getElementById("result_name").innerHTML = "-";  
    document.getElementById("full_name").innerHTML = "-";
    document.getElementById("licensename").innerHTML = "-"; 
    document.getElementById("score").innerHTML ="-";    
    document.getElementById("numberOfBranches").innerHTML = "-";  
    document.getElementById("private").innerHTML = "-";  
    document.getElementById("login").innerHTML = "-"; 
    document.getElementById("owner_name").innerHTML = "-"; 
    document.getElementById("followers").innerHTML = "-"; 
    document.getElementById("following").innerHTML = "-"; 
}