<template>
  <div>
    <div class="p-fluid">
      <div class="p-grid nested-grid p-jc-center">
        <div class="p-col-12 p-md-6">
          <div class="p-field p-grid p-jc-center">
              <label for="title" class="p-col-12 p-mb-2 p-mb-md-0">Title</label>
              <div class="p-col-12">
                  <InputText id="title" v-model="title" type="text" />
              </div>
          </div>
          <div class="p-field p-grid p-jc-center">
              <label for="description" class="p-col-12 p-mb-2 p-mb-md-0">Description</label>
              <div class="p-col-12">
                  <InputText id="description" v-model="description" type="text" />
              </div>
          </div>
          <div class="p-grid p-jc-center">
            <label for="deadline" class="p-col-12 p-mb-2 p-mb-md-0">Deadline</label>
              <div class="p-field p-col-12 p-md-4">
                  <label for="time24">Time / 24h</label>
                  <Calendar id="time24" v-model="deadline" :showTime="true"
                  :showSeconds="true" :inline="false" :touchUI="false"/>
              </div>
          </div>
        </div>
      </div>
      <p>
        title: {{ title }}
        description: {{ description }}
        deadline: {{ deadline }}

      </p>
    </div>
    <Button label="Submit" @click="submitNewPostBtn"
    class="p-button-raised p-button-rounded p-button" />
  </div>
</template>

<script>
// @ is an alias to /src
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

export default {
  name: 'Home',
  components: {
    InputText,
    Calendar,
    Button,
  },
  props: {
    deadlineValue: String,
  },
  data() {
    return {
      title: '',
      description: '',
      deadline: null,
    };
  },
  computed: {
    pickedDeadline() {
      return new Date(this.year, this.month, this.day);
    },
  },
  methods: {
    submitNewPostBtn() {
      this.$store.dispatch('hwStore/createPost', { title: this.title, description: this.description, deadline: this.deadline });
    },
  },
};
</script>
