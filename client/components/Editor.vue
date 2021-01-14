<template>
  <div id="editor-global-container">
    <div id="editor-panel">
      <!--<div id="editorId"></div>
      <div id="console">
        > Les résultats s'afficherons ici !
      </div>-->
      <iframe height="957px" width="100%" src="https://repl.it/@2000IQ1/GrumpySpringgreenSoftwaresuite?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
    </div>
    <div id="exo-panel">
      <div id="exo-langage" v-bind:langage="exercice.langage">
        {{ exercice.langage }}
      </div>
      <div id="exo-content">
        <div v-for="(item , indice) in exercice.content" :key="indice" :class="'exo-content-' + item.type">
          {{ item.content }}
        </div>
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
        lang: "python",
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
    /*
  	this.editor = window.ace.edit(this.editorOptions.editorId)
    this.editor.setValue(this.editorOptions.content, 1)
    this.editor.getSession().setMode(`ace/mode/${this.editorOptions.lang}`)
    this.editor.setTheme(`ace/theme/${this.editorOptions.theme}`)
    this.editor.on('change', () => {
      this.editorOptions.beforeContent = this.editor.getValue()
      this.$emit('change-content', this.editor.getValue())
    })*/

    this.$emit('me');
    this.$emit('getexercice', this.$route.query.exercice, (result) => {

      if (result.status > 0) {
          this.exercice = result.exercice;
          this.exercice.content = this.exercice.content.content;
      }

    });
  },
  methods: {

  }
}
</script>
