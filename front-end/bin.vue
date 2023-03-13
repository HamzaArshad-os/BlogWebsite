
<template>
  <br>
  <router-link to="/"><button v-on:click="logout">Logout (will take you to HomeScreen)</button> </router-link>
  <br>
  <h1>Welcome to your Dashboard</h1>


  <div class="user_management">
    <h2 class="Section_title"> User Management</h2>
    <div class="function">
      <h3 class="Section_subtitle">See list of all users</h3>
      <div id="submitted__list_users">
        <button v-on:click="getallusers">press to see all users</button>


        <ul class="list_style">
          <li v-for="user in users" :key="user.id">
            <router :to="'/users/'">
              {{ user.user_id + " " + user.first_name + " " + user.last_name + " " + user.email + " " + user.password }}
            </router>
          </li>
        </ul>
      </div>
      <div class="errorlocation" v-if="error1">
        {{ error1 }}
      </div>
    </div>
    <div class="function">
      <h3>Add new user</h3>
      <form @submit.prevent="newUser">
        <label for="new_user_first_name">first name:</label>
        <input v-autowidth type="Text" name="new_user_first_name" v-model="new_user_first_name">
        <div v-show="submitted_new_user && !new_user_first_name"> First Name is required</div>
        <br><br>
        <label for="new_user_last_name">last name:</label>
        <input type="Text" name="new_user_last_name" v-model="new_user_last_name">
        <div v-show="submitted_new_user && !new_user_last_name"> Last name is required</div>
        <br><br>
        <label for="new_user_email">Email:</label>
        <input type="email" name="new_user_email" v-model="new_user_email">
        <div v-show="submitted_new_user && !new_user_email"> Email is required</div>
        <br><br>
        <label for="new_user_password">Password:</label>
        <p>Password should be a mimimum length of 7 , max of 15, Include atleast1 capital letter 1 lowercase ,1 special
          Character and 1 Number</p>
        <input type="password" id="new_user_password" name="new_user_password" v-model="new_user_password">
        <div v-show="submitted_new_user && !new_user_password"> Password is required</div>
        <br><br>

        <button>Signup new user</button>

      </form>
      <p v-if="submitted_new_user"> New User created</p>
    </div>

    <div class="errorlocation" v-if="error2">
      {{ error2 }}
    </div>








    <div class="article_management">
      <h2 class="Section_title">Article Management</h2>
      <div class="function">
        <h3>Get Single Article</h3>
        <form @submit.prevent="getSingleArticle(article_id)">
          <label for="article_id">Article ID::</label>
          <input type="Text" name="article_id" v-model="article_id">
          <div v-show="submitted_Single_Article && !article_id"> ID is required</div>
          <br><br>
          <router-link :to="'/article/' + article.article_id">
            <p v-if="submitted_Single_Article">{{ article.article_id + ". " + article.title + ' by ' + article.author }}
            </p>
          </router-link>

          <br>
          <button>Get single article</button>

        </form>
        <div class="errorlocation" v-if="error3">
          {{ error3 }}
        </div>

      </div>

      <div class="function">
        <h3>Get All Articles</h3>
        <div>


          <div v-if="showallarticles">
            <button v-if="showallarticles" @click="showallarticles = false"> Hide Articles </button>
            <ul v-if="articles.length">
              <li v-for="article in articles" :key="article.article_id">
                <router-link :to="'/article/' + article.article_id">
                  {{ article.article_id + ". " + article.title + ' by ' + article.author }}
                </router-link>
              </li>

            </ul>

          </div>
          <button @click="getallArticles">Get All articles</button>

        </div>
        <div class="errorlocation" v-if="error4">
          {{ error4 }}
        </div>
      </div>
    </div>

    <div class="function">
      <h3>Add new Article</h3>
      <form @submit.prevent="newArticle">
        <label for="new_article_title">Article title:</label>
        <input type="Text" name="new_article_title" v-model="new_article_title">
        <div v-show="submitted_new_Article && !new_article_title"> Name is required</div>
        <br><br>
        <label for="new_article_author">Author name:</label>
        <input type="Text" name="new_article_author" v-model="new_article_author">
        <div v-show="submitted_new_Article && !new_article_author"> Author is required</div>
        <br><br>
        <label for="new_article">Text:</label>
        <input type="Text" name="new_article" v-model="new_article">
        <div v-show="submitted_new_Article && !new_article"> Text is required</div>
        <br><br>
        <button>Add new Article</button>
      </form>
      <p v-if="submitted_new_Article"> New article created , its id: {{ newarticleid }}</p>
     
      <div class="errorlocation" v-if="error5">
        {{ error5 }}
      </div>
    </div>
    <div class="function">
      <h3>Edit/Update Article</h3>

      <p>leaving inputs unedited will keep the old data</p>
      <form @submit.prevent="updateArticle">
        <label for="editing_article_id">Article ID::</label>
        <input type="Text" name="editing_article_id" v-model="editing_article_id">
        <div v-show="submitted_Edit_Article && !editing_article_id"> ID is required</div>

        <br><br>
        <p>Old title: {{ " "+ article.title }}</p>
        <label for="editing_article_title">New Article title:</label>
        <input type="Text" name="editing_article_title" v-model="editing_article_title">

        <br><br>
        <p>Old Author: {{ " "+article.author }}</p>
        <label for="editing_article_author">New Author name:</label>
        <input type="Text" name="editing_article_author" v-model="editing_article_author">

        <br><br>
        <p>Old Text {{ " "+article.article_text }}</p>
        <label for="editing_article_text">New Text:</label>

        <input type="Text" name="editing_article_text" v-model="editing_article_text">

        <br><br>

        <button>Edit Article / Also can be pressed to get all article information</button>

        <p v-if="submitted_Edit_Article"> Article has been updated</p>

      </form>
    </div>
    <div class="errorlocation" v-if="error6">
      {{ error6 }}
    </div>
    <div class="function">
      <h3>Delete Single Article</h3>
      <form @submit.prevent="deleteSingleArticle(deleting_article_id)">
        <label for="deleting_article_id">Article ID to delete:</label>
        <input type="Text" name="deleting_article_id" v-model="deleting_article_id">
        <div v-show="submitted_Single_Article_delete && !deleting_article_id"> ID is required</div>
        <br><br>
        <router>
          <p v-if="submitted_Single_Article_delete">Has be deleted</p>
        </router>
        <br>
        <button>Delete article</button>

      </form>
    </div>
    <div class="errorlocation" v-if="error7">
      {{ error7 }}
    </div>
  </div>

  <div class="comment_management">
    <h2 class="Section_title">Comment Management</h2>
    <div class="function">
      <h3>Get all comments for given article</h3>
      <p v-if="submitted_Single_Article_Comments">There are {{ comments.length }} comments</p>


      <div>
        <form @submit.prevent="getallCommentsforArticle(submitted_Single_Article_Comments_id)">
          <label for="submitted_Single_Article_Commenst_id">Add Aricle ID you want the comments for</label>
          <input type="text" v-model="submitted_Single_Article_Comments_id">
          <div v-show="submitted_Single_Article_Comments && !submitted_Single_Article_Comments_id"> input is required
          </div>
          <button>Get Comments</button>
        </form>

        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <router :to="'/article/' + submitted_Single_Article_Comments_id"
              v-if="submitted_Single_Article_Comment = true">
              <p> {{ comment.comment_id + ": " + comment.comment_text }}</p>
            </router>


          </li>

        </ul>
        <div class="errorlocation" v-if="error8">
          {{ error8 }}
        </div>
        <p v-if="submitted_Single_Article_Comments"> There is currently no comments for this article , Why dont you add
          one </p>
      </div>
      <div class="function">
        <h3>Add Comment</h3>
        <form @submit.prevent="addComment(comment_gen_id)">
          <label for="comment_gen_id">Article ID::</label>
          <input type="Text" name="comment_gen_id" v-model="comment_gen_id">
          <div v-show="submitted_comment_gen && !comment_gen_id"> ID is required</div>

          <br>
          <label for="comment_gen_text">New Comment here:</label>
          <input type="Text" name="comment_gen_text" v-model="comment_gen_text">
          <div v-show="submitted_comment_gen && !comment_gen_text"> Text is required</div>

          <br><br>
          <button>Add Comment</button>
        </form>
        <p v-if="submitted_comment_gen">Added Comment </p>
        <br>
        <div class="errorlocation" v-if="error9">
          {{ error9 }}
        </div>
      </div>
      <div class="function">
        <h3> Delete Comment</h3>
        <form @submit.prevent="deleteComment()">

          <label for="comment_del_id">Delete Comment id</label>
          <input type="Text" name="comment_del_id" v-model="comment_del_id">

          <div v-show="submitted_comment_del && !comment_del_id"> input is required</div>

          <button>Delete Comments</button>

        </form>

        <p v-if="submitted_comment_del"> Comment has been deleted with id {{ comment_del_id }}</p>

      </div>
      <div class="errorlocation" v-if="error10">
        {{ error10 }}
      </div>
    </div>
  </div>




