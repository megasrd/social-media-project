<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12 col-12">
        <div class="row justify-content-end">
          <div class="col-12">
            <div
              class="d-flex flex-md-nowrap flex-wrap justify-content-md-between align-items-md-center justify-content-end align-items-end"
            >
              <div class="pagination_btns my-md-0 my-3">
                <input
                  :class="param == 1 ? 'disabled' : ''"
                  class="btn--primary"
                  type="button"
                  value="previous"
                  @click.prevent="previous()"
                />
                <input
                  class="btn--secondary"
                  type="button"
                  value="next"
                  @click.prevent="next()"
                />
              </div>
              <div class="sort-wrapper">
                <label> Sort (A-Z) </label>
                <div class="sorter">
                  <select @change="sortA_Z(posts.data, sort)" v-model="sort">
                    <option value="a-z"> Ascending </option>
                    <option value="z-a"> Descending </option>
                  </select>
                  <span class="material-icons">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="Object.keys(posts).length > 0">
      <transition-group
        class="row justify-content-center"
        tag="div"
        appear
        name="fade"
        mode="out-in"
      >
        <template v-for="(value, key) in posts.data">
          <div :key="key" class="col-lg-5 col-md-12 col-sm-12">
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
            />
          </div>
        </template>
      </transition-group>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-sm-12">
          <PostSkeleton />
        </div>
        <div class="col-lg-5 col-md-6 col-sm-12">
          <PostSkeleton />
        </div>
        <div class="col-lg-5 col-md-6 col-sm-12">
          <PostSkeleton />
        </div>
        <div class="col-lg-5 col-md-6 col-sm-12">
          <PostSkeleton />
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
.btn {
  &--primary,
  &--secondary {
    padding: 0.6rem 1.2rem;
    margin-right: 12px;
    border-radius: 8px;
    width: 110px;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
  &--primary {
    border: 2px solid $main-color;
    color: $main-color;
    background: none;
  }
  &--secondary {
    background: $main-color;
    border: 2px solid $main-color;
    color: #fff;
    @extend %ripple-fx;
  }
  &--primary.disabled {
    border: 2px solid $disabled-color;
    color: $disabled-color;
    pointer-events: none;
  }
}
</style>
<script>
import axios from "axios";
import Post from "@/components/parts/Post.vue";
import PostSkeleton from "@/components/parts/PostSkeleton.vue";
export default {
  components: {
    Post,
    PostSkeleton
  },
  data() {
    return {
      posts: "",
      sort: "a-z",
      param: 1,
      limit: 10,
      page_total: 0,
      page_offset: 0,
      tags: []
    };
  },
  methods: {
    sortA_Z(obj, dir) {
      obj.sort(function(a, b) {
        let textA = a.owner.firstName;
        let textB = b.owner.firstName;
        if (dir === "a-z") {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else if (dir === "z-a") {
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        }
      });
    },
    previous() {
      if (this.page_offset === 0) {
        this.$router.push("/feed/1");
      } else {
        let incr = this.param;
        incr--;
        this.$router.push("/feed/" + incr);
      }
    },
    next() {
      if (this.page_offset < this.page_total) {
        let incr = this.param;
        incr++;
        this.$router.push("/feed/" + incr);
      }
    }
  },
  mounted() {
    if (this.$route.params.page === undefined) {
      this.$router.push("/feed/1");
    } else {
      this.param = this.$route.params.page;
    }
    axios
      .get("https://dummyapi.io/data/api/post?page=" + this.param + "&limit=6")
      .then(response => {
        this.posts = response.data;
        this.page_total = response.data.total;
        this.page_offset = response.data.offset;
      });
    axios.get("https://dummyapi.io/data/api/tag?limit=10").then(response => {
      this.tags = response.data;
    });
  }
};
</script>
