function Shortcutswindow() {
    const ShortcutHeader = document.createElement("div");
    ShortcutHeader.style.position = "fixed";
    ShortcutHeader.style.bottom = "20px";
    ShortcutHeader.style.right = "20px";
    ShortcutHeader.style.width = "250px";
    ShortcutHeader.style.background = "#003366";
    ShortcutHeader.style.color = "white";   
    ShortcutHeader.style.borderRadius = "8px";
    ShortcutHeader.style.padding = "10px";
    ShortcutHeader.style.fontSize = "16px";
    ShortcutHeader.style.fontWeight = "bold";
    ShortcutHeader.style.textAlign = "center";
    ShortcutHeader.style.zIndex = "9999";
    ShortcutHeader.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";

    const shortcut = document.createElement("div");
    shortcut.style.position = "relative";
    shortcut.style.width = "100%";
    shortcut.style.background = "#ffffff";
    shortcut.style.border = "1px solid #2974B3";
    shortcut.style.marginTop = "10px";
    shortcut.style.borderRadius = "4px";

    ShortcutHeader.innerHTML = `
        <div style="padding: 10px;">
            <strong>Shortcuts</strong>
        </div>
    `;

    shortcut.innerHTML = `
        <div style="padding: 15px;">
            <strong>Support</strong>
            <p>Need help?</p>
            <button>Chat</button>
        </div>
    `;

    ShortcutHeader.appendChild(shortcut);
    document.body.appendChild(ShortcutHeader);

}

export async function injectShortcut() {
    Shortcutswindow();
}
