const overview = document.querySelctor(".overview");
const username = "Tphalen13";
const repoList = document.querySelctor(".repo-list");
const allReposContainer = document.querySelctor(".repos");
const repoData = document.querySelctor(".repo-data");
const viewReposButton = document.querySelctor(".view-repos");
const filterInput = document.querySelctor(".filter-repos");

const gitUserInfo = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};
 gitUserInfo();

const displayUserInfo = function(data){
    const div = document.querySelector("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt = "user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
    <p><strong>Name:</strong>${data.name}</p>
    <p><strong>Bio:</strong>${data.bio}</p>
    <p><strong>Location:</strong>${data.location}</p>
    <p><strong>Number of Public Repos:</strong>${data.public_repos}</p>
    </div>
    `;
    overview.append(div);
   
};

const gitRepos = async function(){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function(repos){
    for(const repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventlistener("click", function(e){
    if(e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName){
    const fetchInfo = await fetch();
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const LanguageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages){
    repoData.innerHTML = " ";
    repoDate.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document,createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Default Branch: ${repoInfo.default-branch}</p>
    <p>Languages: ${languages.join(",")}</p>
    <a class = "visit" href ="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
    `;
    repoData.append(div);
};

viewReposButton.addEventlistener("click", function(){
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterInput.addEventlistener("click", function(){
    const searchText = e.target.value;
    const repos = document.querySelector(".repo");
    const searchLowerText = searchText.toLowerCase();

    for(const repo of repos){
        const repoLowerText = repo.innerText.toLowerCase();
        if(repoLowerText.includes(searchLowerText)){
            repo.classList.remove("hide");
        } else{
            repo.classList.add("hide");
        }
    }
});