<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";
const user = ref({});
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});
</script>
<template>
  <h1>About Me</h1>
  <div class="profile">
    <img :src="user.photoURL" alt="" class="profile-pic" />
    <h3>{{ user.displayName }}</h3>
  </div>
</template>
