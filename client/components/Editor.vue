<template>
  <div class="main" style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
    <div style="display: flex; flex-direction: column; width: 50%; height: 100%;">
      <div id="editorId" style="width: 100%; height: 70%;"></div>
      <div id="console" style="width: 100%; height: 30%; background-color: black;">

      </div>
    </div>
    <div id="exo-panel" style="width: 50%; height: 100%; background-color: #ecf0f1">
      <div class="sujet">
                <h3>EXERCICES :</h3>

                <div>
                    <input type="checkbox" id="scales" name="scales">
                    <label for="scales">Print Hello World</label>
                    <p>
                        Affectation var => print var
                        Saisie nom + prenom + age => print le tout "Bonjour 'prénom' 'nom', tu as 'age' ans"
                    </p>
                </div>
                <div>
                    <input type="checkbox" id="scales" name="scales">
                    <label for="scales">EXO BOUCLE FOR</label>
                    <p>
                        Afficher les i premières puissances de n (i et n saisie)
                        La suite de fibonacci (cf internet pour expliquer la suite)
                    </p>
                </div>
                <div>
                    <input type="checkbox" id="scales" name="scale">
                    <label for="scales">EXO IF</label>
                    <p>
                        Afficher les nombres pair de 0 à n
                        Saisie a + b => afficher si a < b ou a > b ou a == b
                        Saisie prenom + age => condition age < 10 print "enfant" ; 10 < age < 18 print "ado" ; 18 < age < 60 print "adulte" ; 60 < age print "retraité"
                        Faire une calculatrice : Menu pour choisir entre les opérations puis saisir les valeurs puis afficher le résultat
                        + Afficher une erreur si la catégorie choisit dans le menu n'existe pas
                    </p>
                </div>
                <div>
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
  </div>
</template>
<script>
module.exports = {
  props: {

  },
  data () {
    return {
      editor: Object,
      beforeContent: '',
      content: "println('coucou les amis')",
      editorId: "editorId",
      lang: "python",
      theme: "twilight"
    }
  },
  watch: {
    content: function(value) {
    	if (this.beforeContent !== value) {
      	this.editor.setValue(value, 1)
      }
    }
  },
  mounted () {
    	const lang = this.lang || 'python'
      const theme = this.theme || 'twilight'

  		this.editor = window.ace.edit(this.editorId)
      this.editor.setValue(this.content, 1)

      this.editor.getSession().setMode(`ace/mode/${lang}`)
      this.editor.setTheme(`ace/theme/${theme}`)

      this.editor.on('change', () => {
    	this.beforeContent = this.editor.getValue()
      this.$emit('change-content', this.editor.getValue())
    })
  },
  methods: {
        login(email,password){
            this.$emit("login",email, password)
        }
    }
}
</script>
