<template>
  <div class="home">
    <Banner />
    <Opportunities />
    <Features />
    <Facts />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Home/Banner.vue';
import Opportunities from '@/components/Home/Opportunities.vue';
import Features from '@/components/Home/Features.vue';
import Facts from '@/components/Home/Facts.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    Opportunities,
    Features,
    Facts,
  },
};
</script>
