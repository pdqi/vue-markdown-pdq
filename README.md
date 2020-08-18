# vue-markdown-it

> This package does not support `vue1.X.X`.

A powerful and highspeed Markdown component for Vue.

An updated / extended version [miaolz123](https://github.com/miaolz123)'s [vue-markdown](https://github.com/miaolz123/vue-markdown) which seems to have dormant. 

Quick start: `<vue-markdown-it>i am a ~~tast~~ **test**.</vue-markdown-it>`

Supported Markdown Syntax:

* [x] automatic table of contents
* [x] table & class customize
* [x] *SyntaxHighlighter
* [x] definition list
* [x] strikethrough
* [x] GFM task list
* [x] abbreviation
* [x] custom attributes (class, id, etc.)
* [x] superscript
* [x] subscript
* [x] footnote
* [x] insert
* [x] *katex
* [x] emoji
* [x] mark
* [x] collapsible
* [x] alerts

`*SyntaxHighlighter` work with [Prism](https://prismjs.com)

`*katex` is disabled by default, and needs [katex css](https://unpkg.com/katex/dist/katex.min.css).

# Example

[Live Demo](https://jsish.org/vue-markdown-it/demo)

# Installation

### Browser globals

> The **dist** folder contains `vue-markdown.js` with the component exported in the `window.VueMarkdownIt` object.

```html
<body>
  <vue-markdown-it>i am a ~~tast~~ **test**.</vue-markdown-it>
</body>
<script src="path/to/vue.js"></script>
<script src="path/to/vue-markdown-it.js"></script>
<script>
    Vue.use(VueMarkdownIt);
    var vm = new Vue({
        el: "body"
    });
</script>
```

# Slots

```html
<vue-markdown-it>this is the default slot</vue-markdown-it>
```

After setting up the middleware in your vue component above, using the embedded markdown is as easy as writing it between the `vue-markdown-it` tags.

VueMarkdown has a default slot which is used to write the `markdown` source.

TIP: The default slot only renders **once** at the beginning, and it will overwrite the prop of `source`!

# Props

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| watches | Array | `["source", "show", "toc"]` | HTML refresh automatically when the prop in this array changed |
| source | String | `null` | the markdown source code |
| show | Boolean | `true` | enable render to the default slot automatically |
| html | Boolean | `true` | enable HTML syntax in source |
| xhtml-out | Boolean | `true` | `<br></br>` => `<br />` |
| breaks | Boolean | `true` | `\n` => `<br>` |
| linkify | Boolean | `true` | autoconvert URL-like text to link |
| emoji | Boolean | `true` | `:)` => `😃` |
| katex | Boolean | `false` | latex math support |
| attrs | Boolean | `true` | enable attrs/spans support |
| attrOpts | Object | `{allowedAttributes: ['id', 'class', 'name', /^data-.*$/]}` | options for attrs |
| typographer | Boolean | `true` | enable some language-neutral replacement and quotes beautification |
| collapsible | Boolean | `true` | enable collapsibles |
| lang-prefix | String | `language-` | CSS language prefix for fenced blocks |
| quotes | String | `“”‘’` | use `“”‘’` for Chinese, `„“‚‘` for German, `«»„“` for Russian |
| table-class | String | `table` | customize html class of the `<table>` |
| task-lists | Boolean | `true` | enable GFM task list |
| toc | Boolean | `false` | enable automatic table of contents |
| toc-id | String | `undefined` | the HTML id to render TOC |
| toc-class | String | `table` | customize html class of the `<ul>` wrapping the TOC |
| toc-first-level | Number | `2` | use `2` if you want to skip `<h1>` from the TOC |
| toc-last-level | Number | `'toc-first-level' + 1` | use `5` if you want to skip `<h6>` from the TOC |
| toc-anchor-link | Boolean | `true` | enable the automatic anchor link in the headings |
| toc-anchor-class | String | `toc-anchor` | customize the anchor class name |
| toc-anchor-link-symbol | String | `#` | customize the anchor link symbol |
| toc-anchor-link-space | Boolean | `true` | enable inserting a space between the anchor link and heading |
| toc-anchor-link-class | String | `toc-anchor-link` | customize the anchor link symbol class name |
| toc-anchor-link-before | Boolean | `true` | place anchor link before heading text |
| anchorAttributes | Object | `{}` | anchor tag attributes such as `target: '_blank'` or `rel: 'nofollow'` |
| prerender | Function (String) String | `null` | filter function before markdown parse |
| postrender | Function (String) String | `null` | filter function after markdown parse |

# Events

| Name | Param[Type] | Describe |
| ---- | --------- | -------- |
| rendered | outHtml[String] | dispatch when render finish |
| toc-rendered | tocHtml[String] | dispatch when TOC render finish, never dispatch if the toc[prop] is `false` |

# Thanks

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [miaolz123](https://github.com/miaolz123)
- [transtone](https://github.com/transtone)
- [**brandonferens**](https://github.com/brandonferens)

# Contributions

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

Copyright (c) 2020 [pmacdona](https://jsish.org/vue-markdown-it) by [MIT](https://opensource.org/licenses/MIT)
