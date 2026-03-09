import { startDialog } from "~src/canvas/dialog";

function saveShortcut(name: string, url: string) {
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]"); //This is how strings get stored! Getting shorcuts
    shortcuts.push({ name, url }); //add shortcut to in-memory, not stored
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts)); //finally stored
}

function loadShortcuts() {
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as  { name: string; url: string }[]; //basically saying "hey, all shortcuts have url and name"
    const shortcutMemory = document.getElementById("shortcuts_list") as HTMLDivElement; //basically "trust me its a div bro"
    shortcutMemory.innerHTML = ""; //empty
    shortcuts.forEach(s => {
        shortcutMemory?.appendChild(makeAShortcut(s.name, s.url)); //"get" all the links back from memory 
    });
}

function clearALLShortcuts(){ //FOR DEBUGGING
    localStorage.setItem("shortcuts", JSON.stringify([]));
    loadShortcuts();
}

function closeMenu(){
    const menu = (document.getElementById("shortcut_menu") as HTMLDivElement);
    menu.remove();
    
}

function makeAShortcut(name:string, url:string){
    //const menu = (document.getElementById("shortcut_menu") as HTMLElement);
    //const menuStuff = (document.getElementById("create_shortcut") as HTMLElement);
    const shortcutLink = document.createElement("a");
    shortcutLink.href = url;
    shortcutLink.text = name;
    shortcutLink.textContent = name;
    return shortcutLink;
}

function createMenu(){
    if (document.getElementById("shortcut_menu")) return; //prevent "create shortcut" button spam

    //CSS
    //Create Shortcut Menu
    const createShortcutMenu = document.createElement("div");
    createShortcutMenu.id = "shortcut_menu";

    createShortcutMenu.style.position = "fixed";
    createShortcutMenu.style.bottom = "100px";
    createShortcutMenu.style.right = "400px";
    createShortcutMenu.style.width = "250px";
    createShortcutMenu.style.height = "450px";
    createShortcutMenu.style.background = "#ffffff";
    createShortcutMenu.style.color = "#003366";   
    createShortcutMenu.style.borderRadius = "8px";
    createShortcutMenu.style.padding = "10px";
    createShortcutMenu.style.fontSize = "16px";
    createShortcutMenu.style.fontWeight = "bold";
    createShortcutMenu.style.textAlign = "center";
    createShortcutMenu.style.zIndex = "10000";
    createShortcutMenu.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    //Create Shortcut in Menu Button
    const createShortcutMenuButton = document.createElement("div");
    createShortcutMenuButton.style.position = "relative";
    createShortcutMenuButton.style.width = "100%";
    createShortcutMenuButton.style.background = "#ffffff";
    createShortcutMenuButton.style.marginTop = "10px";
    //Cancel Shortcut in Menu Button
    const closeShortcutMenuButton = document.createElement("div");
    createShortcutMenuButton.style.position = "relative";
    createShortcutMenuButton.style.width = "100%";
    createShortcutMenuButton.style.background = "#ffffff";
    createShortcutMenuButton.style.marginTop = "40px";

      //shortcut header
    const ShortcutMenuHeader = document.createElement("div");
    ShortcutMenuHeader.id = "shortcut_header";
    ShortcutMenuHeader.style.position = "relative";
    ShortcutMenuHeader.style.width = "100%";

    //shortcut content
    const ShortcutMenuContent = document.createElement("div");
    ShortcutMenuContent.id = "shortcut_content";

    //HTML
    //Create Shorcut Menu
    ShortcutMenuHeader.innerHTML = `
        <div id=shortcut_header style="padding: 10px;">
            <strong>Create a Shortcut</strong>
        </div>
    `;
    ShortcutMenuContent.innerHTML = `
            <div id="detailsOfSC">
            <form>
                <label for="sc_name">Shortcut Name</label>
                <input type="text" id="sc_name" name="Shortcut_Name"><br><br>
                <label for="sc_url">Shortcut URL</label>
                <input type="url" id="sc_url" name="Shortcut_URL"><br><br>
            </form>
            </div>
        </div>
    `;
    //Create Shortcut in Menu button
    createShortcutMenuButton.innerHTML = `
        <div style="padding: 15px;" id = create_shortcut>
            <button id>Create Shortcut</button>
        </div>
    `;
    closeShortcutMenuButton.innerHTML = `
        <div style="padding: 15px;" id = close_menu>
            <button id>Cancel</button>
        </div>
    `

    document.body.appendChild(createShortcutMenu);
    createShortcutMenu.appendChild(ShortcutMenuHeader);
    createShortcutMenu.appendChild(ShortcutMenuContent);
    createShortcutMenu.appendChild(createShortcutMenuButton);
    createShortcutMenu.appendChild(closeShortcutMenuButton)

    //autofill
    const urlBar = document.getElementById("sc_url") as HTMLInputElement;
    urlBar.value = window.location.href;
    
    closeShortcutMenuButton.addEventListener("click", () => {
    closeMenu();
});

    createShortcutMenuButton.addEventListener("click", () => {
    const shortcutName = (document.getElementById("sc_name") as HTMLInputElement).value;
    const shortcutURL = (document.getElementById("sc_url") as HTMLInputElement).value;
    let newLink = makeAShortcut(shortcutName, shortcutURL);
    const SCList = document.getElementById("shortcuts_list");
    SCList?.appendChild(newLink);
    closeMenu();

    //menu draggable functionality
    //     let isMenuDragging = false;
    //     let menuOffsetX = 0;
    //     let menuOffsetY = 0;
    //     ShortcutMenuHeader.addEventListener("mousedown", (e) => {
    //         isMenuDragging = true;
    //         menuOffsetX = e.clientX - createShortcutMenu.getBoundingClientRect().left;
    //         menuOffsetY = e.clientY - createShortcutMenu.getBoundingClientRect().top;
    //         createShortcutMenu.style.transition = "none"; // Disable transition during dragging
    //     }
    //     );
    //     document.addEventListener("mousemove", (e) => {
    //         if (isMenuDragging) {
    //             createShortcutMenu.style.left = `${e.clientX - menuOffsetX}px`;
    //             createShortcutMenu.style.top = `${e.clientY - menuOffsetY}px`;
    //         }
    //     });
    //     document.addEventListener("mouseup", () => {
    //         isMenuDragging = false;
    //         createShortcutMenu.style.transition = "all 0.3s ease"; // Re-enable transition after dragging
    //     }
    // );

});

}


