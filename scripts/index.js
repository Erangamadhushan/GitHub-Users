document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");

    let layout = `
        <div class="grid gap-2">
            <div class="explorerSection"><img src="./assets/icons/add.gif"></div>
            <div class="explorerSectionContainer"></div>
            <div class="p-5">
                <h3 class="text-center text-orange-400 text-bold text-[1.5em] md:text-[3em]">GitHub User Finder</h3>
            </div>
            <div class="grid md:flex gap-3">
                <div class="w-[90%] mx-auto md:w-[75%]">
                    <input type="text" class="w-full p-3 border md:m-3"  id="githubuserName" name="githubuserName" placeholder="Enter GitHub User Name :"/>
                </div>
                <div class="w-[90%] mx-auto md:w-[15%] bg-green-400 hover:bg-green-500 transition-300 text-white p-3 m-3">
                    <button class="text-center w-full" type="button" onclick="searchContent()">Search </button>
                </div>
            </div>
            <div>
                <div id="profileDetails"> </div>
                <div id="repositoryDetails"> </div>
            </div>
        </div>
    `;

    root.innerHTML = layout;

    function renderExplorerSectionContainerDetails() {
        const explorerSectionContainer = document.querySelector(".explorerSectionContainer");
        let explorerSectionContainerContent = `
            <div class="w-[300px] h-auto bg-white p-5 rounded-md shadow-md fixed right-[60px] bottom-[150px] hidden">
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
})