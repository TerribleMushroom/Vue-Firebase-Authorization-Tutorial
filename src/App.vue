<script setup>
import { RouterLink, RouterView } from "vue-router";
import { auth } from "./firebase/config";
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";
const user = ref({});
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});
function Login() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider);
}
function Logout() {
  signOut(auth);
}
</script>

<template>
  <nav>
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <button @click="Login" v-if="!user">Login</button
    ><button @click="Logout" v-else>Logout</button>
  </nav>
  <RouterView />
</template>
