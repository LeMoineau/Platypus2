<template>
  <section class="home-section">
      <img src="../css/ressources/c.png" data-speed="-3" class="layer">
      <img src="../css/ressources/code.png" data-speed="5" class="layer">
      <img src="../css/ressources/java.png" data-speed="9" class="layer">
      <img src="../css/ressources/python.png" data-speed="-9" class="layer">
      <img src="../css/ressources/cpp.png" data-speed="-8" class="layer">
      <div class="ecrit">
        <h1>Let's train to improve our skills !</h1>
        <p>Du Python au C++ en passant par Javascript, IziCode vous aidera a devenir le meilleur</p>
        <button class="home-button"type="button" name="button"><a href="#/Register">Se lancer !</a></button>
      </div>
    </section>
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
  async mounted() {
    this.$emit('me');
  },
  methods: {

  }
}
</script>
