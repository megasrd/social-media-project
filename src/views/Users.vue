<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12 col-12">
        <div class="row justify-content-end mb-3">
          <div class="col-lg-4 col-6">
            <div class="sort-wrapper">
              <label> Sort (A-Z) </label>
              <div class="sorter">
                <select @change="sortA_Z(users.data, sort)" v-model="sort">
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
        <div class="users-container">
          <div class="row ">
            <div class="col-12 mb-2">
              <h3 class="heading-2">User Profiles</h3>
            </div>
            <div class="col-12 mb-4">
              <div class="search-bar">
                <span class="material-icons">
                  search
                </span>
                <input
                  @keyup="submitSearch()"
                  v-model="searchQuery"
                  placeholder="Search"
                  aria-placeholder="Search"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <template v-if="searchQuery.length > 1">
                  <template v-if="Object.keys(searchResults).length > 0">
                    <template v-for="(item, key) in searchResults">
                      <div :key="key" class="col-lg-4 col-md-6 mb-3">
                        <div class="user-wrapper px-2 py-3">
                          <div class="row">
                            <div class="col-3">
                              <router-link :to="'/user/' + item.user_id">
                                <img :src="item.picture" class="pp" />
                              </router-link>
                            </div>
                            <div class="col-8">
                              <h3 class="name">
                                {{ item.name }}
                              </h3>
                              <router-link :to="'/user/' + item.user_id">
                                <button class="button">View Profile</button>
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <div class="px-3">Oops no results</div>
                  </template>
                </template>
                <template v-else>
                  <template v-if="Object.keys(users).length > 0">
                    <template v-for="(value, key) in users.data">
                      <div :key="key" class="col-lg-4 col-md-6 mb-3">
                        <div class="user-wrapper px-2 py-3">
                          <div class="row">
                            <div class="col-3">
                              <img :src="value.picture" class="pp" />
                            </div>
                            <div class="col-8">
                              <h3 class="name">
                                {{ value.firstName }} {{ value.lastName }}
                              </h3>
                              <router-link :to="'/user/' + value.id">
                                <button class="button">View Profile</button>
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
.search-bar {
  display: flex;
  align-items: center;
  justify-items: flex-start;
  .material-icons {
    position: absolute;
    margin-left: 10px;
  }
  input[type="text"] {
    background: #f1faff;
    border-radius: 32px;
    border: 1px solid #b8b8b8;
    padding: 0.4rem 1rem 0.4rem 3rem;
    width: 100%;
    &:active,
    &:focus {
      outline: none;
    }
  }
}
.users-container {
  background: #fff;
  border-radius: 12px;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.user-wrapper {
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgb(211, 211, 211);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  .pp {
    cursor: pointer;
    border-radius: 100%;
    height: 65px;
    width: 65px;
    background: #494949;
    margin-right: 12px;
    opacity: 1;
    transition: opacity ease-in 0.2s;
    &:hover {
      opacity: 0.5;
      transition: opacity ease-out 0.2s;
    }
  }
  .name {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
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
</style>
<script>
import axios from "axios";
import Flexsearch from "flexsearch";
import UserSkeleton from "../components/parts/UserSkeleton";
export default {
  components: {
    UserSkeleton
  },
  data() {
    return {
      index: null,
      users: "",
      userNames: [],
      searchResults: [],
      searchQuery: "",
      sort: "a-z"
    };
  },
  mounted() {
    axios.get("https://dummyapi.io/data/api/user?limit=10").then(response => {
      this.users = response.data;
      this.index = new Flexsearch({
        tokenize: "forward",
        doc: {
          id: "id",
          field: ["name", "user_id", "picture"]
        }
      });
      let output = Object.entries(response.data.data).map(([id, value]) => ({
        id,
        name: value.firstName + " " + value.lastName,
        user_id: value.id,
        picture: value.picture
      }));
      this.index.add(output);
    });
  },
  methods: {
    sortA_Z(obj, dir) {
      obj.sort(function(a, b) {
        let textA = a.firstName;
        let textB = b.firstName;
        if (dir === "a-z") {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else if (dir === "z-a") {
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        }
      });
    },
    submitSearch() {
      if (this.index === null || this.searchQuery.length < 2) return [];
      this.searchResults = this.index.search({
        query: this.searchQuery,
        limit: 10
      });
    }
  }
};
</script>
