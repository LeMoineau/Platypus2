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
    <div class="bod">
      <h1>Mon avancement</h1>
      <div class="sub-bod">
        <div class="box">
          <div class="percent">
            <svg>
              <circle cx="70" cy="70" r="70" class="python"></circle>
              <circle cx="70" cy="70" r="70" class="python"></circle>
            </svg>
            <div class="number">
              <h2>87<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">python</h2>
        </div>
        <div class="box">
          <div class="percent">
            <svg>
              <circle cx="70" cy="70" r="70" class="C"></circle>
              <circle cx="70" cy="70" r="70" class="C"></circle>
            </svg>
            <div class="number">
              <h2>87<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">C/Cpp</h2>
        </div>
        <div class="box">
          <div class="percent">
            <svg>
              <circle cx="70" cy="70" r="70" class="JavaScript"></circle>
              <circle cx="70" cy="70" r="70" class="JavaScript"></circle>
            </svg>
            <div class="number">
              <h2>87<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">JavaScript</h2>
        </div>
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

    }
  },
  mounted() {
    this.user = this.$parent.user
  },
  methods: {

  }
}
</script>
