<template>
  <div id="profil-global-container">
    <nav id="profil-nav">
      <button id="profil-button" class="profil-nav-button selected" @click="select('profil-button')">
        Votre Profil
      </button>
      <button id="parametres-button" class="profil-nav-button" @click="select('parametres-button')">
        Paramètres
      </button>
      <button v-if="user.perm >= 1" id="exercices-button" class="profil-nav-button" @click="select('exercices-button')">
        Créer un exercice
      </button>
      <router-link to="/register?mode=disconnect" class="profil-nav-button">
        Se déconnecter
      </router-link>
    </nav>
    <div id="current-panel">
      <profil-panel id="profil-panel" v-bind:user="user" class="panel open"></profil-panel>
      <parametres-panel id="parametres-panel" v-bind:user="user" class="panel"></parametres-panel>
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
      panelAssociated: {
        "profil-button": "profil-panel",
        "parametres-button": "parametres-panel"
      },
    }
  },
  mounted() {
    this.$emit('me');
  },
  methods: {
    select(id) {
      selected_buttons = document.querySelectorAll(".selected");
      for (s of selected_buttons) {
        s.classList.toggle("selected");
      }
      opened_panels = document.querySelectorAll(".open");
      for (o of opened_panels) {
        o.classList.toggle("open");
      }
      document.querySelector(`#${id}`).classList.add("selected");
      document.querySelector(`#${this.panelAssociated[id]}`).classList.add("open");

    },
    test() {
      console.log("ici");
    }
  }
}
</script>
