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
    <p>Comments</p>
      <Button label="New comment" @click="newCommentEvt"
      class="p-button-raised p-button-rounded p-button-sm" />
      <InputText id="newCommentInp" v-model="commentInp" type="text" />

    <div>
      <div v-for="comment in post.comments" v-bind:key="comment._id">
        <h2>{{ comment.commentText }} </h2>
        <Button label="Delete comment" @click="deleteCommentEvt(comment._id)"
        class="p-button-raised p-button-rounded p-button-sm" />
        <Button label="Update comment" @click="updateCommentEvt(comment._id)"
        class="p-button-raised p-button-rounded p-button-sm" />
      </div>
    </div>

    <p>Bids</p>
    <Button label="New bid" @click="newBidEvt"
    class="p-button-raised p-button-rounded p-button-sm" />
    <InputText id="newBidInp" v-model="bidInp" type="text" />

    <div>
      <div v-for="bid in post.bids" v-bind:key="bid._id">
        <h2>{{ bid.amount }} </h2>
        <Button label="Delete bid" @click="deleteBidEvt(bid._id)"
        class="p-button-raised p-button-rounded p-button-sm" />
        <Button label="Update bid" @click="updateBidEvt(bid._id)"
        class="p-button-raised p-button-rounded p-button-sm" />
      </div>
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
      commentInp: null,
      willUpdateComment: null,
      willUpdateBid: null,
      bidInp: null,
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
    newCommentEvt() {
      this.$store.dispatch('commentStore/createComment', { postid: this.$route.params.postid, commentText: this.commentInp });
    },
    deleteCommentEvt(itemId) {
      this.$store.dispatch('commentStore/deleteComment', { postid: this.$route.params.postid, commentid: itemId });
    },
    updateCommentEvt(itemId) {
      this.$store.dispatch('commentStore/updateComment', { postid: this.$route.params.postid, commentid: itemId, commentText: this.commentInp });
    },
    newBidEvt() {
      this.$store.dispatch('bidStore/createBid', { postid: this.$route.params.postid, amount: this.bidInp });
    },
    deleteBidEvt(itemId) {
      this.$store.dispatch('bidStore/deleteBid', { postid: this.$route.params.postid, bidid: itemId });
    },
    updateBidEvt(itemId) {
      this.$store.dispatch('bidStore/updateBid', { postid: this.$route.params.postid, bidid: itemId, amount: this.bidInp });
    },
  },
};
</script>

<style>

</style>
