function deleteShortcutButton(name: string, url:string){
    console.log("hi")
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts") || "[]"); //Getting shorcuts
    const newShortcuts = shortcuts.filter((shortcut:{name:string,url:string})=> shortcut.name!==name && url!==shortcut.url)
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts)); //finally stored
}