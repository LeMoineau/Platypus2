<template>
  <div id="profil-sub-global-container">
    <div id="profil-sub-header">
      <div class="profil-sub-icon" :style="{ backgroundImage: 'url(' + user.icon + ')' }">

      </div>
      <div class="profil-sub-infos">
        <h1> {{ user.prenom }} {{ user.nom }} </h1>
        <h2> {{ user.login }} </h2>
        <p v-if="user.perm === 0"> Etudiant </p>
        <p v-if="user.perm === 1"> Professeur </p>
      </div>
    </div>
    <hr class="profil-separator">
    <div id="profil-sub-progression">

    </div>
    <hr class="profil-separator">
    <div id="profil-sub-exercices-begins">
      <h1 class="profil-sub-section-title"> Exercices commencés & Favoris </h1>
      <div v-for="(exo, indice) in exercices_begins" :key="indice" class="profil-sub-exercice-begin">
        <span class="profil-sub-exercice-sub-section">
          <div class="profil-sub-exercice-icon" :style="{ backgroundImage: 'url(' + exo.icon + ')' }"></div>
          <h3 class="profil-sub-exercice-title"> {{ exo.title }} </h3>
          <p v-if="exo.creator != 'Anonym'"> par {{ exo.creator }} </p>
          <p class="profil-sub-exercice-lang" :lang="exo.langage"> {{ langagesAdmit.find(l => l.lang == exo.langage).tag }} </p>
        </span>
        <span class="profil-sub-exercice-sub-section">
          <p> {{ difficultyAdmit.find(d => d.difficulty == exo.difficulty).tag }} </p>
          <p class="profil-sub-exercice-avancement"> {{ exo.avancement }} </p>
        </span>
      </div>
    </div>
    <hr class="profil-separator">
    <div id="profil-sub-exercices-created" style="padding-bottom: 30px;">
      <h1 class="profil-sub-section-title"> Exercices créés </h1>
      <div v-for="(exo, index) in exercices_created" :key="index" class="profil-sub-exercice-create">
        <span class="profil-sub-exercice-sub-section">
          <div class="profil-sub-exercice-icon" :style="{ backgroundImage: 'url(' + exo.icon + ')' }"></div>
          <h3 class="profil-sub-exercice-title"> {{ exo.title }} </h3>
          <p v-if="exo.creator != 'Anonym'"> par {{ exo.creator }} </p>
          <p class="profil-sub-exercice-lang" :lang="exo.langage"> {{ langagesAdmit.find(l => l.lang == exo.langage).tag }} </p>
        </span>
        <span class="profil-sub-exercice-sub-section">
          <p> {{ difficultyAdmit.find(d => d.difficulty == exo.difficulty).tag }} </p>
        </span>
      </div>
    </div>
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
      exercices_begins: [],
      exercices_created: [],
      difficultyAdmit: [
        {difficulty: 0, active: true, tag: "facile 😇"},
        {difficulty: 1, active: true, tag: "moyen 🙂"},
        {difficulty: 2, active: true, tag: "dur 🤨"},
        {difficulty: 3, active: true, tag: "expert 🥵"},
        {difficulty: 4, active: true, tag: "champion 😈"},
        {difficulty: 5, active: true, tag: "démon 💀"}
      ],
      langagesAdmit: [
        {lang: "javascript", active: true, tag: "JS"},
        {lang: "c_cpp", active: true, tag: "C & C++"},
        {lang: "python", active: true, tag: "Python"}
      ]
    }
  },
  mounted() {
    this.user = this.$parent.user;
    this.$parent.$emit('profilinfos', (result) => {
      console.log(result);
      if (result.status == 1) {
        for (let i = 0; i<result.exo_begin.length; i++) {
          let exoId = result.exo_begin[i];
          let avancement = result.avancement[i];
          let tmpExo;
          this.$parent.$emit('getexercice', exoId, (result2) => {
            if (result2.status == 1) {
              tmpExo = result2.exercice;
              tmpExo.avancement = avancement;
              this.exercices_begins.push(tmpExo);
            }
          })
        }
        for (let exoId of result.exo_create) {
          this.$parent.$emit('getexercice', exoId, (result2) => {
            if (result2.status == 1) {
              this.exercices_created.push(result2.exercice);
            }
          })
        }
      } else {
        location.replace("#/register");
      }
    });
  },
  methods: {

  }
}
</script>
