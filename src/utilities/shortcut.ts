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
    //CSS
    //Create Shortcut Menu
    const createShortcutMenu = document.createElement("div");

    createShortcutMenu.style.position = "fixed";
    createShortcutMenu.style.bottom = "300px";
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
    createShortcutMenuButton.style.border = "1px solid #2974B3";
    createShortcutMenuButton.style.fill = "#2974B3";
    createShortcutMenuButton.style.marginTop = "10px";
    createShortcutMenuButton.style.borderRadius = "4px";


    //HTML
    //Create Shorcut Menu
    createShortcutMenu.innerHTML = `
        <div id=shortcut_menu style="padding: 10px;">
            <strong>Create a Shortcut</strong>
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

    document.body.appendChild(createShortcutMenu);
    createShortcutMenu.appendChild(createShortcutMenuButton);
    createShortcutMenuButton.addEventListener("click", () => {
    const shortcutName = (document.getElementById("sc_name") as HTMLInputElement).value;
    const shortcutURL = (document.getElementById("sc_url") as HTMLInputElement).value;
    console.log(shortcutName, shortcutURL);
    let newLink = makeAShortcut(shortcutName, shortcutURL);
    const shortcutHeader = document.getElementById("shortcut_header");
    shortcutHeader?.appendChild(newLink);
});

}


function Shortcutswindow() { //This function is called
    //CSS
    //Header
    const ShortcutHeader = document.createElement("div");
    ShortcutHeader.style.position = "fixed";
    ShortcutHeader.style.bottom = "20px";
    ShortcutHeader.style.right = "20px";
    ShortcutHeader.style.width = "250px";
    ShortcutHeader.style.height = "550px";
    ShortcutHeader.style.background = "#003366";
    ShortcutHeader.style.color = "white";   
    ShortcutHeader.style.borderRadius = "8px";
    ShortcutHeader.style.padding = "10px";
    ShortcutHeader.style.fontSize = "16px";
    ShortcutHeader.style.fontWeight = "bold";
    ShortcutHeader.style.textAlign = "center";
    ShortcutHeader.style.zIndex = "9999";
    ShortcutHeader.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    //Shortcut Button
    const shortcutButton = document.createElement("div");
    shortcutButton.style.position = "relative";
    shortcutButton.style.width = "100%";
    shortcutButton.style.height = "490px";
    shortcutButton.style.background = "#ffffff";
    shortcutButton.style.border = "1px solid #2974B3";
    shortcutButton.style.marginTop = "10px";
    shortcutButton.style.borderRadius = "4px";


    //HTML
    //Shortcuts Pnel
    ShortcutHeader.innerHTML = `
        <div style="padding: 10px;">
            <strong>Shortcuts</strong>
        </div>
    `;
    //Shortcut Button
    shortcutButton.innerHTML = `
        <div style="padding: 15px;" id = shortcut_button>
            <button id>Add Shortcut</button>
        </div>
    `;

    //CALLS
    ShortcutHeader.id = "shortcut_header";
    document.body.appendChild(ShortcutHeader);
    ShortcutHeader.appendChild(shortcutButton);

}


//INJECTION CALL
export async function injectShortcut() {
    Shortcutswindow();
    $("#shortcut_button").on("click", () => createMenu());
}