</template>


<script>
import EmailValidator from 'email-validator'
import { userService } from '../../services/users.services'
import { articleService } from '../../services/article.services'
import { commentsService } from '../../services/comments.services'


export default {
  data() {
    return {
      users: {},
      articles: [],
      num_users: null,
      user: [],
      error1: "",
      error2: "",
      error3: "",
      error4: "",
      error5: "",
      error6: "",
      error7: "",
      error8: "",
      error9: "",
      error10: "",
      article: [],
      comments: [],
      num_comments: 0,
      comment: "",
      article_id: null,
      user_id: "",
      showallarticles: false,
      newuser_id: "",




      submitted__list_users: false,
      submitted_new_user: false,
      submitted_new_Article: false,
      submitted_Single_Article_delete: false,
      submitted_Edit_Article: false,
      submitted_Single_Article_Comment: false,

      new_user_first_name: "",
      new_user_last_name: "",
      new_user_email: "",
      new_user_password: "",
      new_article_title: "",
      new_article_author: "",
      new_article: "",
      newarticleid: "",

      editing_article_id: "",
      editing_article_title: "",
      editing_article_author: "",
      editing_article_text: "",

      deleting_article_id: "",
      submitted_Single_Article_Comments: false,

      submitted_comment_gen: false,
      submitted_comment_del: false,

      submitted_Single_Article_Comments_id: "",

      comment_gen_id: "",
      comment_gen_text: "",

      comment_del_id: "",
      comment_del_text: "",

    }

  },
  methods: {





    logout() {

      userService.logOut()
    },
    getallusers() {
      this.error1 = "";

      userService.listofallusers()
        .then((users) => {

          this.users = users
          this.submitted__list_users = true

        })
        .catch(error1 => this.error1 = error1)
    },

    newUser(e) {
      this.error2 = "";
      console.log("Hweert")
      console.log(localStorage.getItem("session_token"))
      ////

      const { new_user_first_name, new_user_last_name, new_user_email, new_user_password, newuser_id } = this
      console.log(new_user_first_name)
      console.log(e)

      try {
        userService.addNewUser(new_user_first_name, new_user_last_name, new_user_email, new_user_password)
          .then((res) => {
            this.newuser_id = res
            this.submitted_new_user = true
          })
          .catch(error2 => this.error2 = error2)
      }
      catch (err) {

      }

    },



    getSingleArticle(givenid) {

      this.error3 = "";
      console.log(this.submitted_Single_Article)

      console.log(this.submitted_Single_Article)
      articleService.getOne(givenid)
        .then((article) => {
          this.submitted_Single_Article = true
          this.article = article

        })
        .catch(error3 => this.error3 = error3); {

      }
    },

    getallArticles() {
      this.error4 = "";
      articleService.getAll()
        .then(articles => {
          this.showallarticles = true;
          this.articles = articles

        })
        .catch(error4 => this.error4 = error4)
    },

    newArticle(e) {
      this.error5 = "";
      console.log(this.submitted_new_Article)

      console.log(this.submitted_new_Article)
      ////

      const { new_article_author, new_article_title, new_article, newarticleid } = this
      console.log("test")

      articleService.addNewArticle(new_article_title, new_article_author, new_article)
        .then((response) => {
          this.newarticleid = response.article_id;

          this.submitted_new_Article = true
        })
        .catch(error5 => this.error5 = error5)


    },


    updateArticle(e) {



      ////

      this.error6 = ""
      const { editing_article_id, editing_article_author, editing_article_title, editing_article_text } = this
      articleService.getOne(editing_article_id)

        .then((article) => {

          this.article = article
          this.submitted_Edit_Article = true
          console.log("ddddd")
          console.log(article.author)
          console.log("ddddddfggggdddd")
          console.log(article.article_text)
          console.log("ddddddddd")
          console.log(editing_article_author)

          if (this.editing_article_author.length == 0) {
            console.log("llll")
            this.editing_article_author = this.article.author
          }
          if (this.editing_article_title.length == 0) {
            this.editing_article_title = this.article.title
          }
          if (this.editing_article_text.length == 0) {
            this.editing_article_text = this.article.article_text
          }
          console.log(this.article.author, this.article.title, this.article.article_text)
          console.log("/////////////")
          console.log(editing_article_author, editing_article_title, editing_article_text)
          articleService.editArticle(this.editing_article_id, this.editing_article_title, this.editing_article_author, this.editing_article_text)
            .then((response) => {
              submitted_Edit_Article = true
            })
            .catch(error6 => this.error6 = error6)

        })
        .catch(error6 => this.error6 = error6)



    },
    deleteSingleArticle(givenid) {
      this.error7 = "";
      console.log(this.submitted_Single_Article_delete)


      articleService.DeleteArticle(givenid)
        .then((article) => {
          this.submitted_Single_Article_delete = true


        })
        .catch(error7 => this.error7 = error7)
    },
    getallCommentsforArticle(givenid) {
      this.error8 = ""


      commentsService.getAllComments(givenid)
        .then((comments) => {
          this.comments = comments
          this.num_comments = comments.length
          this.submitted_Single_Article_Comment = true
        })
        .catch(error8 => this.error8 = error8)





    },
    addComment(givenid) {
      this.error9 = ""

      const { comment_gen_text, comment_gen_id } = this

      console.log("Worked")
      commentsService.PostComment(givenid, comment_gen_text, comment_gen_id)
        .then((response) => {
          //comment_gen_id = response.comment_id
          this.submitted_comment_gen = true
          // console.log(response.comment_id)

        })
        .catch(error9 => this.error9 = error9)
    },


    deleteComment(givenid) {
      this.error10 = ""

      const { comment_del_id } = this
      console.log("---------")
      console.log(givenid)
      commentsService.DeleteComment(comment_del_id)

        .then((comment) => {
          this.submitted_comment_del = true
          //this.comments = comments
          //this.num_comments = comments.length
        })
        .catch(error10 => this.error10 = error10)
    },



  }

}


</script>



<style >
h2 {
  text-decoration: underline;
  text-align: center;

}

h3 {
  text-decoration: underline;


}



input[type="text"] {
  width: auto;
}


.list_style {
  list-style-type: none;
}

.function {
  display: grid;

}

.errorlocation {
  color: red;
}
</style>


