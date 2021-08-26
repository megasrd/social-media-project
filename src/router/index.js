import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import UserProfile from "../views/template/UserProfile.vue";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Posts
  },
  {
    path: "/feed/:page?",
    name: "Posts",
    component: Posts
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/user/:id",
    name: "User Profile",
    component: UserProfile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
