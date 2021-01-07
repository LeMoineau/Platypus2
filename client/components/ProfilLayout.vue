<template>
  <div id="profil-global-container">
    <nav id="profil-nav">
      <button id="profil-button" class="profil-nav-button selected" @click="openPanel('profil-button')">
        Votre Profil
      </button>
      <button id="parametres-button" class="profil-nav-button" @click="openPanel('parametres-button')">
        Paramètres
      </button>
      <button v-if="user.perm >= 1" id="exercices-button" class="profil-nav-button" @click="openSubnav('exercices-button')">
        Créer un exercice
      </button>
        <nav id="exercices-button-nav" class="profil-nav-subnav">
          <button id="exercices-tuto-button" class="profil-subnav-button" @click="subOpenPanel('exercices-tuto-button')">
            Tutoriel de création
          </button>
          <button id="exercices-creator-button" class="profil-subnav-button" @click="subOpenPanel('exercices-creator-button')">
            Exercice Creator
          </button>
        </nav>
      <router-link to="/register?mode=disconnect" class="profil-nav-button">
        Se déconnecter
      </router-link>
    </nav>
    <div id="current-panel">
      <component v-bind:is="currentPanel" v-bind:user="user"></component>
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
          icon: "https://images-na.ssl-images-amazon.com/images/I/51CDY-aeXvL._SX486_BO1,204,203,200_.jpg"
        }
      }
    }
  },
  data () {
    return {
      buttonsLink: {
        "profil-button": "profil-panel",
        "parametres-button": "parametres-panel",
        "exercices-button": "exercices-button-nav",
        "exercices-tuto-button": "exercice-tutoriel-panel",
        "exercices-creator-button": "exercice-creator-panel"
      },
      currentPanel: "profil-panel"
    }
  },
  mounted() {
    this.$emit('me');
    setTimeout(() => {
      if (this.$route.query.panel === "exercicecreator") {
        this.openSubnav("exercices-button");
        this.subOpenPanel("exercices-creator-button");
      } else if (this.$route.query.panel === "parametres") {
        this.openPanel("parametres-button");
      }
    }, 100)
  },
  methods: {
    openPanel(id) {
      window.removeAllClass("selected");
      window.removeAllClass("subselected");
      window.removeAllClass("subopen");
      document.querySelector(`#${id}`).classList.add("selected");
      this.currentPanel = this.buttonsLink[id];
    },
    openSubnav(id) {
      window.removeAllClass("selected");
      window.removeAllClass("subopen");
      document.querySelector(`#${id}`).classList.add("selected");
      document.querySelector(`#${this.buttonsLink[id]}`).classList.add("subopen");
    },
    subOpenPanel(id) {
      window.removeAllClass("subselected");
      document.querySelector(`#${id}`).classList.add("subselected");
      this.currentPanel = this.buttonsLink[id];
    }
  }
}
</script>
