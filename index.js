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
    console.table(result);    
}
function licensename(){
    if(objData.items[0].license){
        return objData.items[0].license.name;
    }
    else{
        return null;
    }
}