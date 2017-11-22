<template>
  <div>
    <h2>your post</h2>
    <transition-group class="columns is-gapless is-multiline" name="fade" tag="ul">
      <li class="column is-3" v-for="post in posts" v-bind:key="post.title.rendered">
        <a :href="post.link">
          <div class="card">
            <div class="card-image">
              <figure class="image is-16by9">
                <template v-if="post._embedded['wp:featuredmedia']">
                  <img :src="post._embedded['wp:featuredmedia'][0].source_url" alt="">
                </template>
                <template v-else="">
                  <img src="https://source.unsplash.com/1600x900/?web,develop" alt="">
                </template>
              </figure>
            </div>
            <div class="card-content">
              <h2 class="content">
                {{post.title.rendered}}
              </h2>
            </div>
          </div>
        </a>
      </li>
    </transition-group>
    <button
      class="button is-primary"
      :class="[{
        'is-loading': loading,
        'is-desabled': disabled
      }]"
      :disabled="disabled"
      @click="load"
    >load more</button>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>

<script>

  import axios from 'axios';

  export default {

    data: function() {

      return {
        posts: [],
        page: 0,
        loading: false,
        disabled: false,
      }

    },

    mounted: function() {

      this.page = 1;

    },

    watch: {

      page() {

        const url = `https://webmanab-html.com/wp-json/wp/v2/tip?page=${this.page}&_embed`;

        (async () => {

          try {

            const res = await axios.get(url);

            this.posts = this.posts.concat(res.data);
            this.loading = false;

          } catch (error) {

            console.log(error);
            this.empty();

          }

        })();

      }

    },

    methods: {

      load() {

        this.loading = true;
        this.page++;

      },

      empty() {

        this.loading = false;
        this.disabled = true;

      }

    },

  }

</script>
