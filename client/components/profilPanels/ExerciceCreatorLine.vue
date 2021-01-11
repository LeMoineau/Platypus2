<template>
  <tr>
    <td v-bind:class="type">
      <select class="exercice-creator-select" v-model="type">
        <option value="title">title</option>
        <option value="subtitle">subtitle</option>
        <option value="text">text</option>
        <option value="question">question</option>
        <option value="coderesult">coderesult</option>
      </select>
    </td>
    <td>
      <input v-if="type === 'title'" type="text" class="exercice-creator-h1" v-model="content" required>
      <input v-else-if="type === 'subtitle'" type="text" class="exercice-creator-h2" v-model="content" required>
      <input v-else-if="type === 'question'" type="text" class="exercice-creator-h2" v-model="content" required>
      <textarea v-else-if="type === 'coderesult'" v-model="content" required></textarea>
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
