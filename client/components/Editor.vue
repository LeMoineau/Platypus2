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
      <div id="exo-langage" v-bind:langage="editorOptions.lang">
        {{ editorOptions.lang }}
      </div>
      <div id="exo-content">
        <input type="checkbox" id="scales" name="scales">
        <label for="scales">Les variables</label>
        <p>
          Cours : <br>
            C’est bien beau de vouloir afficher du texte mais parfois il vous faudra afficher des variables. Tout d’abord, qu’est-ce qu’une variable ? On peut assimiler une variable à une boîte qui contient une valeur, cela peut être un nombre, un texte, un caractère, … Selon ce que la variable contient, son type va changer. Par exemple une variable qui contient 4 sera un entier, autrement, une variable qui contient « Test » sera une chaine de caractères (Il existe plein d’autres types de variables !). Il est possible de les afficher avec la fonction que l’on a vu précédemment, c’est-à-dire, le print(). Mais avant cela, il faut savoir créer une variable, pour cela il vous faut trouver un nom à celle-ci puis lui affecter une valeur. Si nous voulons mettre notre âge dans la variable age, il faudra faire : age = 20. Nous avons parlé plus haut des différents types, la création de variables change légèrement selon ce que vous voulez créer. Pour un entier : variable = 3, pour un caractère variable = ‘c’, et pour une chaîne de caractère : variable = « Hello World! ».
          <br>Remarque : <br>
            Tous les langages de programmation sont soumis à des conventions concernant la manière de nommées ses variables. En python, un nom de variable doit forcément commencer par une lettre, il est ensuite possible de mettre des majuscules, des minuscules, des chiffres et même des accents (même s’il est recommandé de ne pas en utiliser) ! Si vous voulez créer une variable qui contient votre âge, vous avez deux choix : soit vous utilisez le snake_case, vous devez séparer les mots  par un « _ » ce qui donnerait mon_age ; soit vous utilisez le CamelCase, vous marquez la séparation par une majuscule ce qui donnerait monAge.
            Maintenant que nous avons créé notre variable age il faut l’afficher dans la console. Dans la fonction print() vous pouvez mettre la variable age et elle sera afficher dans votre console : print(age)
          <br>Sujet :<br>
            Vous allez devoir créer une variable nommé var qui doit contenir le chiffre 10 puis l’afficher. (Vérification création variable).

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
