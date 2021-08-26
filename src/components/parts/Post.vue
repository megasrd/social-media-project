<template>
  <div class="post-wrapper">
    <div class="user px-3 py-4">
      <div class="d-flex align-items-center mb-3">
        <img @mouseover="flavor = true" :src="pp" class="user__pp" />
        <div
          @mouseleave="flavor = false"
          :class="flavor ? 'show' : 'hidden'"
          class="flavor-card"
        >
          <div class="row justify-items-start">
            <div class="col-4">
              <img class="pp" :src="pp" />
            </div>
            <div class="col-6">
              <h3 class="name mb-4">{{ firstName }} {{ lastName }}</h3>
              <router-link :to="'/user/' + id">
                <button class="button">View Profile</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="user__details">
          <p class="mb-1">{{ firstName }} {{ lastName }}</p>
          <p class="date mb-0">{{ convertDate(pubDate) }}</p>
        </div>
      </div>
      <div class="d-flex justify-items-center mb-3">
        <span v-for="(item, key) in tags" :key="key" class="category">
          {{ item }}
        </span>
      </div>
      <img :src="image" :alt="post_copy" class="user__post-image mb-3" />
      <div class="user__post">
        <p>
          {{ post_copy }}
        </p>
      </div>
      <div class="user__stats">
        <span class="material-icons">
          favorite_border
        </span>
        {{ likes }} Likes
      </div>
      <div class="user__options">
        <div class="col">
          <div class="icon">
            <span class="material-icons mx-2 d-inline-block">
              thumb_up_off_alt
            </span>
            <span class="d-md-block d-none"> Like </span>
          </div>
        </div>
        <div class="col mx-3">
          <div
            @click.prevent="
              s_loader = true;
              getComments();
            "
            class="icon"
          >
            <span class="material-icons mx-2 d-inline-block">
              mode_comment
            </span>
            <span class="d-md-block d-none"> Comments </span>
          </div>
        </div>
        <div class="col">
          <div class="icon">
            <span class="material-icons mx-2 d-inline-block">
              share
            </span>
            <span class="d-md-block d-none"> Share </span>
          </div>
        </div>
      </div>
      <sLoader v-if="toggleComment" />
      <div v-if="comments != null">
        <div class="comments mt-3" v-if="comments.total > 0">
          <template v-for="(comment, key) in comments.data">
            <div :key="key" class="comments__wrapper">
              <div class="row align-items-center">
                <div class="col-lg-2 col-md-3 col-3">
                  <router-link :to="'/user/' + comment.owner.id">
                    <img class="pp" :src="comment.owner.picture" />
                  </router-link>
                </div>
                <div class="col-lg-10 col-md-9 col-9">
                  <router-link :to="'/user/' + comment.owner.id">
                    <h4 class="user-name">
                      {{ comment.owner.firstName }}
                      {{ comment.owner.lastName }}
                    </h4>
                  </router-link>
                  <p class="message">{{ comment.message }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="mt-4" v-else-if="comments.data.length === 0">
          Oops no comments
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
.flavor-card.show {
  display: block;
}
.flavor-card.hidden {
  display: none;
}
.flavor-card {
  padding: 1rem;
  position: absolute;
  background: #fff;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #afafaf;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 350px;
  margin-top: 60px;
  .name {
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }
  .pp {
    height: 80px;
    width: 80px;
    border-radius: 100%;
  }
  .button {
    margin-top: 12px;
    display: block;
    margin-right: auto;
    text-align: left;
    text-decoration: none;
    border: none;
    background: $main-color;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 24px;
    @extend %ripple-fx;
  }
}
.post-wrapper {
  margin: 18px auto 0 auto;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  .user {
    &__pp {
      cursor: pointer;
      border-radius: 100%;
      height: 45px;
      width: 45px;
      background: #494949;
      margin-right: 12px;
      opacity: 1;
      transition: opacity ease-in 0.2s;
      &:hover {
        opacity: 0.5;
        transition: opacity ease-out 0.2s;
      }
    }
    &__details {
      font-size: 12px;
      font-weight: bold;
      color: #2c2c2c;
      text-align: left;
      .date {
        font-weight: 400;
      }
    }
    &__post-image {
      width: 100%;
      border-radius: 12px;
      background: #333333;
      object-fit: contain;
    }
    &__post {
      p {
        font-weight: 400;
        font-size: 14px;
        text-align: left;
      }
    }
    &__stats {
      display: flex;
      align-items: center;
      text-align: left;
      .material-icons {
        margin-right: 6px;
        font-size: 22px;
      }
    }
    &__options {
      display: flex;
      align-items: center;
      margin-top: 21px;
      padding-top: 16px;
      border-top: 1px solid gray;
      .icon {
        background: $main-color;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 14px;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        color: #fff;
        .material-icons {
          font-size: 18px;
        }
        @extend %ripple-fx;
      }
    }
    .category {
      display: inline-block;
      margin-right: 12px;
      padding: 5px 15px;
      background: $main-color;
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 32px;
      @extend %ripple-fx;
    }
  }
}
.comments {
  &__wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    border: 1px solid #e5e5e5;
    background: #fff;
    border-radius: 16px;
    padding: 0.7rem;
    margin-bottom: 1rem;
    .pp {
      @media screen and (min-width: 425px) {
        height: 55px;
        width: 55px;
      }
      cursor: pointer;
      border-radius: 100%;
      background: #494949;
      opacity: 1;
      transition: opacity ease-in 0.2s;
      &:hover {
        opacity: 0.5;
        transition: opacity ease-out 0.2s;
      }
    }
    .user-name {
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: #5458f7;
      margin: 0;
    }
    .message {
      text-align: left;
      margin: 0;
    }
  }
}
</style>
<script>
import axios from "axios";
import sLoader from "../SmallLoader";
export default {
  components: {
    sLoader
  },
  props: {
    pp: {
      type: String,
      default: ""
    },
    firstName: {
      type: String,
      default: "John"
    },
    lastName: {
      type: String,
      default: "Doe"
    },
    post_copy: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    pubDate: {
      type: String,
      default: ""
    },
    tags: {
      type: Array
    },
    likes: {
      type: Number
    },
    id: {
      type: String
    },
    post_id: {
      type: String
    }
  },
  data() {
    return {
      flavor: false,
      toggleComment: false,
      comments: null,
      s_loader: false
    };
  },
  methods: {
    convertDate(date) {
      let time = new Date(date);
      return "Published: " + time.toLocaleString();
    },
    getComments() {
      this.s_loader = true;
      if (this.toggleComment === false) {
        this.toggleComment = true;
        axios
          .get(
            "https://dummyapi.io/data/api/post/" +
              this.post_id +
              "/comment?limit=10"
          )
          .then(response => {
            this.comments = response.data;
            this.s_loader = false;
            this.toggleComment = false;
          });
      } else {
        this.toggleComment = false;
      }
    }
  }
};
</script>
