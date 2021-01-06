<template>
  <div id="profil-global-container">
    <h1>salut</h1>
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
  mounted() {
    this.$emit('me');
  },
  methods: {
    select(id) {
      selected_buttons = document.querySelectorAll(".selected");
      for (s of selected_buttons) {
        s.classList.toggle("selected");
      }
      document.querySelector(`#${id}`).classList.add("selected");
    }
  }
}
</script>
