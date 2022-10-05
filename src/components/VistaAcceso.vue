<template>
  <div class="q-px-xl">
    <h5>Formulario de {{ acceder ? 'Login': 'Registro' }}</h5>
    <q-form
      @submit.prevent="procesarFormulario"
      @reset="resetFormulario"
      class="q-gutter-md"
    >
      <q-input
        v-model="email"
        label="Email"
        type="text"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
      />
      <q-btn
        color="primary"
        :label="acceder ? 'Login':'Registro' "
        type="submit"
      />
      <q-btn color="primary" outline v-if="!acceder" @click="acceder = true">¿Ya tienes cuenta?</q-btn>
      <q-btn color="negative" outline v-else @click="acceder = false">¿No tienes cuenta?</q-btn>


    </q-form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  import { useAuth } from '@vueuse/firebase'
  import { db } from "boot/firebase"
  import { collection, addDoc } from "firebase/firestore";
import { async } from '@firebase/util';


  const email = ref('prueba@prueba.com');
  const password = ref('123456');
  const acceder = ref(true);

  // const app = initializeApp({ /* config */ })
  // const { isAuthenticated, user } = useAuth(getAuth(app))
  const {isAuthenticated , user }   = useAuth(getAuth())

  const procesarFormulario = async() => {
    if (!email.value.trim() || !password.value.trim()){
      console.log("campos vacios")
      return;
    }
    try{

      if (!acceder.value){
        console.log("Registrando");
        // Registro
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('signed in')
            // ...
            // await db.collection
            agregarUsuario(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode);
            console.log(errorMessage);
          });

          resetFormulario();
      }else{
        //Login
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    }catch(error){
      console.error(error);
    }
  }

  const agregarUsuario = async (user)=>{
    const docRef = await addDoc(collection(db, "usuarios"), {
              email: user.email,
              estado: true,
              uid: user.uid
            });
            console.log("Document written with ID: ", docRef.id);
  }

  const resetFormulario = ()=>{
    email.value = "";
    password.value="";

  }
</script>
