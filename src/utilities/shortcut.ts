import { addFileButton, createFileMenu, loadFiles } from "./shortcut_files";
import "./shortcut_styles.css"


function saveShortcut(name: string, url: string) {
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as { name: string; url: string; id: string }[];
    const id = Date.now().toString();
    shortcuts.push({ name, url, id }); //add shortcut to in-memory, not stored
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts)); //finally stored
    return id;
}

function loadShortcuts() {
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as  { name: string; url: string; id: string }[]; //basically saying "hey, all shortcuts have url and name"
    const shortcutMemory = document.getElementById("shortcuts_list") as HTMLDivElement; //basically "trust me its a div bro"
    shortcutMemory.innerHTML = ""; //empty
    shortcuts.forEach(s => {
        shortcutMemory?.appendChild(makeAShortcut(s.name, s.url, s.id)); //"get" all the links back from memory 
    });
}

// function clearALLShortcuts(){ //FOR DEBUGGING
//     localStorage.setItem("shortcuts", JSON.stringify([]));
//     loadShortcuts();
// }

function closeMenu(){
    const menu = (document.getElementById("shortcut_menu") as HTMLDivElement);
    menu.remove();
}

function makeAShortcut(name:string, url:string, id:string){
    const shortcutLink = document.createElement("a");
    shortcutLink.className = "shortcut_link";
    shortcutLink.href = url;
    shortcutLink.text = name;
    shortcutLink.textContent = name;
    shortcutLink.dataset.shortcutId = id;

    const linkHolder = document.createElement("div");
    linkHolder.id = "link_holder"
    linkHolder.className = "shortcut_item_container";
    linkHolder.draggable = true;
    linkHolder.dataset.shortcutId = id;

    const deleteShortcut = document.createElement("button");
    deleteShortcut.id = "shortcut_delete_button";
    deleteShortcut.textContent = "X";

    const editShortcut = document.createElement("button");
    editShortcut.id = "shortcut_edit_button";
    editShortcut.textContent = "✎";

    linkHolder.addEventListener("mouseenter", () => {
        deleteShortcut.style.display = "inline-block";
        editShortcut.style.display = "inline-block";
    });

    linkHolder.addEventListener("mouseleave", () => {
        deleteShortcut.style.display = "none";
        editShortcut.style.display = "none";
    });

    deleteShortcut.addEventListener("click", (event)=>{
        event.preventDefault();
        event.stopPropagation();
        const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as { name:string; url:string; id: string }[];
        const updated = shortcuts.filter(shortcut => shortcut.id !== id);
        localStorage.setItem("shortcuts", JSON.stringify(updated));
        loadShortcuts();
    });

    editShortcut.addEventListener("click", (event)=>{
        if (document.getElementById("edit_shortcut_menu")) return //prevent spam
        const EditMenuContent = document.createElement("div");
        EditMenuContent.id = "edit_shortcut_menu"
        document.body.appendChild(EditMenuContent)

        EditMenuContent.innerHTML = `
            <div id="edit_shortcut_menu">
                <div style="padding: 10px;">
                    <strong>Edit Shortcut</strong>
                </div>
            <form>
                <label for="edit_sc_name">Shortcut Name</label>
                <input type="text" id="edit_sc_name" name="Edit_Shortcut_Name"><br><br>
                <label for="edit_sc_url">Shortcut URL</label>
                <input type="url" id="edit_sc_url" name="Edit_Shortcut_URL"><br><br>
            </form>
            <button id=save_edit>Save</button>
            <button id=cancel_edit>Cancel</button>
            </div>
        </div>
        `;
        const editNameBar = EditMenuContent.querySelector<HTMLInputElement>("#edit_sc_name")!;;
        editNameBar.value = name;
        const editURLBar = EditMenuContent.querySelector<HTMLInputElement>("#edit_sc_url")!;
        editURLBar.value = url;

        const SaveEditButton = EditMenuContent.querySelector<HTMLButtonElement>("#save_edit")!;
        SaveEditButton.addEventListener("click", (e)=>{
            if (!editNameBar.value || !editURLBar.value) return;
            const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as { name:string; url:string }[];
            const updated = shortcuts.map(shortcut => shortcut.name === name && shortcut.url === url ? {name:editNameBar.value,url:editURLBar.value} : shortcut);
            localStorage.setItem("shortcuts", JSON.stringify(updated));
            loadShortcuts();
            EditMenuContent.remove();

        });
        const CancelEditButton = EditMenuContent.querySelector<HTMLButtonElement>("#cancel_edit")!;
        CancelEditButton.addEventListener("click", (e)=>{
            EditMenuContent.remove();
        });

        // if (!newName || !newUrl) return;
        // const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as { name:string; url:string }[];
        // const updated = shortcuts.map(shortcut => shortcut.name === name && shortcut.url === url ? {name:newName,url:newUrl} : shortcut);
        // localStorage.setItem("shortcuts", JSON.stringify(updated));
        // loadShortcuts();
        //editShortcut.appendChild(EditMenuContent)
    });
    linkHolder.appendChild(shortcutLink);
    linkHolder.appendChild(editShortcut);
    linkHolder.appendChild(deleteShortcut);
    return linkHolder;
}

