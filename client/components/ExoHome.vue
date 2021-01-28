<template>
  <div id="exo-home-global-container">
    <h1>Où voulez-vous vous entrainer ?</h1>
    <div id="exo-home-search-bar">
      <div v-for="(langageAdmit, indice) in options.langagesAdmit" :key="indice" class="exo-home-checkbox-button">
        <input class="exo-home-checkbox-button-input" type="checkbox" name="" @change="search()" :checked="langageAdmit.active" :value="langageAdmit.lang" v-model="langageAdmit.active">
        <span class="exo-home-checkbox-button-tag">
          {{ langageAdmit.tag }}
        </span>
      </div>
      <div v-for="(difficultyAdmit, key) in options.difficultyAdmit" :key="difficultyAdmit.tag" class="exo-home-checkbox-button">
        <input type="checkbox" name="" @change="search()" checked="true" :value="difficultyAdmit.difficulty" v-model="difficultyAdmit.active">
        <span>
          {{ difficultyAdmit.tag }}
        </span>
      </div>
    </div>
    <hr class="profil-separator">
    <div id="exo-home-exercices-container">
      <article v-for="(exo , indice) in exercices" :key="indice" class="exo-home-exercice" :style="{ backgroundImage: 'url(' + exo.icon + ')' }">
        <div class="exo-home-exercice-header">
          <h1 class="exo-home-exercice-title"> {{ exo.title }} </h1>
          <p v-if="exo.creator !== 'Anonym'" class="exo-home-exercice-infos-creator"> par {{ exo.creator }} </p>
        </div>
        <p class="exo-home-exercice-difficulty">
          <span> {{ options.difficultyAdmit.find(d => d.difficulty === exo.difficulty).tag }} </span>
        </p>
        <div class="exo-home-exercice-infos" :langage="exo.langage">
          <p class="exo-home-exercice-infos-langage"> {{ options.langagesAdmit.find(d => d.lang === exo.langage).tag }} </p>
          <div class="exo-home-exercice-infos-buttons">
            <button class="exo-home-exercice-infos-button work" @click="work(exo.id)"> Work it ! </button>
            <button class="exo-home-exercice-infos-button next-time" @click="nextTime(exo.id)"> Plus tard </button>
          </div>
        </div>
      </article>
    </div>
    <button id="exo-home-load-more" @click="getexercices()">Charger + d'exercices</button>
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
      options: {
        langagesAdmit: [
          {lang: "javascript", active: true, tag: "Javascript"},
          {lang: "c_cpp", active: true, tag: "C++"},
          {lang: "python", active: true, tag: "Python"}
        ],
        difficultyAdmit: [
          {difficulty: 0, active: true, tag: "facile 😇"},
          {difficulty: 1, active: true, tag: "moyen 🙂"},
          {difficulty: 2, active: true, tag: "dur 🤨"},
          {difficulty: 3, active: true, tag: "expert 🥵"},
          {difficulty: 4, active: true, tag: "champion 😈"},
          {difficulty: 5, active: true, tag: "démon 💀"}
        ]
      },
      exercices: [],
      last_exo_load: 0
    }
  },
  mounted() {
    this.$emit('me');
    this.getexercices();
  },
  methods: {
    getexercices() {
      let whereSearch = {
        lang: makeListFromObject(this.options.langagesAdmit.filter(l => l.active === true), "lang"),
        difficulty: makeListFromObject(this.options.difficultyAdmit.filter(d => d.active === true), "difficulty"),
        offset: this.last_exo_load
      }
      this.$emit('getexercices', whereSearch, (result) => {
        if (result.exercices.length > 0) {
          for (let exo of result.exercices) {
            this.exercices.push(exo);
          }
          this.last_exo_load += result.exercices.length;
        }
      });
    },
    search() {
      this.last_exo_load = 0;
      this.exercices = [];
      this.getexercices();
    },
    work(exoId) {
      this.$emit('work', exoId, (result) => {
        console.log(result);
        if (result.status === 1) {
          location.replace(`#/editor?exercice=${exoId}`);
        }
      });
    },
    nextTime(exoId) {
      this.$emit('work', exoId, (result) => {
        if (result.status === 1) {
          console.log("ajouter à votre liste de favoris !")
        }
      });
    }
  }
}
</script>
