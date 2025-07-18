document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    let layout = `
        <div class="grid gap-2 border border-2">
            <div class="explorerSection"><img src="./assets/icons/add.gif"></div>
            <div class="explorerSectionContainer"></div>
            <div class="flex justify-center gap-5 items-baseline p-5">
                <a href="" target="_blank" class="text-green-400 text-[1.5em] md:text-[3em]"><img src="./assets/icons/github.png" alt="GitHub Logo" class="w-[50px] h-[50px] mx-auto"/></a>
                <h3 class="text-center text-green-400 text-bold text-[1.5em] md:text-[3em]">GitHub User Finder</h3>
            </div>
            <div class="grid md:flex gap-3">
                <div class="w-[90%] mx-auto md:w-[75%]">
                    <input type="text" class="w-full p-3 border md:m-3"  id="githubuserName" name="githubuserName" placeholder="Enter GitHub User Name :"/>
                </div>
                <div class="w-[90%] mx-auto md:w-[15%] bg-green-400 hover:bg-green-500 transition-300 text-white p-3 m-3">
                    <button class="text-center w-full searchUser" type="button" >Search </button>
                </div>
            </div>
            <div class="grid md:flex gap-3">
                <div id="profileDetails" class="w-[90%] max-h-[100vh] md:max-h-[80vh] grid gap-2 mx-auto md:w-[35%]"> </div>
                <div id="repositoryDetails" class="w-[90%] overflow-y-auto mx-auto md:w-[55%] grid gap-3"> </div>
            </div>
            <div class="w-[90%] mx-auto md:w-[75%] p-5 text-center grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 text-green-400 id="chartsSection">

            </div>

        </div>
    `;

    root.innerHTML = layout;

    function renderExplorerSectionContainerDetails() {
        const explorerSectionContainer = document.querySelector(".explorerSectionContainer");
        let explorerSectionContainerContent = `
            <div class="w-[300px] h-auto p-5 rounded-md shadow-md fixed right-[60px] bottom-[150px] bg-gray-900 hide">
                <ul>
                    <li class="text-green-400 p-2 hover:bg-gray-800 hover:text-white"><a href="https://erangamadhushan.github.io/Resource-Bank/">Connect Rosources</a></li>
                    <li class="text-green-400 p-2 hover:bg-gray-800 hover:text-white"><a href="https://erangamadhushan.github.io/Git-School/">Git School</a></li>
                    <li class="text-green-400 p-2 hover:bg-gray-800 hover:text-white"><a href="https://github.com/Erangamadhushan/GitHub-Users">GitHub Repository</a></li>
                </ul>
            </div>
        `;
        explorerSectionContainer.innerHTML = explorerSectionContainerContent;
    }
    renderExplorerSectionContainerDetails();

    document.querySelector(".explorerSection").addEventListener("click", () => {
        document.querySelector(".explorerSectionContainer").classList.toggle("active");
    });

    document.querySelector(".searchUser").addEventListener("click", searchGitHubUser);
    document.querySelector("#githubuserName").addEventListener("keypress", (e) => {
        if(e.key === "Enter") {
            searchGitHubUser();
        }
    })

    function searchGitHubUser() {
        const githubUserName = document.querySelector("#githubuserName").value.trim();
        if(!githubUserName) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });

            return false;
        }

        // Fetch user data from GitHub API
        fetch(`https://api.github.com/users/${githubUserName}`)
        .then(response => {
            if (!response.ok) {
                
            }
            return response.json();
        })
        .then(userData => {
            displayUserData(userData);
        })
        .catch(error => {
            console.log(error);
        })
        .finally (()=> {

        });

        async function getUserRepoDetails() {
            try {
                let response = await fetch(`https://api.github.com/users/${githubUserName}/repos`);
                let data = await response.json();
                displayUserRepoDetails(data);
            }
            catch(err) {
                console.log(err);
            }
        }

        function displayUserData(userData) {
            console.log(userData);
            // Display user data in the explorer section
            const profileDetailsContainer = document.querySelector('#profileDetails');
            profileDetailsContainer.innerHTML = `
                <div class="py-5">
                    <div class="rounded-xl overflow-hidden">
                        <img src="${userData.avatar_url}" alt="${userData.name}" class="w-[80%] mx-auto rounded-xl"/>
                    </div>
                </div>
                <div class="grid gap-2 py-3">
                    <h2 class="text-center text-green-400 text-xl">${userData.name || userData.login}</h2>
                    <p><a href="${userData.html_url}" class="text-green-400" target="_blank">@${userData.login}</a></p>
                    ${userData.bio ? `<p class="text-green-400">${userData.bio}</p>` : ''}
                    ${userData.location ? `<p class="text-green-400">📍 ${userData.location}</p>` : ''}
                    ${userData.email ? `<p class="text-green-400">✉️ ${userData.email}</p>` : ''}
                    ${userData.blog ? `<p class="text-green-400">🔗 <a href="${userData.blog}" target="_blank">${userData.blog}</a></p>` : ''}
                    <p class="text-green-400">Public Repository : <span>${userData.public_repos}</span></p>
                    ${
                        userData.public_repos > 0 ? "Active User " : "New User"
                    }
                    <p class="text-green-400">Follower : <span>${userData.followers} </span> Following : <span>${userData.following}</span></p>
                </div>
            `;
            getUserRepoDetails();
        }
        function displayUserRepoDetails(repoDetails){
            // console.log(repoDetails)
            const repositoryDetails = document.querySelector("#repositoryDetails");
            let repositoryDetailsContent = `<h2 class="text-center py-3 text-green-400 text-[1.5em] md:text-[2.2em]">Repository Details </h2>`;

            repoDetails = repoDetails.filter(({stargazers_count}) => {
                return stargazers_count > 0;
            });
            repoDetails.splice(0,5).forEach((repo, index) => {
                //console.log(repo.stargazers_count);
                repositoryDetailsContent += `
                    <div class="w-[95%] mx-auto bg-green-100 p-3 rounded-[.2em] mb-3 animate__animated animate__zoomIn animate__delay-${index * .2}s" >
                        <h2 class="text-green-900 text-center text-xl font-bold">${repo.name}</h2>
                        <p>${repo.description || " No description available"}</p>
                        <p>Forks : <span>${repo.forks}</span>  Stars : <span>${repo.stargazers_count}</span></p>
                        <p>Language : <span>${repo.language}</span></p>
                    </div>
                `
            })
            
            repositoryDetails.innerHTML = repositoryDetailsContent;
        }
    }

});
