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
import tasklists from 'markdown-it-task-lists';
import span from 'markdown-it-bracketed-spans';
import pandoc from 'markdown-it-container-pandoc';
import collapse from 'markdown-it-collapsible';
import awesome from 'markdown-it-fontawesome';

export default {
  md: new markdownIt(),

  template: '<div><slot></slot></div>',

  data() {
    return {
      sourceData: this.source,
      features:
        [
          // Features
          'breaks', 'html', 'xhtmlout', 'typographer',
          // Plugins
          'abbr', 'attrs', 'fontawesome', 'collapsible', 'deflist',
          'emoji', 'footnote', 'ins', 'linkify', 'mark', 
          'pandoc', 'spans', 'sub', 'sup', 'tasklist', 'toc',
        ]
    }
  },

  props: {
    watches: {
      type: Array,
      default: () => ['source', 'show', 'toc'],
    },
    disables: {
      type: Array,
      default: () => ['breaks', 'html'],
    },
    source: {
      type: String,
      default: ``,
    },
    show: {
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
    toc: {
      type: Boolean,
      default: false,
    },
    tocId: {
      type: String,
    },
    subOpts: {
      type: Object,
      default: () => ({})
    },
    tocFirstLevel: {
      type: Number,
      default: 2,
    },
    tocLastLevel: {
      type: Number,
    },
    anchorAttrs: {
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
  },

  computed: {
    tocLastLevelComputed() {
      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1
    }
  },
  render(createElement) {
    
    for (let i of this.disables) {
      if (i==='toc') console.warn('not valid in disable', i);
      if (this.features.indexOf(i)<0)
        console.warn('unknown "disables" "'+i+'" not one of: '+this.features.join(', '));
    }
    for (let i in this.subOpts) {
      if (this.features.indexOf(i)<0)
        console.warn('unknown "sub-opts" "'+i+'" not one of: '+this.features.join(', '));
    }
    this.md = new markdownIt();
    if (this.disables.indexOf('sub')<0)
      this.md.use(subscript);
    if (this.disables.indexOf('sup')<0)
      this.md.use(superscript)
    if (this.disables.indexOf('footnote')<0)
      this.md.use(footnote)
    if (this.disables.indexOf('deflist')<0)
      this.md.use(deflist)
    if (this.disables.indexOf('abbr')<0)
      this.md.use(abbreviation)
    if (this.disables.indexOf('ins')<0)
      this.md.use(insert)
    if (this.disables.indexOf('mark')<0)
      this.md.use(mark)
    if (this.disables.indexOf('tasklist')<0)
      this.md.use(tasklists,
        Object.assign({}, { enabled: true }, this.subOpts.tasklist))

    if (this.disables.indexOf('emoji')<0) {
      this.md.use(emoji, this.subOpts.emoji)
    }
    if (this.disables.indexOf('fontawesome')<0) {
      this.md.use(awesome, this.subOpts.awesome)
    }
    if (this.disables.indexOf('pandoc')<0) {
      this.md.use(pandoc, this.subOpts.pandoc)
    }
    if (this.disables.indexOf('attrs')<0) {
      this.md.use(attributes,
        Object.assign({},
          { allowedAttributes: ['id', 'class', 'style', 'name', 'width', 'height', 'alt', 'loading', 'title', /^data-.*$/] },
          this.subOpts.attrs));
    }
    if (this.disables.indexOf('spans')<0) {
        this.md.use(span, this.subOpts.spans)
    }
    if (this.disables.indexOf('collapsible')<0) {
      this.md.use(collapse,  this.subOpts.collapsible)
    }

    this.md.set({
      html: this.disables.indexOf('html')<0,
      xhtmlOut: this.disables.indexOf('xhtmlout')<0,
      breaks: this.disables.indexOf('breaks')<0,
      linkify: this.disables.indexOf('linkify')<0,
      typographer: this.disables.indexOf('typographer')<0,
      langPrefix: this.langPrefix,
      quotes: this.quotes,
    })
    this.md.renderer.rules.table_open = () => `<table class="${this.tableClass}">\n`
    let defaultLinkRenderer = this.md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }
    this.md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      Object.keys(this.anchorAttrs).map((attribute) => {
        let n = tokens[idx];
        if (!n.attrIndex)
          return;
        let hidx = n.attrIndex('href')
        if (hidx<0 || n.attrs[hidx][1][0] === '#') // Skip internal # links.
            return;
        let aIndex = n.attrIndex(attribute)
        let value = this.anchorAttrs[attribute]
        if (aIndex < 0) {
          n.attrPush([attribute, value]) // add new attribute
        } else {
          n.attrs[aIndex][1] = value
        }
      })
      return defaultLinkRenderer(tokens, idx, options, env, self)
    }


    if (this.toc) {
      let ss;
      this.md.use(toc,
        ss = Object.assign({}, {
            tocClassName: 'table-of-contents',
            tocFirstLevel: this.tocFirstLevel,
            tocLastLevel:this.tocLastLevelComputed,
            anchorLink: true,
            anchorLinkSymbol: '#',
            anchorLinkSpace: true,
            anchorLinkBefore: true,
            anchorClassName: 'toc-anchor',
            anchorLinkSymbolClassName: 'toc-anchor-link',
            tocCallback: (tocMarkdown, tocArray, tocHtml) => {
              if (tocHtml) {
                if (this.tocId && document.getElementById(this.tocId)) {
                  document.getElementById(this.tocId).innerHTML = tocHtml
                }

                this.$emit('toc-rendered', tocHtml, tocMarkdown, tocArray)
              }
            }
        }, this.subOpts.toc ));
    }

    let outHtml = this.show &&  this.sourceData != '' ?
      this.md.render(
        this.prerender(this.sourceData, this)
      ) : ''
    if (outHtml != '')
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
      this.sourceData = this.source
      this.$forceUpdate()
    })

    this.watches.forEach((v) => {
      this.$watch(v, () => {
        this.$forceUpdate()
      })
    })
  },
}