function Shortcutswindow() { //This function is called
    //CSS
    //container
    const ShortcutContainer = document.createElement("div");
    ShortcutContainer.id = "shortcut_container";
    ShortcutContainer.style.position = "fixed";
    ShortcutContainer.style.bottom = "20px";
    ShortcutContainer.style.right = "20px";
    ShortcutContainer.style.width = "250px";
    ShortcutContainer.style.height = "550px";
    ShortcutContainer.style.background = "#003366";
    ShortcutContainer.style.color = "white";   
    ShortcutContainer.style.borderRadius = "8px";
    ShortcutContainer.style.padding = "10px";
    ShortcutContainer.style.fontSize = "16px";
    ShortcutContainer.style.fontWeight = "bold";
    ShortcutContainer.style.textAlign = "center";
    ShortcutContainer.style.zIndex = "9999";
    ShortcutContainer.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    ShortcutContainer.draggable = true;
    ShortcutContainer.style.cursor = "move";

    //shortcut header
    const ShortcutHeader = document.createElement("div");
    ShortcutHeader.id = "shortcut_header";
    ShortcutHeader.style.position = "relative";
    ShortcutHeader.style.width = "100%";
  

    
    //Shortcut Button
    const shortcutButton = document.createElement("div");
    shortcutButton.id = "shortcut_button";
    shortcutButton.style.position = "relative";
    shortcutButton.style.width = "100%";
    shortcutButton.style.background = "#ffffff";
    shortcutButton.style.border = "1px solid #2974B3";
    shortcutButton.style.marginTop = "10px";
    shortcutButton.style.borderRadius = "4px";
    //Shortcuts List
    const shortcutsList = document.createElement("div")
    shortcutsList.id = "shortcuts_list";

    shortcutsList.style.padding = "10px"
    shortcutsList.style.flexDirection = "column"
    shortcutsList.style.display = "flex"
    shortcutsList.style.height = "420px";
    shortcutsList.style.background = "#ffffff";
    shortcutsList.style.overflowY = "auto";
    shortcutsList.style.justifyContent = "flex-start";

    const ShortcutContent = document.createElement("div");
    ShortcutContent.id = "shortcut_content";

    //HTML
    //Shortcuts Panel
    ShortcutHeader.innerHTML = `
        <div style="padding: 10px; ">
            <button id="minimize_shortcuts" style="position: absolute; top: 10px; right: 10px; background: transparent; border: 1px solid white; color: white; font-size: 18px; cursor: pointer;">
                &#x2212;
            </button>
            <strong>Shortcuts</strong>
        </div>
       
    `;
    //Shortcut Button
    shortcutButton.innerHTML = `
        <div style="padding: 15px;" id = shortcut_button>
            <button id>Add Shortcut</button>
        </div>
    `;

    

    //CALLS AND IDS
    shortcutsList.id = "shortcuts_list";
    document.body.appendChild(ShortcutContainer);
    ShortcutContainer.appendChild(ShortcutHeader);
    ShortcutContainer.appendChild(ShortcutContent);
    ShortcutContent.appendChild(shortcutsList)
    // ShortcutContainer.appendChild(shortcutsList)
    ShortcutContent.appendChild(shortcutButton);
    //clearALLShortcuts(); //ONLY UNCOMMENT WHEN DEBUGGING! THIS DELETES ALL LINKS WHEN PAGE IS REFRESHED!
    loadShortcuts();

    //COLLAPSIBLE FUNCTIONALITY
    let isMinimized = false;
    const minimizeButton = document.getElementById("minimize_shortcuts") as HTMLButtonElement;
    minimizeButton.addEventListener("click", () => {
        isMinimized = !isMinimized;
        ShortcutContent.style.display = isMinimized ? "none" : "flex";
        minimizeButton.textContent = isMinimized ? "+" : "−";
        ShortcutContainer.style.height = isMinimized ? "40px" : "550px";
    });

    //Set proper display for ShortcutContent
    ShortcutContent.style.display = "flex";
    ShortcutContent.style.flexDirection = "column";

    //DRAGGABLE FUNCTIONALITY
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    ShortcutHeader.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - ShortcutContainer.getBoundingClientRect().left;
        offsetY = e.clientY - ShortcutContainer.getBoundingClientRect().top;
        ShortcutContainer.style.transition = "none"; // Disable transition during dragging
    }
    );
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            ShortcutContainer.style.left = `${e.clientX - offsetX}px`;
            ShortcutContainer.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
        ShortcutContainer.style.transition = "all 0.3s ease"; // Re-enable transition after dragging
    });



}



//INJECTION CALL
export function injectShortcut() {
    Shortcutswindow();
    console.log(document.querySelectorAll("#shortcut_menu").length);
    $("#shortcut_button").on("click", () => createMenu());
}