function createMenu(){
    if (document.getElementById("shortcut_menu")) return; //prevent "create shortcut" button spam

    //CSS
    //Create Shortcut Menu
    const createShortcutMenu = document.createElement("div");
    createShortcutMenu.id = "shortcut_menu";

    //Create Shortcut in Menu Button
    const createShortcutMenuButton = document.createElement("div");
    createShortcutMenuButton.id = "shortcut_menu_button"

    //Cancel Shortcut in Menu Button
    const closeShortcutMenuButton = document.createElement("div");
    closeShortcutMenuButton.id = "close_shortcut_menu_button"

      //shortcut header
    const ShortcutMenuHeader = document.createElement("div");
    ShortcutMenuHeader.id = "shortcut_header";

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
    `;

    document.body.appendChild(createShortcutMenu);
    createShortcutMenu.appendChild(ShortcutMenuHeader);
    createShortcutMenu.appendChild(ShortcutMenuContent);
    createShortcutMenu.appendChild(createShortcutMenuButton);
    createShortcutMenu.appendChild(closeShortcutMenuButton)

    //autofill
    const urlBar = document.getElementById("sc_url") as HTMLInputElement;
    urlBar.value = window.location.href;

    //autofill name
    const nameBar = document.getElementById("sc_name") as HTMLInputElement;
    nameBar.value = document.title;

    
    closeShortcutMenuButton.addEventListener("click", () => {
    closeMenu();
});

    createShortcutMenuButton.addEventListener("click", () => {
    const shortcutName = (document.getElementById("sc_name") as HTMLInputElement).value;
    const shortcutURL = (document.getElementById("sc_url") as HTMLInputElement).value;
    const id = saveShortcut(shortcutName, shortcutURL);
    const newLink = makeAShortcut(shortcutName, shortcutURL, id);
    const SCList = document.getElementById("shortcuts_list");

    SCList?.appendChild(newLink);
    closeMenu();
});

}


function Shortcutswindow() { //This function is called
    //CSS
    //container
    const ShortcutContainer = document.createElement("div");
    ShortcutContainer.id = "shortcut_container";
    ShortcutContainer.draggable = true;

    //shortcut header
    const ShortcutHeader = document.createElement("div");
    ShortcutHeader.id = "shortcut_header";
    
    //Shortcut Button
    const shortcutButton = document.createElement("div");
    shortcutButton.id = "shortcut_buttons";

    //Shortcuts List
    const shortcutsList = document.createElement("div")
    shortcutsList.id = "shortcuts_list";

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
        <div style="padding: 15px;" id = shortcut_buttons>
            <button id = "shortcut_button">Add Shortcut</button>

            <button id = "add_file_button">Add File</button>
        </div>
    `;

    addFileButton.addEventListener("click", () => {
        const file = document.createElement("div")
        ShortcutContent.appendChild(file);
        createFileMenu();

        file.innerHTML = `
        <div style="padding: 15px;" id = link_file>
            Hi im a div lol
        </div>
        `;
        file.textContent = "hi im a file :D"
        const SCList = document.getElementById("shortcuts_list");
        SCList?.appendChild(file);
    });

    //CALLS AND IDS
    shortcutsList.id = "shortcuts_list";
    document.body.appendChild(ShortcutContainer);
    ShortcutContainer.appendChild(ShortcutHeader);
    ShortcutContainer.appendChild(ShortcutContent);
    ShortcutContent.appendChild(shortcutsList)
    ShortcutContent.appendChild(shortcutButton);
    // ShortcutContent.appendChild(addFileButton)
    //clearALLShortcuts(); //ONLY UNCOMMENT WHEN DEBUGGING! THIS DELETES ALL LINKS WHEN PAGE IS REFRESHED!
    loadShortcuts();
    //loadFiles();

    //COLLAPSIBLE FUNCTIONALITY
    let isMinimized = false;
    const minimizeButton = document.getElementById("minimize_shortcuts") as HTMLButtonElement;
    minimizeButton.addEventListener("click", () => {
        isMinimized = !isMinimized;
        ShortcutContent.style.display = isMinimized ? "none" : "flex";
        minimizeButton.textContent = isMinimized ? "+" : "−";
        ShortcutContainer.style.height = isMinimized ? "40px" : "550px";
    });

    //DRAGGABLE FUNCTIONALITY
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    ShortcutHeader.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - ShortcutHeader.getBoundingClientRect().left;
        offsetY = e.clientY - ShortcutHeader.getBoundingClientRect().top;
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
    $("#add_file_button").on("click", () => {createFileMenu()});
}
