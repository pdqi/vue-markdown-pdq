# vue-markdown-pdq

A powerful and highspeed Markdown Vue 2+ component using
[markdown-it](https://www.npmjs.com/package/markdown-it) and the following plugins:


> [toc&anchor](https://www.npmjs.com/package/markdown-it-toc-and-anchor),
[superscript](https://www.npmjs.com/package/markdown-it-sup),
[subscript](https://www.npmjs.com/package/markdown-it-sub),
[footnote](https://www.npmjs.com/package/markdown-it-footnote),
[insert](https://www.npmjs.com/package/markdown-it-ins),
[mark](https://www.npmjs.com/package/markdown-it-mark),
[definition list](https://www.npmjs.com/package/markdown-it-deflist),
[task list](https://www.npmjs.com/package/markdown-it-task-lists),
>
> [emoji](https://www.npmjs.com/package/markdown-it-emoji),
[font-awesome ](https://www.npmjs.com/package/markdown-it-fontawesome),
[abbreviation](https://www.npmjs.com/package/markdown-it-abbr),
[attributes](https://www.npmjs.com/package/markdown-it-attrs),
[bracketed-spans](https://github.com/mb21/markdown-it-bracketed-spans),
[collapsible](https://www.npmjs.com/package/markdown-it-collapsible),
[pandoc](https://www.npmjs.com/package/markdown-it-pandoc),
[katex](https://www.npmjs.com/package/markdown-it-katexx)

- `katex` requires [katex css](https://unpkg.com/katex/dist/katex.min.css).
- `font-awesome` requires [font-awesome](https://use.fontawesome.com/releases/v5.5.0/css/all.css)
- Syntax highlighting is provided by [Prism](https://prismjs.com)

# Download

- [Jsish](https://jsish.org/fossil/vue-markdown-pdq)
- [Github](https://github.com/pdqi/vue-markdown-pdq)

The **dist** folder contains `vue-markdown-pdq.js`.


# Examples

- [Demo](./example/demo.html?mimetype=text/plain): the source.
- [Online](https://jsish.org/fossil/vue-markdown-pdq/doc/ckout/example/demo.html)
- [Local](./example/demo.html): if you're using [fossil](https://fossil-scm.org).

# Quick Start

This is a [simple](https://jsish.org/fossil/vue-markdown-pdq/doc/ckout/example/simple.html) working example:

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

**Note2**: rerender using `this.source = this.source`.

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

Refer to each packages docs for others options. 

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

Copyright (c) 2020 [pdqi](https://github.com/pdqi/vue-markdown-pdq) by [MIT](https://opensource.org/licenses/MIT)

Refactored from [miaolz123](https://github.com/miaolz123)'s [vue-markdown](https://github.com/miaolz123/vue-markdown) which seems to have gone dormant. 
