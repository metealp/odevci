<template>
<div class="nested-grid p-grid p-jc-center">
    <div class="p-col-6 p-md-6 p-lg-3">
        <div class="p-grid">
            <div class="p-field p-col-12">
                <span class="p-float-label">
                    <InputText id="email" type="email" v-model="emailValue"> </InputText>
                </span>
            </div>
            <div class="p-field p-col-12">
                <span class="p-float-label">
                    <Password id="password" v-model="passwordValue"> </Password>
                </span>
            </div>
            <div class="p-field p-col-12">
                <social-login> </social-login>
            </div>
            <button @click="localSign">Signin</button>
        </div>
    </div>
</div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import SocialLogin from '../components/Authentication/SocialLogin.vue';

export default {
  name: 'Signin',
  components: {
    InputText,
    Password,
    SocialLogin,
  },
  data() {
    const passwordValue = "";
    const emailValue = "";
    return {
        passwordValue, emailValue,
    };
  },
  methods: {
      async localSign() {
        await this.$store.dispatch('authStore/authViaLocal', { password: this.passwordValue, email: this.emailValue });
      },
  },
};
</script>

<style>

</style>
