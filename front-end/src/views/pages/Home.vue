

<template >
<div :class="theme">
  <div class="container text-right">
    <button @click="toggleTheme">Toggle Dark Mode</button>
  </div>
  <br>
  <div class="container text-center">
    <h1>Welcome to Article.net</h1>
    <div class="row">
      <h4> See our list of articles or search by id</h4>
      <div class="col">
        <div class="border border-dark">
          <form @submit.prevent="getSingleArticle(article_id)">
            <label for="article_id">Article ID:</label>
            <input type="Text" name="article_id" v-model="article_id">
            <div v-show="submitted_Single_Article && !article_id"> ID is required</div>
  
  
            <div v-if="submitted_Single_Article">
              <router-link :to="'/article/' + article.article_id">
                <p>{{ article.article_id + ". " + article.title + ' by ' + article.author }} </p>
              </router-link>
            </div>
            <br>
            <button>Get single article</button>
          </form>
          <div v-if="error">
            {{ error }}
          </div>
  
  
        </div>
  
      </div>
      <div class="col">
        <div class="border border-dark">
          <em v-if="loading"> Loading articles</em>
  
          <ul v-if="articles.length">
            <ul v-for="article in articles" :key="article.article_id">
              <router-link :to="'/article/' + article.article_id">
                {{ article.article_id + ". " + article.title + ' by ' + article.author }}
              </router-link>
            </ul>
  
          </ul>
  
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </div>
  
    </div>
  </div>

</div>






  
   




</template>


<script>
import { articleService } from "../../services/article.services"

export default {
  data() {
    return {
      articles: [],
      article: [],
      error: "",
      loading: true,
      submitted_Single_Article: false,
      theme: 'light',
    }
  },

  mounted() {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    }

    articleService.getAll()
      .then(articles => {
        this.articles = articles
        this.loading = false
      })
      .catch(error => this.error = error)
  },
  methods: {

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
    beforeDestroy() {
      localStorage.removeItem('theme');
    },
    getSingleArticle(givenid) {
      
      articleService.getOne(givenid)
        .then((article) => {
          this.submitted_Single_Article =true
          this.article = article
          console.log(article)

        })
        .catch(error => this.error = error)
    },

  }
}




components: {

}

</script>

<style>
.light {
  background-color: white;
  color: black;
}

.dark {
  background-color: black;
  color: white;
}
</style>
