
// deno-lint-ignore-file
var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
}

function getTextFor(theme) {
    if (theme === 'dark')
        return '☽'
    return '☼';
}

function getOpposite(theme) {
    if (theme === 'dark') return 'light'
    return 'dark'
}

function getCurrentTheme() {
    var dataTheme = document.documentElement.getAttribute('data-theme');
    if (!dataTheme) {
        dataTheme = 'light'
    }
    return dataTheme
}

// https://stackoverflow.com/questions/56300132/how-to-over-ride-css-prefers-color-scheme-setting
// determines if the user has a set theme
function detectColorScheme() {
    var theme = "light";    //default to light

    if (mediaQuery && mediaQuery.matches) {
        //OS theme setting detected as dark
        theme = "dark";
    }

    applyTheme(theme)
}
detectColorScheme();
(function () {
    detectColorScheme();

    if (mediaQuery) {
        mediaQuery.addEventListener('change', function (e) {
            var theme = e.matches ? "dark" : "light";
            applyTheme(theme)
        })
    }

    // Add copy buttons to code blocks
    document.querySelectorAll('pre').forEach(function (pre) {
        var button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.addEventListener('click', function () {
            var code = pre.querySelector('code');
            var text = code ? code.textContent : pre.textContent;
            navigator.clipboard.writeText(text).then(function () {
                button.textContent = 'Copied!';
                setTimeout(function () {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}());
