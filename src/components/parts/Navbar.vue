<template>
  <span>
    <div class="col-12 nav-bar px-4 py-3 mb-3">
      <div class="row align-items-center">
        <div class="col-4">
          <span
            @click.prevent="menu = !menu"
            class="float-start menu-icon material-icons"
          >
            menu
          </span>
        </div>
        <div class="col-4">
          <div class="logo">LOGO</div>
        </div>
        <div class="col-4">
          <div class="float-end">
            <div class="search-bar">
              <span class="material-icons">
                search
              </span>
              <input
                @click.prevent=""
                @keyup.prevent="submitSearch()"
                v-model="searchQuery"
                placeholder="Search"
                aria-placeholder="Search"
                type="text"
              />
            </div>
            <div v-if="searchQuery.length > 1" class="search-results">
              <template v-if="searchResults.length > 0">
                <template v-for="(item, key) in searchResults">
                  <router-link :key="key" :to="'/user/' + item.user_id">
                    <div class="item">
                      <img class="pp mr-1" :src="item.picture" />
                      <h3 class="name">{{ item.name }}</h3>
                    </div>
                  </router-link>
                </template>
              </template>
              <template v-else>
                Oops no results
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="menu ? 'open' : 'close'" class="menu">
      <span @click.prevent="menu = false" class="close-icon material-icons">
        menu_open
      </span>
      <div class="logo">LOGO</div>
      <div class="nav-menu">
        <router-link to="/feed">
          <div
            :class="currentRoute === 'Posts' ? 'current' : 'nope'"
            class="nav-menu__item"
          >
            <span class="material-icons">
              home
            </span>
            Home
          </div>
        </router-link>
        <router-link @click.prevent="menu = false" to="/users">
          <div
            :class="currentRoute === 'Users' ? 'current' : 'nope'"
            class="nav-menu__item"
          >
            <span class="material-icons">
              group
            </span>
            Users
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="menu" @click.prevent="menu = false" class="overlay" />
  </span>
</template>
<script>
import axios from "axios";
import Flexsearch from "flexsearch";
export default {
  data() {
    return {
      menu: false,
      index: null,
      users: "",
      userNames: [],
      searchResults: [],
      searchQuery: "",
      tags: []
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
    submitSearch() {
      if (this.index === null || this.searchQuery.length < 1) return [];
      this.searchResults = this.index.search({
        query: this.searchQuery,
        limit: 10
      });
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
%highlight {
  background: #363636;
}
.overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  appearance: none;
}
.search-bar {
  display: flex;
  align-items: center;
  justify-items: flex-start;
  width: 100%;
  margin-left: auto;
  transition: width 0.2s ease-in;
  &:active,
  &:focus {
    width: 100%;
  }
  .material-icons {
    position: absolute;
    margin-left: 10px;
  }
  input[type="text"] {
    background: #f1faff;
    border-radius: 32px;
    border: 1px solid #dfdfdf;
    padding: 0.4rem 1rem 0.4rem 3rem;
    width: 100%;
    transition: border 0.2s ease-in;
    &:active,
    &:focus {
      transition: border 0.2s ease-out;
      outline: none;
      border: 1px solid $main-color;
    }
  }
}
.search-results {
  padding: 1rem;
  position: absolute;
  right: 0;
  background: white;
  margin-top: 19px;
  width: 261px;
  max-height: 300px;
  overflow-y: auto;
  a {
    text-decoration: none;
    color: inherit !important;
    &:hover,
    &:focus {
      text-decoration: none;
      color: inherit;
    }
  }
  .item {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 0.8rem;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease-in;
    &:hover {
      transition: background 0.2s ease-out;
      background: #ebebeb;
    }
    .pp {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-right: 12px;
    }
    .name {
      text-align: left;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
}
.nav-menu__item.current {
  @extend %highlight;
  &:hover {
    background: #646464;
  }
}
.menu {
  background: #131313;
  z-index: 9999;
  padding: 1.5rem;
  position: fixed;
  top: 0;
  transition: left 0.3s ease-in-out;
  height: 100vh;
  width: 192px;
  .nav-menu {
    margin-top: 32px;
    a {
      text-decoration: none;
    }
    &__item {
      text-decoration: none;
      display: flex;
      justify-items: center;
      align-items: center;
      cursor: pointer;
      padding: 1rem;
      color: #fff;
      transition: background 0.2s ease-in;
      .material-icons {
        margin-right: 16px;
      }
      &:hover {
        @extend %highlight;
        transition: background 0.2s ease-in;
      }
    }
  }
  .logo {
    color: #fff;
    font-weight: 500;
    margin-top: 4px;
  }
  .close-icon {
    cursor: pointer;
    display: block;
    float: left;
    color: white;
  }
  @media (min-width: 426px) {
    width: 256px;
  }
}
.menu.close {
  left: -305px;
}
.menu.open {
  left: 0px;
}
.nav-bar {
  .menu-icon {
    cursor: pointer;
  }
  border-bottom: 3px solid $main-color;
  background: #ffffff;
  .logo {
    display: block;
    text-align: center;
    margin: 0 auto;
    color: #5e5e5e;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
