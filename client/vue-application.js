const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Editor = window.httpVueLoader('./components/Editor.vue')

const routes = [
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
    articles: [],
    users: {
      userName: "none",
      userId: -1,
      userPerm: 0
    },
    selected: {
      id: "",
      title: "",
      text: "",
      image: "",
      creator: ""
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data.message.rows
    await axios.post('/api/code')
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
      location.replace("#/home")
    },
    async updateArticle (articleId) {
      if (articleId !== -1) {
        location.replace('#/updateArticle?id=' + articleId);
      }
    },
    async deleteArticle (articleId) {
      const index = this.articles.findIndex(a => a.id === articleId)
      if (index !== -1) {
          this.articles.splice(index, 1)
          await axios.delete('/api/article/' + articleId)
      }
    },
    async inscription(mail,pass){
      const res = await axios.post('/api/register' , {email: mail ,password: pass})
      let result = res.data.message
      if(result === "Registed"){
        location.replace("#/home")
      }else{
        alert("Ce compte existe déjà")
      }
    },
    async login(mail,pass){
      const res = await axios.post('/api/login', {email: mail, password: pass})
      let result = res.data.message
      if(result === "Connected"){
        location.replace("#/home")
        this.users.userId = res.data.userId
      }
      else if(result === 'AlreadyConnected'){
        alert("Vous êtes déjà connecté")
        this.users.userId = res.data.userId
      }
      else{
        alert("Mot de passe oublié veuillez vous réinscrire")
      }
    },
    async loadArticleView(articleId){

      return this.articles.find(c => c.id === articleId)
    },
    async checkPerm(callblack) {
      const res = await axios.get("/api/me")
      this.users.userId = res.data.message
      const res1 = await axios.get("/api/perm")
      if (res1.data.message.rows.length > 0) {
        this.users.userPerm = res1.data.message.rows[0].perm
      }
      const res2 = await axios.get("/api/name")
      if (res2.data.message.rows.length > 0) {
        this.users.userName = res2.data.message.rows[0].email
      }
      callblack(res.message);
    },
    async disconnect() {
      await axios.post("/api/disconnect")
      console.log("disconnected");
      this.users = {
        userName: "none",
        userId: -1,
        userPerm: 0
      }
    },
    async getArticleInfos(articleId) {
      const res = await axios.get("/api/article/" + articleId);
      if (res.data.message.rows.length > 0) {
          this.selected = res.data.message.rows[0];
      }
    },
    async editArticle(article) {
      console.log(article)
      const res = await axios.put("/api/article", {id: article.id, title: article.title, text: article.text, image: article.image, creator: article.creator});
      let editingIndex = this.articles.findIndex(a => a.id === parseInt(article.id));
      this.articles[editingIndex].title = article.title;
      this.articles[editingIndex].creator = article.creator;
      this.articles[editingIndex].image = article.image;
    }
  }
})
