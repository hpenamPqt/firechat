<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated"></VistaAcceso>
  </q-page>
</template>

<script setup>
import VistaAcceso from 'components/VistaAcceso.vue';
import { getAuth } from "firebase/auth";
import { useAuth } from '@vueuse/firebase';

const {isAuthenticated , user }   = useAuth(getAuth());


</script>
