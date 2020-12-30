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
    articles: { type: Array, default: [] },
    users: { type: Object, default: () => {
        return {
          userName: "none",
          userId: -1,
          userPerm: 0
        }
      }
    }
  },
  data () {
    return {

    }
  },
  async mounted() {
    this.$emit('check-perm', (response) => {
      this.newArticle.title = response.title;
    });
  },
  methods: {
    alreadyBuy(articleId) {
      return this.panier.articles.some( e => e.id == articleId )
    },
    removeFromPanier(articleId) {
      this.$emit('remove-from-panier', articleId)
    },
    addArticle () {
      this.$emit('add-article', this.newArticle)
    },
    deleteArticle (articleId) {
      this.$emit('delete-article', articleId)
    },
    editArticle (articleId) {
      location.replace("#/updateArticle?id=" + articleId);
    },
    sendEditArticle () {
      this.$emit('update-article', this.editingArticle)
      this.abortEditArticle()
    },
    abortEditArticle () {
      this.editingArticle = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    },
    openArticle(articleId){
      location.replace("#/ArticleView?id=" + articleId)
    }
  }
}
</script>
