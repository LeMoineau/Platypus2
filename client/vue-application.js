const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Editor = window.httpVueLoader('./components/Editor.vue')
const ExoHome = window.httpVueLoader('./components/ExoHome.vue')
const ProfilLayout = window.httpVueLoader('./components/ProfilLayout.vue')
const Profil = window.httpVueLoader('./components/profilPanels/Profil.vue')
const Parametres = window.httpVueLoader('./components/profilPanels/Parametres.vue')
const ExerciceCreator = window.httpVueLoader('./components/profilPanels/ExerciceCreator.vue')
const ExerciceCreatorLine = window.httpVueLoader('./components/profilPanels/ExerciceCreatorLine.vue')
const ExerciceTutoriel = window.httpVueLoader('./components/profilPanels/ExerciceTutoriel.vue')

Vue.component("profil-panel", Profil);
Vue.component("parametres-panel", Parametres);
Vue.component("exercice-creator-panel", ExerciceCreator);
Vue.component("exercice-creator-line", ExerciceCreatorLine);
Vue.component("exercice-tutoriel-panel", ExerciceTutoriel);

const routes = [
  { path: '/', component: Home},
  { path: '/home', component: Home},
  { path: '/register', component: Register },
  { path: '/editor', component: Editor },
  { path: '/exohome', component: ExoHome },
  { path: '/profil', component: ProfilLayout }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    user: {
      prenom: "pierrot",
      nom: "le ouf",
      login: "c'est un mystere",
      perm: 0,
      icon: "https://images-na.ssl-images-amazon.com/images/I/51CDY-aeXvL._SX486_BO1,204,203,200_.jpg"
    },
    isRegistered: false
  },
  async mounted () {
    this.$emit("me");
  },
  methods: {
    openProfilNav() {
      document.querySelector("#header-profil-nav").classList.toggle("open");
      document.querySelector("#header-profil-hider").classList.toggle("open");
    },
    async register(user, callback) {
      const res = await axios.post('/api/register' , {user: user});
      callback(res.data.result);
    },
    async login(user, callback) {
      const res = await axios.post('/api/login' , {user: user});
      callback(res.data.result);
    },
    async me(callback) {
      const res = await axios.get('/api/me');
      const result = res.data.result;
      this.isRegistered = (res.data.result.status === 1);
      if (result.status === 1) {
        this.user = result.user;
      }
      if (callback !== undefined) {
        callback(result);
      }
    },
    async disconnect() {
      axios.delete('/api/disconnect/');
      this.user = {
        prenom: "pierrot",
        nom: "le ouf",
        login: "c'est un mystere",
        perm: 0,
        icon: "https://images-na.ssl-images-amazon.com/images/I/51CDY-aeXvL._SX486_BO1,204,203,200_.jpg"
      }
    },
    async createxercice(exercice, callback) {
      const res = await axios.post('/api/exercice', { exercice: exercice });
      callback(res.data.result);
    },
    async getexercices(whereSearch, callback) {
      const res = await axios.get(`/api/exercices/${whereSearch.offset}/${whereSearch.lang}/${whereSearch.difficulty}`);
      callback(res.data.result);
    },
    async work(exoId, callback) {
      const res = await axios.post(`/api/work`, {exoId: exoId});
      callback(res.data.result);
    }
  }
});
