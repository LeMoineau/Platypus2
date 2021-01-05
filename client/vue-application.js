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
      console.log(result);
      this.isRegistered = (res.data.result.status === 1);
      if (result.status === 1) {
        this.user = result.user;
      }
      if (callback !== undefined) {
        callback(result);
      }
    }
  }
});
