<template>
  <div>
    <h1>{{ post.title }}</h1>
  </div>
</template>

<script>
export default {

  computed: {
    post() {
      return this.$store.state.hwStore.subjectPost;
    },
  },
  async created() {
    await this.$store.dispatch('hwStore/fetchOnePost', this.$route.params.postid);
  },
};
</script>

<style>

</style>
