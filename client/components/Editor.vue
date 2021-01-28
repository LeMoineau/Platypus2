<template>
  <div id="editor-global-container">
    <div id="editor-panel">
      <div id="editorId"></div>
      <div id="console"> > Les résultats s'afficherons ici ! </div>
      <button id="editor-run-button" @click="runCode()">
        ▶
      </button>
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
        content: "print('Just do it!')",
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
      },
      baseContentForLangage: [
        {lang: "javascript", content: "console.log('Just do it!')"},
        {lang: "c_cpp", content: '#include <iostream>\nint main(void) {\n\n  std::cout << "Hello, C++ World!" << std::endl;\n\n}'},
        {lang: "python", content: "print('Just do it!')"}
      ]
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
    this.$emit('getexercice', this.$route.query.exercice, (result) => {

      if (result.status > 0) {
          this.exercice = result.exercice;
          this.exercice.content = this.exercice.content.content;
          this.editorOptions.lang = this.exercice.langage;
          this.editor.getSession().setMode(`ace/mode/${this.editorOptions.lang}`);
          this.editor.setValue(this.baseContentForLangage.find(c => c.lang === this.exercice.langage).content)
      }

    });
  },
  methods: {
    runCode() {
      let runButton = document.querySelector("#editor-run-button");
      let consol = document.querySelector("#console");
      if (runButton.textContent.includes("▶")) {
        let codeInfos = {
          code: this.editor.getValue(),
          lang: this.editorOptions.lang
        }
        if (codeInfos.lang === "c_cpp") {
          codeInfos.lang = "cpp";
        }
        runButton.textContent = "●";
        let intervalId = setInterval(function () {
          if (runButton.textContent.length >= 3) {
            runButton.textContent = "●";
          } else {
            runButton.textContent += "●";
          }
        }, 500);
        this.$emit('runcode', codeInfos, (result) => {
          clearInterval(intervalId);
          runButton.textContent = "▶";
          if (result.result !== null) {
            consol.textContent += "\n > " + removeLastNewLine(result.result);
          }
          if (result.error !== null && result.error !== '') {
            consol.textContent += '\n' + removeLastNewLine(result.error);
          }
        });
      }
    }
  }
}
</script>
