<template>
  <div id="register-global-container">

    <form v-if="mode === 'register'" v-on:submit.prevent="register()" id="register-container" class="register-subcontainer">
      <h1 class="register-subcontainer-title">S'inscrire</h1>
      <p class="register-errormessage"> {{ errormessage }} </p>

      <div class="register-subcontainer-line">
        <input v-model="registerUser.prenom" type="text" autocomplete="off" name="prenom" value="" placeholder="Prénom" required>
        <input v-model="registerUser.nom" type="text" autocomplete="off" name="nom" value="" placeholder="Nom" required>
      </div>
      <input v-model="registerUser.login" type="text" autocomplete="off" name="login" value="" placeholder="Login" required>
      <input v-model="registerUser.mdp" type="password" autocomplete="off" name="password" value="" placeholder="Mot de passe" required>

      <input type="submit" name="valider" value="Connexion">
      <p @click="toggleMode">ou <u>se connecter</u></p>
    </form>

    <form v-else v-on:submit.prevent="login()" id="login-container" class="register-subcontainer">
      <h1 class="register-subcontainer-title">Se connecter</h1>
      <p class="register-errormessage"> {{ errormessage }} </p>

      <input v-model="loginUser.login" type="text" autocomplete="off" name="login" value="" placeholder="Login" required>
      <input v-model="loginUser.mdp" type="password" autocomplete="off" name="password" value="" placeholder="Mot de passe" required>

      <input type="submit" name="valider2" value="Connexion">
      <p @click="toggleMode">ou <u>s'inscrire</u></p>
    </form>

  </div>
</template>

<script>
module.exports = {
  props: {

  },
  data () {
    return {
      registerUser: {
        prenom: "",
        nom: "",
        login: "",
        mdp: ""
      },
      loginUser: {
        login: "",
        mdp: "",
      },
      mode: "login",
      errormessage: ""
    }
  },
  mounted() {
    if (this.$route.query.mode !== undefined) {
        this.mode = this.$route.query.mode;
    }
    if (this.mode === "disconnect") {
      this.$emit('disconnect');
    }
    this.$emit('me');
  },
  methods: {
      register() {
          this.$emit("register", this.registerUser, (result) => {
            if (result.status !== 1) {
              this.errormessage = result.errormessage;
            } else {
              location.replace("#/home");
            }
          });
      },
      login() {
          this.$emit("login", this.loginUser, (result) => {
            if (result.status !== 1) {
              this.errormessage = result.errormessage;
            } else {
              location.replace("#/home");
            }
          });
      },
      toggleMode() {
        if (this.mode === "login") {
          this.mode = "register";
        } else {
          this.mode = "login";
        }
      }
  }
}
</script>
