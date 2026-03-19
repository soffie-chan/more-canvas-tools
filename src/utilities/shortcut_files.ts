//import { loadFiles } from "./shortcut";

export type fileStore={
    fileName: string;
    fileContents: {name:string, url:string, id:string }[];
}


// export function saveFiles(fileName: string) {
//     const files = JSON.parse(localStorage.getItem("files") || "[]") as { fileName: string }[];
//     files.push({ fileName }); //add shortcut to in-memory, not stored
//     localStorage.setItem("files", JSON.stringify(files)); //finally stored
// }

// export function loadFiles() {
//     const files = JSON.parse(localStorage.getItem("files") || "[]") as  { filename: string }[]; //basically saying "hey, all shortcuts have url and name"
//     const shortcutMemory = document.getElementById("shortcuts_list") as HTMLDivElement; //basically "trust me its a div bro"
//     shortcutMemory.innerHTML = ""; //empty
//     files.forEach(f => {
//         shortcutMemory?.appendChild(createFile(f.filename)); //"get" all the links back from memory 
//     });
//     console.log(files);
// }


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

    const fileName = document.createElement("div")
    fileName.textContent = "🗁 " + file.fileName;

    const linkStorage = document.createElement("div")

    newFile.appendChild(fileName);
    newFile.appendChild(linkStorage)
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
        fileMenu.remove();
    });

    const CancelFileButton = fileMenu.querySelector<HTMLButtonElement>("#cancel_file")!;
        CancelFileButton.addEventListener("click", ()=>{
            fileMenu.remove();
    });

    
}