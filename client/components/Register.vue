<template>
  <div class="centered-container">
    <form id="register-container">
      <label for="login"> Login </label>
      <input type="text" name="login" value="" required>
      <label for="password"> Mot de passe </label>
      <input type="password" name="password" value="" required>
      <input type="submit" name="" value="Connexion">
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {

  },
  data () {
    return {
      name: "",
      pw : "",
    }
  },
  methods: {
      inscription(email,password){
          this.$emit("inscription",email, password)
      }
  }
}
</script>
