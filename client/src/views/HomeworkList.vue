<template>
  <div class="hwListWrapper">
    <div id="filterSection">
      filters
    </div>
    <div id="hwListSection">
      <router-link to="/posts/new">Post A Homework!</router-link>
      <div id="hwListContainer">
        <DataView :value="postList" :layout="layout">
          <template #list="slotProps">
            <div class="p-col-12">
                <div class="post-details">
                    <div>
                      <router-link v-bind:to="`/posts/${slotProps.data._id}`">
                        <div class="p-grid">
                            <div class="p-col-12">Title: <b>{{slotProps.data.title}}</b></div>
                            <div class="p-col-12">Description:
                              <b>{{slotProps.data.description}}</b>
                            </div>
                        </div>
                      </router-link>
                    </div>
                </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DataView from 'primevue/dataview';

export default {
  name: 'Home',
  components: {
    DataView,
  },
  data() {
    return {
      layout: 'list',
    };
  },
  computed: {
    postList() {
      return this.$store.state.hwStore.postList;
    },
  },
  async created() {
    await this.$store.dispatch('hwStore/fetchAllPosts');
  },
};
</script>
