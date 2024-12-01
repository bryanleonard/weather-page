function setTheme(theme) {
    document.documentElement.className = theme;
}

// Example: Change theme to Rainy
document.getElementById('theme-switcher').addEventListener('change', (event) => {
    setTheme(event.target.value);
});
  