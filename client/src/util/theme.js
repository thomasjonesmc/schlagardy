const lightTheme = {
    "--primary-color": "white",
    "--accent-color": "#2a6336",
	"--primary-font-color": "black",
	"--alt-font-color": "white"
};

const darkTheme = {
    "--primary-color": "#212121",
    "--accent-color": "#121212",
	"--primary-font-color": "white",
	"--alt-font-color": "white"
};

// helper function to set the theme to passed in value
function setTheme(themeValue) {
    const theme = themeValue === "dark" ? darkTheme : lightTheme;

    localStorage.setItem("theme", themeValue);

    for (let prop in theme) {
        document.documentElement.style.setProperty(prop, theme[prop]);
    }
}

// can call on App mount to set the previously saved theme
export function setCurrentTheme() {
    let theme = localStorage.getItem("theme");
    if (!theme) theme = "dark"
    setTheme(theme);
}

// can call when the toggle button in profile drop down is clicked
export function toggleTheme() {
    const themeValue = localStorage.getItem("theme");
    const theme = themeValue === "dark" ? "light" : "dark";
    setTheme(theme);
}