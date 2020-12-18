<template>
    <div id="register-container">
      <div class="register-subcontainer">

      </div>
      <div class="register-subcontainer">

      </div>
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
