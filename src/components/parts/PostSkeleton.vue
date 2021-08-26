<template>
  <div class="post-wrapper">
    <div class="user px-3 py-4">
      <div class="d-flex align-items-center mb-3">
        <img class="user__pp bg-skeleton" />
        <div class="user__details ">
          <p class="bg-skeleton-sm"></p>
          <p class="bg-skeleton-sm"></p>
        </div>
      </div>
      <div class="d-flex justify-items-center mb-3"></div>
      <div class="user__post-image bg-skeleton mb-3" />
      <div class="user__post">
        <p class="bg-skeleton-sm"></p>
      </div>
      <div class="user__stats">
        <div class="bg-skeleton-sm" />
      </div>
      <div class="user__options">
        <div class="col">
          <div class="icon bg-skeleton">
            <span class="material-icons mx-2 d-inline-block">
              thumb_up_off_alt
            </span>
          </div>
        </div>
        <div class="col mx-3">
          <div class="icon bg-skeleton">
            <span class="material-icons mx-2 d-inline-block">
              mode_comment
            </span>
          </div>
        </div>
        <div class="col">
          <div class="icon bg-skeleton">
            <span class="material-icons mx-2 d-inline-block">
              share
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
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
      padding: 10rem;
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
