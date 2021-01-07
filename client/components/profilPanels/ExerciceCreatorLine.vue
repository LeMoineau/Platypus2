<template>
  <tr>
    <td v-bind:class="type">
      <select class="exercice-creator-select" v-model="type">
        <option value="title">title</option>
        <option value="subtitle">subtitle</option>
        <option value="text">text</option>
      </select>
    </td>
    <td>
      <input v-if="type === 'title'" type="text" class="exercice-creator-h1" v-model="content" required>
      <input v-else-if="type === 'subtitle'" type="text" class="exercice-creator-h2" v-model="content" required>
      <textarea v-else v-model="content" required></textarea>
    </td>
  </tr>
</template>

<script>
module.exports = {
  props: {

  },
  data () {
    return {
      type: "title",
      content: "",
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
