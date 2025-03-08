document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    let layout = `
        <div class="grid gap-2">
            <div class="explorerSection"><img src="./assets/icons/add.gif"></div>
            <div class="explorerSectionContainer"></div>
            <div class="p-5">
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
                <div id="profileDetails" class="w-[90%] grid gap-2 mx-auto md:w-[35%]"> </div>
                <div id="repositoryDetails" class="w-[90%] mx-auto md:w-[55%]"> </div>
            </div>
            <div class="loadingContainer w-full flex justify-center"><span class="loader"></span></div>
        </div>
    `;

    root.innerHTML = layout;

    function renderExplorerSectionContainerDetails() {
        const explorerSectionContainer = document.querySelector(".explorerSectionContainer");
        let explorerSectionContainerContent = `
            <div class="w-[300px] h-auto bg-white p-5 rounded-md shadow-md fixed right-[60px] bottom-[150px] hide">
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
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

        })


        function displayUserData(userData) {
            console.log(userData);
            // Display user data in the explorer section
            const profileDetailsContainer = document.querySelector('#profileDetails');
            profileDetailsContainer.innerHTML = `
                <div class="py-5">
                    <div>
                        <img src="${userData.avatar_url}" alt="${userData.name}" class="w-full rounded-circle"/>
                    </div>
                </div>
                <div class="grid gap-2">
                    <h2 class="text-center text-green-400 text-xl">${userData.name || userData.login}</h2>
                    <p><a href="${userData.html_url}" target="_blank">@${userData.login}</a></p>
                    ${userData.bio ? `<p>${userData.bio}</p>` : ''}
                    ${userData.location ? `<p>📍 ${userData.location}</p>` : ''}
                    ${userData.email ? `<p>✉️ ${userData.email}</p>` : ''}
                    ${userData.blog ? `<p>🔗 <a href="${userData.blog}" target="_blank">${userData.blog}</a></p>` : ''}
                </div>
            `;
        }
        
    }

    
    
});



