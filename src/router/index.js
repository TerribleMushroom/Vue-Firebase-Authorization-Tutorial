import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      meta: {
        protected: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    // If the user is already found, then the firebase is initialized.
    //  In this case, simply return the user.
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }
    // The user is not found, hence listen to the change
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener(); // After initialized, remove the listner for better JS memory management
        resolve(user); // return user. If the user is not logged in, this will be null.
      },
      reject
    );
  });
}

router.beforeEach(async (to, from, next) => {
  // Initalize firebase if the route requires auth
  if (to.meta.protected) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }

  // Always call next() other wise Vue will never proceed further
});

export default router;
