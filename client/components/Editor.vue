<template>
  <div id="editor-global-container">
    <div id="editor-panel">
      <div id="editorId"></div>
      <div id="console">
        > Les résultats s'afficherons ici !
      </div>
    </div>
    <div id="exo-panel">
      <div id="exo-langage" v-bind:langage="editorOptions.lang">
        {{ editorOptions.lang }}
      </div>
      <div id="exo-content">
        <input type="checkbox" id="scales" name="scales">
        <label for="scales">EXO BOUCLE WHILE</label>
        <p>
            Le PGCD ?
            Nombre mystère
            Améliorer la calculatrice pour qu'elle fasse des calculs tant que vous ne choisissez pas de sortir
        </p>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: {

  },
  data () {
    return {
      editor: Object,
      editorOptions: {
        beforeContent: '',
        content: "println('coucou les amis')",
        editorId: "editorId",
        lang: "c_cpp",
        theme: "twilight"
      },
      exercice: {
        id: -1,
        content: {
          title: "Coucou les amis"
        },
        creator: -1
      }
    }
  },
  watch: {
    content: function(value) {
    	if (this.editorOptions.beforeContent !== value) {
      	this.editor.setValue(value, 1)
      }
    }
  },
  mounted () {
  	this.editor = window.ace.edit(this.editorOptions.editorId)
    this.editor.setValue(this.editorOptions.content, 1)
    this.editor.getSession().setMode(`ace/mode/${this.editorOptions.lang}`)
    this.editor.setTheme(`ace/theme/${this.editorOptions.theme}`)
    this.editor.on('change', () => {
      this.editorOptions.beforeContent = this.editor.getValue()
      this.$emit('change-content', this.editor.getValue())
    })

    this.$emit('me');
  },
  methods: {

  }
}
</script>
