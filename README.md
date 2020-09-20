# vue-markdown-pdq

A [vue](https://vuejs.org "Vue version 2+") markdown parser using
[markdown-it](https://www.npmjs.com/package/markdown-it) and  these plugins builtin:


>[abbr](https://www.npmjs.com/package/markdown-it-abbr "Abbreviations"),
[attrs](https://www.npmjs.com/package/markdown-it-attrs "Attributes for use with spans"),
[collapsible](https://www.npmjs.com/package/markdown-it-collapsible "Collapsible using summary/detail"),
[deflist](https://www.npmjs.com/package/markdown-it-deflist "Definition list"),
[emoji](https://www.npmjs.com/package/markdown-it-emoji "Emoji support"),
[footnote](https://www.npmjs.com/package/markdown-it-footnote "Footnotes"),
[insert](https://www.npmjs.com/package/markdown-it-ins "Insert tag"),
[mark](https://www.npmjs.com/package/markdown-it-mark "Mark tag"),
[pandoc](https://www.npmjs.com/package/markdown-it-pandoc "Pandoc styled blocks"),
[spans](https://github.com/mb21/markdown-it-bracketed-spans "Spans for use with attrs"),
[sub](https://www.npmjs.com/package/markdown-it-sub "Subscripts"),
[sup](https://www.npmjs.com/package/markdown-it-sup "Superscripts"),
[tasklist](https://www.npmjs.com/package/markdown-it-task-lists "Task lists"),
[toc](https://www.npmjs.com/package/markdown-it-toc-and-anchor "Table of contents")


**Note**:
syntax-highlighting is provided by [Prism](https://prismjs.com).

# Download


Fetch from [Github repo](https://github.com/pdqi/vue-markdown-pdq) /
[PDQI home-page](https://dev.pdqi.com/fossil/vue-markdown-pdq)
and look in directory **dist**, or use the command-line:

> **wget** [https://dev.pdqi.com/lib/vue-markdown-pdq.js](https://dev.pdqi.com/lib/vue-markdown-pdq.js "FYI: you can right-click Save-As this link")



# Demo

> [Online demo](https://dev.pdqi.com/fossil/vue-markdown-pdq/doc/ckout/example/demo.html) /
[repo](./example/demo.html "Works only via fossil"):
[view demo source](./example/demo.html?mimetype=text/plain).

# Quick Start

```
    <script src="https://unpkg.com/vue@2.1.8/dist/vue.min.js"></script>
    <script src="https://dev.pdqi.com/lib/vue-markdown-pdq.js"></script>
    <body>
      <div id="app">
        <vue-markdown-pdq>A ~~Simple~~ **test**.</vue-markdown-pdq>
      </div>
      <script>
        Vue.use(VueMarkdownPdq);
        new Vue({ el:'#app' });
      </script>
    </div>
    </body>
    </html>
```
See [quick-start online](https://dev.pdqi.com/fossil/vue-markdown-pdq/doc/ckout/example/simple.html).

# Markdown Cheatsheet

    # Heading (or ##, ### ...)
    [link](url "tooltip")
    ![image](url "tooltip")
    *italic* or _italic_
    **bold** or __bold__
    ***bold-italic*** or ___bold-italic___
    `inline-code`
    ~~strikethrough~~
    ++underlined++
    ==highlighted==
    :emoji:  or :-)
    :superscipt^n^, or subscript~n~

    1) ol-list (or 1.)
    * ul-list (or + or -)
    * [x] task-list

    ``` js
    code-block (or indent 4+ spaces), language optional
    ```

    ::: {.class style=""}
    pandoc with optional attrs
    :::

    +++ title {.class}
    collapsible with optional attrs
    +++

    |table|
    |:---:|
    |row  |

    term
    : definition

    mentioned [^footnote]
    [^footnote]: defined

    [span]{.class style=""}
    *[HTML]: Tooltip for HTML throughout doc

    ![alt-text][id]
    [id]: logo.png  "tooltip"



List of available emojis: [emojis.txt](emojis.txt).

See [Markdown Commonspec](https://spec.commonmark.org/0.29/) for more detail.

# Props

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| anchor-attrs | Object | `{}` | attributes for non-# `a` tags: `target: '_blank'` or `rel: 'nofollow'` |
| disables | Array | `['breaks', 'html']` | Features/plugins to disable (See **Plugins/Features** below)  |
| lang-prefix | String | `language-` | CSS language prefix for highlighted fenced blocks |
| postrender | Function (String) String | `null` | filter function after markdown parse (if non-empty) |
| prerender | Function (String) String, this | `null` | filter function before markdown parse, and/or load plugins (if non-empty)|
| quotes | String | `“”‘’` | use `“”‘’` for Chinese, `„“‚‘` for German, `«»„“` for Russian |
| show | Boolean | `true` | enable render to the default slot automatically |
| source | String | `null` | the markdown source code |
| sub-opts | Object | `{}` | option to pass to each feature using same names as `disables`. |
| table-class | String | `table` | customize html class of the `<table>` |
| toc | Boolean | `false` | enable automatic table of contents |
| toc-first-level | Number | `2` | use `2` if you want to skip `<h1>` from the TOC |
| toc-id | String | `undefined` | the HTML id to render TOC |
| toc-last-level | Number | `'toc-first-level' + 1` | use `5` if you want to skip `<h6>` from the TOC |
| watches | Array | `["source", "show", "toc"]` | HTML refresh automatically when the prop in this array changed |

**Note**: Cause a rerender with `this.source = this.source`

# Events

| Name | Params[Type] | Describe |
| ---- | --------- | -------- |
| rendered | outHtml[String] | dispatch when render finish |
| toc-rendered | tocHtml[String], markdown[String], list[Array] | dispatch when TOC render finish when toc[prop] is `true` |


## Plugins/Features

The plugins/features for `disables` and `subOpts` are:
```
    [
      'abbr', 'attrs', 'collapsible', 'deflist',
      'emoji', 'footnote', 'ins', 'linkify', 'mark', 
      'pandoc', 'spans', 'sub', 'sup', 'tasklist', 'toc',
      // FEATURES
      'breaks', 'html', 'typographer', 'xhtmlout', 
    ]
```

**Note**: xhtmlout feature translates: `<br></br>` => `<br />`.

## SubOpts

Most features accept initialization options via `subOpts`; Following are the defaults:

```
    subOpts = {
        attrs:{
          allowedAttributes:
            ['id', 'class', 'style', 'name', 'width', 'height', 'alt', 'loading', 'title', /^data-.*$/]
        },
        toc: {
          tocClassName:'table-of-contents', anchorLink:true, anchorLinkSymbol:'#',
          anchorLinkSpace:true, anchorLinkBefore:true, anchorClassName: 'toc-anchor',
          anchorLinkSymbolClassName: 'toc-anchor-link'
        }
    }
```

Each can individually be overridden, eg:

```
    :sub-opts="{toc:{anchorLink:false}}"
```

causes only **anchorLink** to change.

# Extending

To dynamically add or override plugins:

```
    <script src="markdown-it-checkbox.js"></script>
    ...
     <vue-markdown-pdq :prerender="prerender" ...
    ...
     methods: {
       prerender(str, that) {
          that.md.use(window.markdownitCheckbox);
          return str;
       }
    ...
```


# Fossil
[Fossil](https://fossil-scm.org) clone the repo with:
```
    mkdir vue-markdown-pdq && cd vue-markdown-pdq
    fossil clone https://dev.pdqi.com/fossil/vue-markdown-pdq vue-markdown-pdq.fossil
    fossil open vue-markdown-pdq.fossil
```


# Credits

> [pdqi](https://github.com/pdqi)
[pcmacdon](https://github.com/pcmacdon)
[markdown-it](https://github.com/markdown-it/markdown-it)
[vue-markdown](https://github.com/miaolz123/vue-markdown)

# License

Copyright (c) 2020 [pdqi](https://github.com/pdqi/vue-markdown-pdq) by [MIT](https://opensource.org/licenses/MIT)

