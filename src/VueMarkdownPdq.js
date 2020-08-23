import markdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import attributes from 'markdown-it-attrs';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import toc from 'markdown-it-toc-and-anchor';
import katex from 'markdown-it-katexx';
import tasklists from 'markdown-it-task-lists';
import span from 'markdown-it-bracketed-spans';
import pandoc from 'markdown-it-container-pandoc';
import collapse from 'markdown-it-collapsible';

export default {
  md: new markdownIt(),

  template: '<div><slot></slot></div>',

  data() {
    return {
      sourceData: this.source,
    }
  },

  props: {
    watches: {
      type: Array,
      default: () => ['source', 'show', 'toc'],
    },
    source: {
      type: String,
      default: ``,
    },
    disable: {
    },
    show: {
      type: Boolean,
      default: true,
    },
    highlight: {
      type: Boolean,
      default: true
    },
    html: {
      type: Boolean,
      default: true,
    },
    xhtmlOut: {
      type: Boolean,
      default: true,
    },
    breaks: {
      type: Boolean,
      default: true,
    },
    linkify: {
      type: Boolean,
      default: true,
    },
    emoji: {
      type: Boolean,
      default: true,
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    katex: {
      type: Boolean,
      default: true,
    },
    pandoc: {
      type: Boolean,
      default: true,
    },
    attrs: {
      type: Boolean,
      default: true,
    },
    attrOpts: {
      type: Object,
      default: () => ({ allowedAttributes: ['id', 'class', 'style', 'name', 'width', 'height', 'alt', 'loading', 'title', /^data-.*$/] })
    },
    typographer: {
      type: Boolean,
      default: true,
    },
    langPrefix: {
      type: String,
      default: 'language-',
    },
    quotes: {
      type: String,
      default: '“”‘’',
    },
    tableClass: {
      type: String,
      default: 'table',
    },
    taskLists: {
      type: Boolean,
      default: true,
    },
    toc: {
      type: Boolean,
      default: false,
    },
    tocId: {
      type: String,
    },
    tocClass: {
      type: String,
      default: 'table-of-contents',
    },
    tocFirstLevel: {
      type: Number,
      default: 2,
    },
    tocLastLevel: {
      type: Number,
    },
    tocAnchorLink: {
      type: Boolean,
      default: true,
    },
    tocAnchorClass: {
      type: String,
      default: 'toc-anchor',
    },
    tocAnchorLinkSymbol: {
      type: String,
      default: '#',
    },
    tocAnchorLinkSpace: {
      type: Boolean,
      default: true,
    },
    tocAnchorLinkClass: {
      type: String,
      default: 'toc-anchor-link',
    },
    tocAnchorBefore: {
      type: Boolean,
      default: true
    },
    anchorAttributes: {
      type: Object,
      default: () => ({})
    },
    prerender: {
      type: Function,
      default: (sourceData) => { return sourceData }
    },
    postrender: {
      type: Function,
      default: (htmlData) => { return htmlData }
    },
    slugify: {
      type: Function,
      default: null
    },
  },

  computed: {
    tocLastLevelComputed() {
      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1
    }
  },

  render(createElement) {
    this.md = new markdownIt()
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
      .use(tasklists, { enabled: this.taskLists })

    if (this.katex) {
      this.md.use(katex, { "throwOnError": false, "errorColor": " #cc0000" })
    }
    if (this.emoji) {
      this.md.use(emoji)
    }
    if (this.pandoc) {
      this.md.use(pandoc)
    }
    if (this.attrs) {
      this.md.use(attributes, this.attrOpts)
      this.md.use(span)
    }
    if (this.collapsible) {
      this.md.use(collapse)
    }

    this.md.set({
      html: this.html,
      xhtmlOut: this.xhtmlOut,
      breaks: this.breaks,
      linkify: this.linkify,
      typographer: this.typographer,
      langPrefix: this.langPrefix,
      quotes: this.quotes,
    })
    this.md.renderer.rules.table_open = () => `<table class="${this.tableClass}">\n`
    let defaultLinkRenderer = this.md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }
    this.md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      Object.keys(this.anchorAttributes).map((attribute) => {
        let n = tokens[idx];
        if (!n.attrIndex)
          return;
        let hidx = n.attrIndex('href')
        if (hidx<0 || n.attrs[hidx][1][0] === '#') // Skip internal # links.
            return;
        let aIndex = n.attrIndex(attribute)
        let value = this.anchorAttributes[attribute]
        if (aIndex < 0) {
          n.attrPush([attribute, value]) // add new attribute
        } else {
          n.attrs[aIndex][1] = value
        }
      })
      return defaultLinkRenderer(tokens, idx, options, env, self)
    }

    if (this.toc) {
      this.md.use(toc, {
        tocClassName: this.tocClass,
        tocFirstLevel: this.tocFirstLevel,
        tocLastLevel: this.tocLastLevelComputed,
        anchorLink: this.tocAnchorLink,
        anchorLinkSymbol: this.tocAnchorLinkSymbol,
        anchorLinkSpace: this.tocAnchorLinkSpace,
        anchorLinkBefore: this.tocAnchorBefore,
        anchorClassName: this.tocAnchorClass,
        anchorLinkSymbolClassName: this.tocAnchorLinkClass,
        slugify: this.slugify,
        tocCallback: (tocMarkdown, tocArray, tocHtml) => {
              if (tocHtml) {
                if (this.tocId && document.getElementById(this.tocId)) {
                  document.getElementById(this.tocId).innerHTML = tocHtml
                }

                this.$emit('toc-rendered', tocHtml, tocMarkdown, tocArray)
              }
            }
       })
    }

    let outHtml = this.show ?
      this.md.render(
        this.prerender(this.sourceData)
      ) : ''
    outHtml = this.postrender(outHtml);

    this.$emit('rendered', outHtml)
    return createElement(
      'div', {
        domProps: {
          innerHTML: outHtml,
        },
      },
    )
  },

  beforeMount() {
    if (this.$slots.default) {
      this.sourceData = ''
      for (let slot of this.$slots.default) {
        this.sourceData += slot.text
      }
    }

    this.$watch('source', () => {
      this.sourceData = this.prerender(this.source)
      this.$forceUpdate()
    })

    this.watches.forEach((v) => {
      this.$watch(v, () => {
        this.$forceUpdate()
      })
    })
  },
}
