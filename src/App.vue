<template>
	<div id="app">
    <Header />

    <main class="main">
      <VideosHeader />
      <Videos />
      <Sidebar />
    </main>

    <Footer />
	</div>
</template>

<script>
import VideosHeader from '@/components/VideosHeader.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import Videos from '@/components/Videos.vue';
import Header from '@/components/Header.vue';

import {mapActions} from 'vuex';

export default {
	name: 'App',
	components: {
    VideosHeader, Footer, Sidebar, Videos, Header
	},
  methods: {
    ...mapActions(['loadVideosData'])
  },
  created(){
    this.loadVideosData();
  }
};
</script>

<style lang="scss">
  @import './assets/scss/global.scss';
  @import './assets/scss/index.scss';

  html {
    background-color: $global-colors-background;
  }

  #app {
    position: relative;
  }

  .main {
    display: grid;

    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 28px;
    grid-template-rows: 120px 1fr auto;
    grid-template-areas:
      "sidebar sidebar sidebar header header header header header header header header header"
      "sidebar sidebar sidebar videos videos videos videos videos videos videos videos videos";

    width: $global-sizes-desktop_width;
    
    @include mobile {
      grid-template-columns: 1fr;
      grid-column-gap: 28px;
      grid-template-rows: 120px 1fr auto;
      grid-template-areas:
        "header"
        "videos";

      width: $global-sizes-mobile_width;
    }

    
    margin: 0 auto;
  }

</style>
