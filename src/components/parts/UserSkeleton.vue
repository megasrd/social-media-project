<template>
  <div class="col-lg-4 col-md-6 mb-3">
    <div class="user-wrapper px-2 py-3">
      <div class="row">
        <div class="col-3">
          <div class="pp bg-skeleton" />
        </div>
        <div class="col-8">
          <h3 class="name">
            <p class="bg-skeleton-sm"></p>
            <p class="bg-skeleton-sm"></p>
            <p class="bg-skeleton-sm"></p>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/assets/scss/_variables.scss";
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
    height: 70px;
    width: 70px;
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
}
</style>
