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