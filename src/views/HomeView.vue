<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase/config";
const user = ref({});
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});
</script>

<template>
  <h1>Welcome</h1>
  <h2 v-if="user">{{ user.displayName }}</h2>
  <img v-if="user" :src="user.photoURL" alt="" />
</template>
