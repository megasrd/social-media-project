<template>
  <div class="container">
    <div class="col-lg-5 col-md-6 col-sm-12">
      <PostSkeleton />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostSkeleton from "@/components/parts/PostSkeleton.vue";

export default {
  name: "Home",
  components: {
    PostSkeleton
  },
  data() {
    return {
      userData: {
        id: 2315,
        name: "Regan",
        surname: "Duthie",
        profile_pic:
          "https://i.pinimg.com/originals/5f/0a/b3/5f0ab32d79f86039815fd5f755fd7783.png",
        favorite: true,
        category: "personal"
      }
    };
  }
};
</script>
