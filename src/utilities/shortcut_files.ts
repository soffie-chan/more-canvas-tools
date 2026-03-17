export function saveFiles(filename: string) {
    const files = JSON.parse(localStorage.getItem("files") || "[]") as { filename: string }[];
    files.push({ filename }); //add shortcut to in-memory, not stored
    localStorage.setItem("files", JSON.stringify(files)); //finally stored
}

export function loadFiles() {
    const files = JSON.parse(localStorage.getItem("files") || "[]") as  { filename: string }[]; //basically saying "hey, all shortcuts have url and name"
    const shortcutMemory = document.getElementById("shortcuts_list") as HTMLDivElement; //basically "trust me its a div bro"
    shortcutMemory.innerHTML = ""; //empty
    files.forEach(f => {
        shortcutMemory?.appendChild(createFile(f.filename)); //"get" all the links back from memory 
    });
    console.log(files);
}


export const addFileButton = document.createElement("div");



export const newFile = document.createElement("div")
export function createFile(filename: string){
    newFile.innerHTML = `
        <div style="padding: 15px;" id = new_file>
        </div>
    `;
    //this stuff is for saving the folders
    // const Files = JSON.parse(localStorage.getItem("files") || "[]") as { name:string, contents:[] }[];
    // Files.push({ name }); //add shortcut to in-memory, not stored
    // localStorage.setItem("shortcuts", JSON.stringify(shortcuts)); //finally stored
    newFile.id = "shortcuts_list";
    newFile.textContent = "🗁 " + filename;
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
        const newFile = createFile(fileNameBar.value);
        const SCList = document.getElementById("shortcuts_list");
        SCList?.appendChild(newFile);
        saveFiles(fileNameBar.value);
        fileMenu.remove();
    });

    const CancelFileButton = fileMenu.querySelector<HTMLButtonElement>("#cancel_file")!;
        CancelFileButton.addEventListener("click", ()=>{
            fileMenu.remove();
    });

    
}