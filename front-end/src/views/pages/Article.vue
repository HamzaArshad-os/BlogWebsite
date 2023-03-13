<template>

  <div :class="theme">
    <div class="container text-right">
      <button @click="toggleTheme">Toggle Dark Mode</button>
    
    </div>
    
    <div class="container text-center">
      <div class="border border-dark">
        <h1>{{ article.article_id }}</h1>
        <em v-if="loading"> Loading article</em>
        <div class="row">
          <h2>{{ article.title + ' by ' + article.author }}</h2>
          <div class="col">
            <p>{{ article.article_text }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container text-center">
      <h2>Comments</h2>
      <p>There are {{ comments.length }} comments</p>
      <div class="row">
    
        <div class="col">
          <div class="border border-dark">
            <div>
              <ul>
                <ul v-for="comment in comments" :key="comment.id">
                  <router :to="'/article/' + submitted_Single_Article_Comments_id"
                    v-if="submitted_Single_Article_Comment = true">
                    <p> {{ comment.comment_id + ": " + comment.comment_text }}</p>
                  </router>
    
    
                </ul>
    
              </ul>
            </div>
            <div>
              <form @submit.prevent="handleSubmit">
    
                <label for="text">Add Comment</label>
                <input type="text" v-model="comment">
                <div v-show="submitted_comment_gen && !comment"> input is required</div>
    
                <button>Submit Comment</button>
              </form>
            </div>
            <p v-if="submitted_comment_gen">Added Comment </p>
          </div>
          <div class="errorlocation" v-if="error">
              {{ error }}
          </div>
    
          <div>
            <br>
            <p>Please Login to Delete Comments</p>
          </div>
        </div>
    
    
      </div>
    </div>
  </div>



</template>
<script>
import { articleService } from '../../services/article.services.js'
import { commentsService } from '../../services/comments.services.js'

export default {
  data() {
    return {
      article: {},
      comments: [],
      num_comments: null,
      comment: "",
      error: "",
      theme: 'light',

      submitted_comment_gen: false
    }

  },


  created() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    }


    articleService.getOne(this.$route.params.id)
      .then((article) => {
        this.article = article;
        commentsService.getAllComments(this.$route.params.id)
          .then((comments) => {
            this.comments = comments 
            this.num_comments = comments.length
          })
          .catch(error => this.error = error)

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

    handleSubmit(e) {
      this.submitted_comment = true
      const { comment, comments } = this
      //if (!(ItemValidator.validate(comment))) {
      //  this.error = "Item name must be valid"
      //  return;
      //}
      // else {

      //}
      console.log("Worked")
      commentsService.PostComment(this.$route.params.id, comment)
        .then((comments) => {
          this.comments = comments
          this.submitted_comment_gen == true
          this.num_comments = comments.length
        })
        .catch(error => this.error = error)


    }

  }

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