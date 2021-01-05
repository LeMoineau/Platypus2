<template>
  <div id="home-container">
    <section class="home-header">
      <h1>Let's train to improve our skills !</h1>
    </section>
    <section class="home-section">
      <div class="home-subsection home-section-img">
        <img src="" alt="image d'illustration">
      </div>
      <div class="home-subsection home-section-para">
        <h2>Apprenez facilement !</h2>
        <p>Platypus 2 vous propose de nombreux exercices de tout niveau dans plein de langages différents.</p>
        <p>Du Python au C++ en passant par Javascript, Platypus 2 sera vous aider à performer dans l'apprentissage des langages façonnant notre Internet !</p>
        <button type="button" name="button">Se lancer !</button>
      </div>
    </section>
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

    }
  },
  async mounted() {
    this.$emit('me');
  },
  methods: {

  }
}
</script>
