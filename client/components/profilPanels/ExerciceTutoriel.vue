<template>
  <div id="exercice-creator-global-container">
    <h1>Tutoriel</h1>
    <hr class="profil-separator">
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

    }
  },
  mounted() {
    this.user = this.$parent.user;
  },
  methods: {

  }
}
</script>
