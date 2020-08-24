# vue-markdown-pdq

A powerful and highspeed Markdown Vue 2+ component using
[markdown-it](https://www.npmjs.com/package/markdown-it) and the following plugins:


>[abbr](https://www.npmjs.com/package/markdown-it-abbr "Abbreviations"),
[attrs](https://www.npmjs.com/package/markdown-it-attrs "Attributes for use with spans"),
[collapsible](https://www.npmjs.com/package/markdown-it-collapsible "Collapsible using summary/detail"),
[deflist](https://www.npmjs.com/package/markdown-it-deflist "Definition list"),
[emoji](https://www.npmjs.com/package/markdown-it-emoji "Emoji support"),
[fontawesome ](https://www.npmjs.com/package/markdown-it-fontawesome "Font Awesome"),
[footnote](https://www.npmjs.com/package/markdown-it-footnote "Footnotes"),
[insert](https://www.npmjs.com/package/markdown-it-ins "Insert tag"),
[katex](https://www.npmjs.com/package/markdown-it-katexx "Katex math library"),
[mark](https://www.npmjs.com/package/markdown-it-mark "Mark tag"),
[pandoc](https://www.npmjs.com/package/markdown-it-pandoc "Pandoc styled blocks"),
[spans](https://github.com/mb21/markdown-it-bracketed-spans "Spans for use with attrs"),
[sub](https://www.npmjs.com/package/markdown-it-sub "Subscripts"),
[sup](https://www.npmjs.com/package/markdown-it-sup "Superscripts"),
[tasklist](https://www.npmjs.com/package/markdown-it-task-lists "Task lists"),
[toc](https://www.npmjs.com/package/markdown-it-toc-and-anchor "Table of contents")


- **katex** requires [katex-css](https://unpkg.com/katex/dist/katex.min.css).
- **fontawesome** requires [fontawesome-css](https://use.fontawesome.com/releases/v5.5.0/css/all.css)
- Syntax highlighting is provided by [Prism](https://prismjs.com)

# Download


Download from [Github repo](https://github.com/pdqi/vue-markdown-pdq) /
[PDQI home-page](https://dev.pdqi.com/fossil/vue-markdown-pdq)
and look in directory **dist**, or from command-line:

> **wget** [https://dev.pdqi.com/lib/vue-markdown-pdq.js](https://dev.pdqi.com/lib/vue-markdown-pdq.js)

*(hint: or click Save-As)* 


# Demo

- [Online](https://jsish.org/fossil/vue-markdown-pdq/doc/ckout/example/demo.html): interactive and editable.
- [Source](./example/demo.html?mimetype=text/plain): source for the demo.
- [Local](./example/demo.html): run demo from a [fossil](https://fossil-scm.org) repo/checkout.

# Example

A [simple](https://jsish.org/fossil/vue-markdown-pdq/doc/ckout/example/simple.html) working example:

```
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@2.1.8/dist/vue.min.js"></script>
  <script src="https://dev.pdqi.com/lib/vue-markdown-pdq.js"></script>
</head>
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
# Props

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| anchor-attributes | Object | `{}` | attributes for non-# `a` tags: `target: '_blank'` or `rel: 'nofollow'` |
| disables | Array | `[]` | Features/plugins to disable (See **Feature/Plugin Names** below)  |
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

**Note**: Trigger a rerender: `this.source = this.source`

## Feature/Plugin Names

Feature names for `disables` and `subOpts`:
```
    [
      // Features
      'breaks', 'html', 'xhtmlout', 'typographer',
      // Plugins
      'abbr', 'attrs', 'fontawesome', 'collapsible', 'deflist',
      'emoji', 'footnote', 'ins', 'katex', 'linkify', 'mark', 
      'pandoc', 'spans', 'sub', 'sup', 'tasklist', 'toc',
    ]
```

**Note**: xhtmlout feature translates: `<br></br>` => `<br />`.

## subOpts

Some features accept initialization options in `subOpts`.  Following are the defaults;
each can individually be overridden.

```
subOpts = {
    katex: { "throwOnError": false, "errorColor": " #cc0000" },
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

Refer to each packages docs for option details. 

# Events

| Name | Params[Type] | Describe |
| ---- | --------- | -------- |
| rendered | outHtml[String] | dispatch when render finish |
| toc-rendered | tocHtml[String], markdown[String], list[Array] | dispatch when TOC render finish when toc[prop] is `true` |

# Plugins

Other Plugins can added dynamically:

```
<script src="markdown-it-icons.js"></script>
...
 <vue-markdown-pdq :prerender="prerender" ...
...
 methods: {
   prerender(str, that) {
      that.md.use(window.markdownitCheckbox);
      return str;
   }
```

# Fossil users
```
mkdir vue-markdown-pdq && cd vue-markdown-pdq
fossil clone https://jsish.org/fossil/vue-markdown-pdq vue-markdown-pdq.fossil
fossil open vue-markdown-pdq.fossil
```

# Thanks

- [vue-markdown](https://github.com/miaolz123/vue-markdown)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [miaolz123](https://github.com/miaolz123)
- [transtone](https://github.com/transtone)
- [**brandonferens**](https://github.com/brandonferens)

# Contributions

- [pcmacdon](https://github.com/pcmacdon)
- [6etacat](https://github.com/6etacat)
- [miaolz123](https://github.com/miaolz123)
- [brandonferens](https://github.com/brandonferens)
- [brianbancroft](https://github.com/brianbancroft)
- [nikolasp](https://github.com/nikolasp)
- [mbackonja](https://github.com/mbackonja)
- [Endi1](https://github.com/Endi1)
- [printscreen](https://github.com/printscreen)
- [killix](https://github.com/killix)
- [LeFnord](https://github.com/lefnord)
- [FlorianWendelborn](https://github.com/FlorianWendelborn)

# License

Copyright (c) 2020 [pdqi](https://github.com/pdqi/vue-markdown-pdq) by [MIT](https://opensource.org/licenses/MIT)

Refactored from [miaolz123](https://github.com/miaolz123)'s [vue-markdown](https://github.com/miaolz123/vue-markdown) which seems to have gone dormant. 
