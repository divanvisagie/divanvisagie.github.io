// Add copy buttons to code blocks and render Mermaid diagrams
(function () {
    function mermaidTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'default';
    }

    function mermaidFontFamily() {
        if (!window.getComputedStyle) {
            return undefined;
        }
        var body = document.body;
        if (!body) {
            return undefined;
        }
        return window.getComputedStyle(body).fontFamily;
    }

    function mermaidMonoColor() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? '#ffffff'
            : '#000000';
    }

    function initMermaid() {
        if (!window.mermaid) {
            return;
        }
        document.querySelectorAll('pre > code.language-mermaid').forEach(function (code) {
            var container = document.createElement('div');
            container.className = 'mermaid';
            container.textContent = code.textContent || '';
            var pre = code.parentElement;
            if (pre) {
                pre.replaceWith(container);
            }
        });
        window.mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                fontFamily: mermaidFontFamily(),
                primaryBorderColor: mermaidMonoColor(),
                lineColor: mermaidMonoColor(),
                primaryTextColor: mermaidMonoColor(),
                primaryColor: 'transparent',
                secondaryColor: 'transparent',
                tertiaryColor: 'transparent',
                clusterBkg: 'transparent',
                clusterBorder: mermaidMonoColor(),
                edgeLabelBackground: 'transparent'
            }
        });
        window.mermaid.run({ querySelector: '.mermaid' });
    }

    function initCopyButtons() {
        document.querySelectorAll('pre').forEach(function (pre) {
            var code = pre.querySelector('code.language-mermaid');
            if (code) {
                return;
            }
            var button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.addEventListener('click', function () {
                var codeEl = pre.querySelector('code');
                var text = codeEl ? codeEl.textContent : pre.textContent;
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
    }

    function init() {
        initMermaid();
        initCopyButtons();
    }

    if (window.matchMedia) {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        if (mq.addEventListener) {
            mq.addEventListener('change', function () {
                location.reload();
            });
        } else if (mq.addListener) {
            mq.addListener(function () {
                location.reload();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
