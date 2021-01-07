<template>
  <div>
    <form id="exercice-creator-global-container" v-on:submit.prevent="createExercice()">
      <div id="exercice-creator-header-bar">
        <input type="text" id="exercice-creator-title" placeholder="Titre de l'exercice" v-model="title" required>
        <div class="flex-line">
          <input type="checkbox" id="exercice-creator-anonym" v-model="anonym" value="Exercice anonyme" name="anonym">
          <input type="range" id="exercice-creator-difficulty" min="0" max="5" v-model="difficulty">
          <select id="exercice-creator-langage" v-model="langage" value="python">
            <option value="python">python</option>
            <option value="javascript">javascript</option>
            <option value="c_cpp">C / C++</option>
          </select>
        </div>
      </div>
      <hr class="profil-separator">
      <table id="exercice-creator-table" cellspacing="20px" border="0">
        <tbody>
          <tbody v-for="(component, indice) in lines" ref="lines" :key="indice" :is="component"/>
          </tbody>
        </tbody>
      </table>
      <div id="exercice-creator-valid-bar">
        <div id="exercice-creator-add-line-button" class="exercice-creator-valid-button" @click="addLine()">
          Ajouter une ligne
        </div>
        <div id="exercice-creator-remove-line-button" class="exercice-creator-valid-button" @click="removeLine()">
          Supprimer une ligne
        </div>
        <input type="submit" id="exercice-creator-validation-button" class="exercice-creator-valid-button" value="Créer l'exercice !">
      </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {
    user: { type: Object, default: () => {
        return {
          prenom: "pierrot",
          nom: "le ouf",
          login: "c'est un mystere",
          perm: 0,
          icon: "https://images-na.ssl-images-amazon.com/images/I/51CDY-aeXvL._SX486_BO1,204,203,200_.jpg"
        }
      }
    }
  },
  data () {
    return {
      title: "",
      anonym: true,
      difficulty: 0,
      langage: "python",
      lines: ["exercice-creator-line"],
      message: "",
      messagetype: "",
    }
  },
  mounted() {
    this.user = this.$parent.user
  },
  methods: {
    addLine() {
      this.lines.push("exercice-creator-line");
    },
    removeLine() {
      if (this.lines.length > 1) {
        this.lines.pop();
      }
    },
    createExercice() {
      let lines = [];
      for (let line of this.$refs.lines) {
        lines.push({
          type: line.type,
          content: line.content
        });
      }
      this.$parent.$emit('createxercice', {
        title: this.title,
        anonym: this.anonym,
        difficulty: this.difficulty,
        langage: this.langage,
        lines: lines
      }, (result) => {

        console.log(result);

      })
    }
  }
}
</script>
