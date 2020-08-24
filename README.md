# vue-markdown-pdq

> This package does not support `vue1.X.X`.

A powerful and highspeed Markdown component for Vue.

Refactored from [miaolz123](https://github.com/miaolz123)'s [vue-markdown](https://github.com/miaolz123/vue-markdown) which seems to have gone dormant. 

# Source

- [Demo Page](https://jsish.org/fossil/vue-markdown-pdq/doc/ckout/example/demo.html) or [Local](./example/demo.html) for fossil.
- [Source](https://jsish.org/fossil/vue-markdown-pdq)
- [Github](https://github.com/pdqi/vue-markdown-pdq)

Quick start: `<vue-markdown-pdq>A ~~Simple~~ **test**.</vue-markdown-pdq>`

Supported Markdown Features:

* [x] [markdown-it](https://www.npmjs.com/package/markdown-it)
* [x] [table of contents](https://www.npmjs.com/package/markdown-it-toc-and-anchor)
* [x] [definition list](https://www.npmjs.com/package/markdown-it-deflist)
* [x] [superscript](https://www.npmjs.com/package/markdown-it-sup)
* [x] [subscript](https://www.npmjs.com/package/markdown-it-sub)
* [x] [footnote](https://www.npmjs.com/package/markdown-it-footnote)
* [x] [insert](https://www.npmjs.com/package/markdown-it-ins)
* [x] [mark](https://www.npmjs.com/package/markdown-it-mark)
* [x] [task list](https://www.npmjs.com/package/markdown-it-task-lists)
* [x] [abbreviation](https://www.npmjs.com/package/markdown-it-abbr)
* [x] [attributes](https://www.npmjs.com/package/markdown-it-attrs)
* [x] [bracketed-spans](https://github.com/mb21/markdown-it-bracketed-spans)
* [x] [emoji](https://www.npmjs.com/package/markdown-it-emoji)
* [x] [collapsible](https://www.npmjs.com/package/markdown-it-collapsible)
* [x] [pandoc](https://www.npmjs.com/package/markdown-it-pandoc)
* [x] [`*`font-awesome ](https://www.npmjs.com/package/markdown-it-fontawesome)
* [x] [`*`katex](https://www.npmjs.com/package/markdown-it-katexx)

**Syntax Highlight** is provided by [Prism](https://prismjs.com)

`*katex` needs [katex css](https://unpkg.com/katex/dist/katex.min.css).

`*awesome` needs [font-awesome](https://use.fontawesome.com/releases/v5.5.0/css/all.css)

# Installation

### Browser globals

> The **dist** folder contains `vue-markdown-pdq.js` with the component exported in the `window.VueMarkdownPdq` object.

```html
<body>
  <vue-markdown-pdq>i am a ~~tast~~ **test**.</vue-markdown-pdq>
</body>
<script src="path/to/vue.js"></script>
<script src="path/to/vue-markdown-pdq.js"></script>
<script>
    Vue.use(VueMarkdownPdq);
    var vm = new Vue({
        el: "body"
    });
</script>
```

# Slots

```html
<vue-markdown-pdq>this is the default slot</vue-markdown-pdq>
```

After setting up the middleware in your vue component above, using the embedded markdown is as easy as writing it between the `vue-markdown-pdq` tags.

VueMarkdown has a default slot which is used to write the `markdown` source.

TIP: The default slot only renders **once** at the beginning, and it will overwrite the prop of `source`!

# Props

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| anchor-attributes | Object | `{}` | attributes for non-# `a` tags: `target: '_blank'` or `rel: 'nofollow'` |
| disables | Array | `[]` | Features to disable (See **Feature Names** below)  |
| lang-prefix | String | `language-` | CSS language prefix for highlighted fenced blocks |
| postrender | Function (String) String | `null` | filter function after markdown parse |
| prerender | Function (String) String | `null` | filter function before markdown parse |
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

**Note**: xhtmlout feature translates: `<br></br>` => `<br />`.
**Note2**: force a rerender  with `this.source = this.source`.

## Feature Names

Feature names for `disables` and `subOpts` are:
```
    [ "abbr", "attrs", "awesome", "breaks", "collapsible", "deflist",
      "emoji", "footnote", "html", "ins", "katex", "linkify", "mark", 
      "pandoc", "spans", "sub", "sup", "tasklist", "typographer", 
      "xhtmlout"
    ]
```

## subOpts

Some features accept initialization options in `subOpts`, with the following defaults:

### subOpts['attrs']
``` js
{allowedAttributes:['id', 'class', 'style', 'name', 'width', 'height', 'alt', 'loading', 'title', /^data-.*$/]}
```

### subOpts['katex']
``` js
{ "throwOnError": false, "errorColor": " #cc0000" }
```

### subOpts['toc']
``` js
{
  tocClassName:'table-of-contents', anchorLink:true, anchorLinkSymbol:'#',
  anchorLinkSpace:true, anchorLinkBefore:true, anchorClassName: 'toc-anchor',
  anchorLinkSymbolClassName: 'toc-anchor-link'
}
```

See docs for each package. 

## tocOpts

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| toc-anchor-class | String | `toc-anchor` | customize the anchor class name |
| toc-anchor-link-before | Boolean | `true` | place anchor link before heading text |
| toc-anchor-link | Boolean | `true` | enable the automatic anchor link in the headings |
| toc-anchor-link-class | String | `toc-anchor-link` | customize the anchor link symbol class name |
| toc-anchor-link-space | Boolean | `true` | enable inserting a space between the anchor link and heading |
| toc-anchor-link-symbol | String | `#` | customize the anchor link symbol |
| toc-class | String | `table` | customize html class of the `<ul>` wrapping the TOC |

# Events

| Name | Params[Type] | Describe |
| ---- | --------- | -------- |
| rendered | outHtml[String] | dispatch when render finish |
| toc-rendered | tocHtml[String], markdown[String], list[Array] | dispatch when TOC render finish, never dispatch if the toc[prop] is `false` |

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

Copyright (c) 2020 [pcmacdon](https://github.com/pdqi/vue-markdown-pdq) by [MIT](https://opensource.org/licenses/MIT)
