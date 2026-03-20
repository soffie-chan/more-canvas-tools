import { loadFiles, loadShortcuts } from "./shortcut";

export type fileStore={
    fileName: string;
    fileContents: {name:string, url:string, id:string }[];
}


export const addFileButton = document.createElement("div");

export function shortcutMenuDropdown(){
    const files = JSON.parse(localStorage.getItem("files") || "[]") as fileStore[];
    const select = document.getElementById("fileAddMenu") as HTMLSelectElement;
    select.innerHTML = "";
    const noFileOption = document.createElement("option");
    noFileOption.value = "";
    noFileOption.textContent = "Add to Shortcuts Menu";
    noFileOption.selected = true;
    select.appendChild(noFileOption);

  files.forEach((file, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.textContent = file.fileName;
    select.appendChild(option);
  });
}


export function createFile(file: fileStore){
    const newFile = document.createElement("div")
    newFile.id = "new_file";
    newFile.className = "file_container";

    const fileName = document.createElement("div")
    fileName.id = "file_name";
    fileName.textContent = "🗁 " + file.fileName;
    fileName.style.cursor = "pointer";

    const linkStorage = document.createElement("div")
    linkStorage.style.display = "block";

    //Make files collapse. Poof!
    fileName.addEventListener("click", (e)=>{
        e.stopPropagation();
        const isCollapsed = linkStorage.style.display === "none";
        linkStorage.style.display = isCollapsed ? "block" : "none";
        fileName.textContent = "🗁 " + file.fileName;
    })

    //Edit and Delete File
    const deleteFile = document.createElement("button");
    deleteFile.className = "file_delete_button";
    deleteFile.textContent = "X";

    const editFile = document.createElement("button");
    editFile.className = "file_edit_button";
    editFile.textContent = "✎";

    newFile.addEventListener("mouseenter", () => {
        deleteFile.style.display = "inline-block";
        editFile.style.display = "inline-block";
    });

    newFile.addEventListener("mouseleave", () => {
        deleteFile.style.display = "none";
        editFile.style.display = "none";
    });

    deleteFile.addEventListener("click", (event)=>{
        console.log("click!")
        event.preventDefault();
        event.stopPropagation();
            const shortcuts = JSON.parse(localStorage.getItem("files") || "[]") as fileStore[];
            const updated = shortcuts.filter(file => "🗁 "+ file.fileName+ "✎X" !== fileName.textContent );
            localStorage.setItem("files", JSON.stringify(updated));
        console.log("🗁 "+ file.fileName+"✎X")
        console.log(fileName.textContent )
        loadShortcuts();
        loadFiles();
    });

    // editShortcut.addEventListener("click", (event)=>{
    //     if (document.getElementById("edit_shortcut_menu")) return //prevent spam
    //     const EditMenuContent = document.createElement("div");
    //     EditMenuContent.id = "edit_shortcut_menu"
    //     document.body.appendChild(EditMenuContent)

    //     EditMenuContent.innerHTML = `
    //         <div id="edit_shortcut_menu">
    //             <div style="padding: 10px;">
    //                 <strong>Edit Shortcut</strong>
    //             </div>
    //         <form>
    //             <label for="edit_sc_name">Shortcut Name</label>
    //             <input type="text" id="edit_sc_name" name="Edit_Shortcut_Name"><br><br>
    //             <label for="edit_sc_url">Shortcut URL</label>
    //             <input type="url" id="edit_sc_url" name="Edit_Shortcut_URL"><br><br>
    //         </form>
    //         <button id=save_edit>Save</button>
    //         <button id=cancel_edit>Cancel</button>
    //         </div>
    //     </div>
    //     `;
    //     const editNameBar = EditMenuContent.querySelector<HTMLInputElement>("#edit_sc_name")!;;
    //     editNameBar.value = name;
    //     const editURLBar = EditMenuContent.querySelector<HTMLInputElement>("#edit_sc_url")!;
    //     editURLBar.value = url;

    //     const SaveEditButton = EditMenuContent.querySelector<HTMLButtonElement>("#save_edit")!;
    //     SaveEditButton.addEventListener("click", (e)=>{
    //         if (!editNameBar.value || !editURLBar.value) return;
    //         if (fileIndex !== undefined) {
    //             const files = JSON.parse(localStorage.getItem("files") || "[]") as fileStore[];
    //             files[fileIndex].fileContents = files[fileIndex].fileContents.map(l => l.id === id ? {name: editNameBar.value, url: editURLBar.value, id} : l);
    //             localStorage.setItem("files", JSON.stringify(files));
    //         } else {
    //             const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]") as { name:string; url:string; id: string }[];
    //             const updated = shortcuts.map(shortcut => shortcut.id === id ? {name:editNameBar.value, url:editURLBar.value, id} : shortcut);
    //             localStorage.setItem("shortcuts", JSON.stringify(updated));
    //         }
    //         loadShortcuts();
    //         loadFiles();
    //         EditMenuContent.remove();

    //     });
    //     const CancelEditButton = EditMenuContent.querySelector<HTMLButtonElement>("#cancel_edit")!;
    //     CancelEditButton.addEventListener("click", (e)=>{
    //         EditMenuContent.remove();
    //     });


    fileName.appendChild(editFile);
    fileName.appendChild(deleteFile);

    newFile.appendChild(fileName);
    newFile.appendChild(linkStorage);
    return newFile;
}

export function createFileMenu(){
    const fileMenu = document.createElement("div")
    fileMenu.id = "file_menu"
    document.body.appendChild(fileMenu)
    fileMenu.innerHTML = `
            <div>
                <div style="padding: 10px;">
                    <strong>Create a File</strong>
                </div>
            <form>
                <label for="file_name">File Name</label>
                <input type="text" id="file_name_input" name="File_Name"><br><br>
            </form>
            <button id=add_file>Add File</button>
            <button id=cancel_file>Cancel</button>
            </div>
        </div>
    `;

    const fileNameBar = fileMenu.querySelector<HTMLInputElement>("#file_name_input")!;
    const AddFileButton = fileMenu.querySelector<HTMLButtonElement>("#add_file")!;
    AddFileButton.addEventListener("click", (e)=>{
        if (!fileNameBar.value) return;
        const placeholder: fileStore = {fileName: fileNameBar.value, fileContents: []};
        // const newFile = createFile(placeholder);
        // const SCList = document.getElementById("shortcuts_list");
        const files = JSON.parse(localStorage.getItem("files")||"[]") as fileStore[];
        files.push(placeholder);
        localStorage.setItem("files", JSON.stringify(files))
        //saveFiles(fileNameBar.value);
        //loadFiles();
        loadFiles();
        fileMenu.remove();
    });

    const CancelFileButton = fileMenu.querySelector<HTMLButtonElement>("#cancel_file")!;
        CancelFileButton.addEventListener("click", ()=>{
            fileMenu.remove();
    });

    
}