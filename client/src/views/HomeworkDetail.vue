<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.deadline }}</p>
    <p>{{ post.description }}</p>
    <Button label="Delete" @click="deletePostEvt"
    class="p-button-raised p-button-rounded p-button" />
    <Button label="Update" @click="showUpdateEvt"
    class="p-button-raised p-button-rounded p-button" />
    <div class="p-fluid" v-show="showUpdate">
      <div class="p-grid nested-grid p-jc-center">
        <div class="p-col-12 p-md-6">
          <div class="p-field p-grid p-jc-center">
              <label for="title" class="p-col-12 p-mb-2 p-mb-md-0">Title</label>
              <div class="p-col-12">
                  <InputText id="title" v-model="post.title" type="text" />
              </div>
          </div>
          <div class="p-field p-grid p-jc-center">
              <label for="description" class="p-col-12 p-mb-2 p-mb-md-0">Description</label>
              <div class="p-col-12">
                  <InputText id="description" v-model="post.description" type="text" />
              </div>
          </div>
          <div class="p-grid p-jc-center">
            <label for="deadline" class="p-col-12 p-mb-2 p-mb-md-0">Deadline</label>
              <div class="p-field p-col-12 p-md-4">
                  <label for="time24">Time / 24h</label>
                  <Calendar id="time24" v-model="post.deadline" :showTime="true"
                  :showSeconds="true" :inline="false" :touchUI="false"/>
              </div>
          </div>
        </div>
      </div>
      <Button label="Submit" @click="updatePostEvt"
      class="p-button-raised p-button-rounded p-button" />
    </div>

  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

export default {
  components: {
    Button,
    InputText,
    Calendar,
  },
  data() {
    return {
      showUpdate: false,
    };
  },
  computed: {
    post() {
      return this.$store.state.hwStore.subjectPost;
    },
  },
  async created() {
    await this.$store.dispatch('hwStore/fetchOnePost', this.$route.params.postid);
  },
  methods: {
    updatePostEvt() {
      this.$store.dispatch('hwStore/updatePost', { title: this.post.title, description: this.post.description, deadline: this.post.deadline });
      this.showUpdate = false;
    },
    deletePostEvt() {
      this.$store.dispatch('hwStore/deletePost', this.$route.params.postid);
    },
    showUpdateEvt() {
      this.showUpdate = true;
    },
  },
};
</script>

<style>

</style>
