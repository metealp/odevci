<template>
    <Menubar :model="items">
    </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import {
    computed, onMounted,
} from 'vue';

import { useStore } from 'vuex';

export default {
    name: "Header",
    components: {
        Menubar,
    },

    setup() {
        const store = useStore();
        const signUserOut = () => { store.dispatch('authStore/signUserOut'); };
        const loginStatus = computed(() => store.state.authStore.isLoggedIn);

        const items = [
            {
              label: 'Home',
              icon: 'pi pi-home',
              to: '/',
            },
            {
              label: `Homeworks`,
              icon: 'pi pi-briefcase',
              to: '/homeworks',
            },
            {
              label: 'Sign In',
              icon: 'pi pi-sign-in',
              to: '/signin',
              // eslint-disable-next-line arrow-body-style
              visible: () => { return !loginStatus.value; },
            },
            {
              label: 'Sign Up',
              icon: 'pi pi-sign-in',
              to: '/signup',
              // eslint-disable-next-line arrow-body-style
              visible: () => { return !loginStatus.value; },

            //   visible: !loginStatus(),
            },
            {
              label: 'Sign Out',
              icon: 'pi pi-sign-out',
              // eslint-disable-next-line arrow-body-style
              visible: () => { return loginStatus.value; },
              command: () => {
                    signUserOut();
              },
            },
        ];
        onMounted(loginStatus);
        return {
            items, loginStatus,
        };
    },
};
</script>

<style>

</style>
