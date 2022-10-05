<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          {{ isAuthenticated ? user.email : 'Chat' }}
        </q-toolbar-title>

        <div><q-btn
          v-if="isAuthenticated"
          color="negative"
          icon="close"
          label="Salir"
          @click="salir"
        /></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
/**
 * imports
 */

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '@vueuse/firebase';
import { auth } from "boot/firebase";

const {isAuthenticated , user }   = useAuth(auth);

const salir = async()=>{
  if (isAuthenticated){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Saliendo del sistema exitosamente");
    }).catch((error) => {
      // An error happened.
    });
  }
}

</script>
