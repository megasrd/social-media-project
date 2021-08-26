<template>
  <div class="container">
    <div v-if="ready">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div class="user-wrapper">
            <div class="bg" />
            <img class="pp" :src="user_data.picture" />
            <div class="px-3 py-4">
              <h3 class="user-name">
                {{ user_data.title }}. {{ user_data.firstName }}
                {{ user_data.lastName }}
              </h3>
              <p class="date-registered">
                Joined {{ convertDate(user_data.registerDate) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="user-wrapper px-3 py-4">
            <h2 class="heading-2 mb-3">User Information</h2>
            <ul class="user-info">
              <li class="text-capitalize mb-2">
                <span class="material-icons"> account_circle </span>
                {{ user_data.gender }}
              </li>
              <li class="mb-2">
                <span class="material-icons">
                  cake
                </span>
                {{ convertDate(user_data.dateOfBirth) }}
              </li>
              <li class="mb-2">
                <span class="material-icons">
                  email
                </span>
                <a :href="'mailto:' + user_data.email" class="email">
                  {{ user_data.email }}
                </a>
              </li>
              <li class="mb-2">
                <span class="material-icons">
                  local_phone
                </span>
                {{ user_data.phone }}
              </li>
            </ul>
          </div>
          <div class="user-wrapper px-3 py-4">
            <h2 class="heading-2 mb-3">Recent Photos</h2>
            <div class="recent-photos">
              <template v-for="(value, key) in recent_images.data">
                <img :key="key" :src="value.image" class="image" />
              </template>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <template v-for="(value, key) in user_post_data.data">
            <Post
              :key="key"
              :pp="value.owner.picture"
              :firstName="value.owner.firstName"
              :lastName="value.owner.lastName"
              :post_copy="value.text"
              :image="value.image"
              :pubDate="value.publishDate"
              :tags="value.tags"
              :likes="value.likes"
              :id="value.owner.id"
              :post_id="value.id"
              :ready="ready"
            />
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div class="user-wrapper">
            <div class="bg" />
            <div class="pp mx-auto bg-skeleton" />
            <div class="px-3 py-4">
              <h3 class="user-name bg-skeleton-sm"></h3>
              <p class="date-registered bg-skeleton-sm"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="user-wrapper px-3 py-4">
            <h2 class="heading-2 mb-3">User Information</h2>
            <ul class="user-info">
              <li class="bg-skeleton-sm ml-auto mb-2" />
              <li class="bg-skeleton-sm ml-auto mb-2" />
              <li class="bg-skeleton-sm ml-auto mb-2" />
            </ul>
          </div>
          <div class="user-wrapper px-3 py-4">
            <h2 class="heading-2 mb-3">Recent Photos</h2>
            <div class="recent-photos">
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
              <div class="bg-skeleton py-5" />
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="bg-skeleton" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";

.user-wrapper {
  margin: 18px auto;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  .recent-photos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    .image {
      @media screen and (min-width: 425px) {
        height: 130px;
        width: 130px;
      }
      @media screen and (min-width: 768px) {
        height: 210px;
        width: 210px;
      }
      @media screen and (min-width: 1024px) {
        height: 120px;
        width: 120px;
      }

      cursor: pointer;
      opacity: 1;

      object-fit: cover;
      transition: 0.2s ease-in opacity;
      &:hover {
        transition: 0.2s ease-out opacity;
        opacity: 0.8;
      }
    }
  }
  .user-name {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
  }
  .date-registered {
    text-align: center;
    font-size: 0.8rem;
  }
  .user-info {
    text-align: left;
    font-size: 0.9rem;
    list-style: none;
    padding-left: 0;
    li {
      display: flex;
      align-items: center;
      .material-icons {
        margin-right: 8px;
      }
      strong {
        margin-right: 4px;
      }
    }
    .email {
      text-decoration: none;
      color: $main-color;
    }
  }
  .bg {
    width: 100%;
    background: $main-color;
    height: 150px;
  }
  .pp {
    height: 150px;
    width: 150px;
    border-radius: 100%;
    margin-top: -75px;
    border: 5px solid #fff;
    background-color: #fff;
  }
}
</style>
<script>
import axios from "axios";
import Post from "@/components/parts/Post.vue";
export default {
  components: {
    Post
  },
  data() {
    return {
      ready: false,
      user_data: "",
      user_post_data: "",
      recent_images: ""
    };
  },
  mounted() {
    axios
      .get("https://dummyapi.io/data/api/user/" + this.$route.params.id)
      .then(response => {
        this.user_data = response.data;
        this.ready = true;
        this.getUserData();
      });
    this.getRecentImages();
  },
  methods: {
    convertDate(date) {
      let time = new Date(date);
      return (
        time.toLocaleDateString("en-US", { day: "numeric" }) +
        " " +
        time.toLocaleDateString("en-US", { month: "long" }) +
        " " +
        time.toLocaleDateString("en-US", { year: "numeric" })
      );
    },
    getRecentImages() {
      axios
        .get(
          "https://dummyapi.io/data/api/user/" +
            this.$route.params.id +
            "/post?limit=9"
        )
        .then(response => {
          this.recent_images = response.data;
        });
    },
    getUserData() {
      axios
        .get(
          "https://dummyapi.io/data/api/user/" +
            this.user_data.id +
            "/post?limit=10"
        )
        .then(response => {
          this.user_post_data = response.data;
          this.ready = true;
        });
    }
  }
};
</script>
