<script>
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    scroll() {
      if (process.client) window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    onScroll() {
      this.showNavbar = false
      setTimeout(() => {
        this.showNavbar = true
      }, 4000);


    }
  }
}
</script>

<template>
  <div class="fixed-bottom d-flex p-4 justify-content-end">
    <div class="scroll p-2 d-flex justify-content-center align-items-center bg-dark text-white rounded-circle"
      :class="{ 'scroll--hidden': !showNavbar }" @click="scroll">
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll {
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  transform: translate(100px, 0);
}

.fa {
  font-size: 32px;
  font-weight: bold;
  margin-top: -1px;
}

.fa::before {
  margin-bottom: 4px;
}

.scroll--hidden {
  transform: translate(0, 0);
}
</style>