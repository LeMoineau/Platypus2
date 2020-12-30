const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Editor = window.httpVueLoader('./components/Editor.vue')

const routes = [
  { path: '/', component: Home},
  { path: '/home', component: Home},
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/editor', component: Editor }
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
      icon: "https://images-na.ssl-images-amazon.com/images/I/51CDY-aeXvL._SX486_BO1,204,203,200_.jpg",
      isRegistered: false
    }
  },
  async mounted () {
    //await axios.post('/api/code')
  },
  methods: {
    openProfilNav() {
      document.querySelector("#header-profil-nav").classList.toggle("open");
    }
  }
});
