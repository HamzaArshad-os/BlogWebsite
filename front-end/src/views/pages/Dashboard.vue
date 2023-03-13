
<template>

  <div :class="theme">
      <div class="container text-right"  >
        <button @click="toggleTheme">Toggle Dark Mode</button>
        
      </div>
    <br>
    <router-link to="/"><button v-on:click="logout">Logout (will take you to HomeScreen)</button> </router-link>
    <br>
    <h1 class="row justify-content-md-center">Welcome to your Dashboard</h1>
    
    
    
    
    
    <div class="container text-center" id="User-management-section">
      <h2 class="Section-title"> User Management</h2>
      <div class="row justify-content-md-center" id="user_functions">
        <div class="col-md-auto" id="Seeallusers_function">
          <h3 class="Section_subtitle">See list of all users</h3>
          <div class="border border-dark">
            <button v-on:click="getallusers" v-if="!submitted__list_users">press to see all users</button>
            <button v-if="submitted__list_users" v-on:click="submitted__list_users= false">press to hide all users
              list</button>
            <div v-if="submitted__list_users">
              <ul class="list_style">
                <ul v-for="user in users" :key="user.id">
                  <router :to="'/users/'">
                    {{ user.user_id + " " + user.first_name + " " + user.last_name + " " + user.email + " "}}
                  </router>
                </ul>
              </ul>
            </div>
          </div>
          <div class="errorlocation" v-if="error1">
            {{ error1 }}
          </div>
        </div>
        <div class="col-md-auto" id="Addnewuser_function">
          <h3 class="Section_subtitle">Add new user</h3>
          <div class="border border-dark">
            <form  @submit.prevent="confirmnewuserfunction" >
              <div class="col-md-1">
                <label for="new_user_first_name">first name:</label>
                <input v-autowidth type="Text" name="new_user_first_name" v-model="new_user_first_name">
                <div v-show="submitted_new_user && !new_user_first_name"> First Name is required</div>
              </div>
              <div class="col-md-1">
                <label for="new_user_last_name">last name:</label>
                <input type="Text" name="new_user_last_name" v-model="new_user_last_name">
                <div v-show="submitted_new_user && !new_user_last_name"> Last name is required</div>
              </div>
              <div class="col-md-1">
                <label for="new_user_email">Email:</label>
                <input type="email" name="new_user_email" v-model="new_user_email">
                <div v-show="submitted_new_user && !new_user_email"> Email is required</div>
              </div>
              <div class="col-md-1">
                <label for="new_user_password">Password:</label>
    
                <input type="password" id="new_user_password" name="new_user_password" v-model="new_user_password">
                <div v-show="submitted_new_user && !new_user_password"> 
                </div>
              </div>
              <br>
              <button v-if="confirmnewuser == false">Signup new user</button>
              <div v-if="confirmnewuser">
                <div>
                  Are you sure you want to add a new user?
                  <button   @click="confirmnewuser = false; newUser()" >Yes</button>
                  <button @click="confirmnewuser =false ">No</button>
                </div>
              
              </div>
            </form>
            <p v-if="completed_new_user"> New User created</p>
          </div>
    
          <div class="errorlocation" v-if="error2">
            {{ error2 }} <p>Password should be a mimimum
              length of 7 , max of 15, Include atleast1 capital letter 1 lowercase ,1 special
              Character and 1 Number</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container text-center" id="Article-management-section">
      <h2 class="Section_title">Article Management</h2>
      <div class="row justify-content-md-center" id="article_functions">
        <div class="col-md-auto" id="GetAllArticles_function">
          <h3 class="Section_subtitle">List of all articles</h3>
          <div class="border border-dark">
            <div v-if="showallarticles">
              <button v-if="showallarticles" @click="showallarticles = false"> Hide Articles </button>
              <ul v-if="articles.length">
                <ul v-for="article in articles" :key="article.article_id">
                  <router-link :to="'/article/' + article.article_id">
                    {{ article.article_id + ". " + article.title + ' by ' + article.author }}
                  </router-link>
                </ul>
    
              </ul>
    
            </div>
            <button @click="getallArticles" on-click="">Get All articles</button>
    
          </div>
          <div class="errorlocation" v-if="error4">
            {{ error4 }}
          </div>
        </div>
        <div class="col-md-auto" id="GetSingleArticle_function">
          <h3 class="Section_subtitle">Get article by ID</h3>
          <div class="border border-dark">
            <form @submit.prevent="getSingleArticle(article_id)">
              <label for="article_id">Article ID::</label>
              <input type="Text" name="article_id" v-model="article_id">
              <div v-show="submitted_Single_Article && !article_id"> ID is required</div>
              <br>
              <router-link :to="'/article/' + article.article_id">
                <p v-if="submitted_Single_Article">{{ article.article_id + ". " + article.title + ' by ' + article.author }}
                </p>
              </router-link>
    
              <br>
              <button>Get single article</button>
    
            </form>
          </div>
          <div class="errorlocation" v-if="error3">
            {{ error3 }}
          </div>
        </div>
        <div class="col-md-auto" id="AddNewArticle_function">
          <h3 class="Section_subtitle">Add new article</h3>
          <div class="border border-dark">
            <form @submit.prevent="confirmnewarticlefunction">
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
              <button >Add new Article</button>
              <div v-if="confirmnewarticle">
                <div>
                  Are you sure you want to add a new article with the information above?
                  <button @click="confirmnewarticle = false; newArticle() ">Yes</button>
                  <button @click="confirmnewarticle =false ">No</button>
                </div>
              
              </div>
            </form>
            <p v-if="completed_new_article"> New article created , its id: {{ newarticleid }}</p>
          </div>
          <div class="errorlocation" v-if="error5">
            {{ error5 }}
          </div>
        </div>
        <div class="col-md-auto" id="EditArticle_function">
          <h3 class="Section_subtitle">Edit an article</h3>
          <div class="border border-dark">
            <p>leaving inputs unedited will keep the old data</p>
            <form @submit.prevent="confirmeditearticlefunction">
              <label for="editing_article_id">Article ID::</label>
              <input type="Text" name="editing_article_id" v-model="editing_article_id">
              <div v-show="submitted_Edit_Article && !editing_article_id"> ID is required</div>
    
              <br><br>
              <p v-if="submitted_Edit_Article">Old title: {{ " "+ article.title }}</p>
              <label for="editing_article_title">New Article title:</label>
              <input type="Text" name="editing_article_title" v-model="editing_article_title">
    
              <br><br>
              <p v-if="submitted_Edit_Article"> Old Author: {{ " "+article.author }}</p>
              <label for="editing_article_author">New Author name:</label>
              <input type="Text" name="editing_article_author" v-model="editing_article_author">
    
              <br><br>
              <p v-if="submitted_Edit_Article">Old Text {{ " "+article.article_text }}</p>
              <label for="editing_article_text">New Text:</label>
    
              <input type="Text" name="editing_article_text" v-model="editing_article_text">
    
              <br><br>
    
              <button >Edit Article / Also can be pressed to get all article information</button>
              <div v-if="confirmeditarticle">
                <div>
                  Are you sure you want to edit this Article? Please verifiy ID
                  <button @click="confirmeditarticle = false; updateArticle()">Yes</button>
                  <button @click="confirmeditarticle =false ">No</button>
                </div>
              
              </div>
    
              <p v-if="submitted_Edit_Article"> Article has been updated</p>
    
            </form>
          </div>
          <div class="errorlocation" v-if="error6">
            {{ error6 }}
          </div>
        </div>
        <div class="col-md-auto" id="DeleteArticle_function">
          <h3 class="Section_subtitle">Delete an article</h3>
          <div class="border border-dark">
            <form @submit.prevent="confirmdeletearticlefunction">
              <label for="deleting_article_id">Article ID to delete:</label>
              <input type="Text" name="deleting_article_id" v-model="deleting_article_id">
              <div v-show="submitted_Single_Article_delete && !deleting_article_id"> ID is required</div>
              <br><br>
              <router>
                <p v-if="submitted_Single_Article_delete">Has be deleted</p>
              </router>
              <br>
              <button>Delete article</button>
                <div v-if="confirmdeletearticle">
                    <div>Are you sure you want to delete this Article?
                      <button @click="confirmdeletearticle = false; deleteSingleArticle(deleting_article_id)">Yes</button>
                      <button @click="confirmdeletearticle =false ">No</button>
                    </div>
                </div>
    
            </form>
          </div>
          <div class="errorlocation" v-if="error7">
            {{ error7 }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="container text-center" id="Comment-management-section">
      <h2 class="Section_title">Comment Management</h2>
      <div class="row justify-content-md-center" id="comment_functions">
        <div class="col-md-auto" id="Getallcommentsforarticle_function">
          <h3 class="Section_subtitle">Comments for an article</h3>
          <div class="border border-dark">
            <form @submit.prevent="getallCommentsforArticle(submitted_Single_Article_Comments_id)">
              <label for="submitted_Single_Article_Commenst_id">Aricle ID you want the comments for</label>
              <input type="text" v-model="submitted_Single_Article_Comments_id">
              <div v-show="submitted_Single_Article_Comments && !submitted_Single_Article_Comments_id"> input is required
              </div>
              <button>Get Comments</button>
            </form>
            <p v-if="submitted_Single_Article_Comments_id">There are: {{comments.length}} for this article</p>
            <ul>
              <ul v-for="comment in comments" :key="comment.id">
                <router :to="'/article/' + submitted_Single_Article_Comments_id"
                  v-if="submitted_Single_Article_Comment = true">
                  <p> {{ comment.comment_id + ": " + comment.comment_text }}</p>
                </router>
    
    
              </ul>
    
            </ul>
            <p v-if="submitted_Single_Article_Comments_id && comments.length == 0"> There is currently no comments for this
              article this does not work , Why dont you add
              one </p>
          </div>
          <div class="errorlocation" v-if="error8">
            {{ error8 }}
          </div>
        </div>
        <div class="col-md-auto" id="AddComment_function">
          <h3 class="Section_subtitle">Add a comment</h3>
          <div class="border border-dark">
            <form @submit.prevent="confirmAddCommentfunction">
              <label for="comment_gen_id">Article ID::</label>
              <input type="Text" name="comment_gen_id" v-model="comment_gen_id">
              <div v-show="submitted_comment_gen && !comment_gen_id"> ID is required</div>
    
              <br>
              <label for="comment_gen_text">New Comment here:</label>
              <input type="Text" name="comment_gen_text" v-model="comment_gen_text">
              <div v-show="submitted_comment_gen && !comment_gen_text"> Text is required</div>
    
              <br><br>
              <button>Add Comment</button>
              <div v-if="confirmaddcomment">
                <div>
                  Are you sure you want to delete this comment?
                  <button @click="addComment(comment_gen_id)">Yes</button>
                  <button @click="confirmaddcomment =false ">No</button>
                </div>
              
              </div>
            </form>
            <p v-if="submitted_comment_gen">Added Comment </p>
          </div>
          <div class="errorlocation" v-if="error9">
            {{ error9 }}
          </div>
        </div>
        <div class="col-md-auto" id="DeleteComment_function">
          <h3 class="Section_subtitle">Delete a comment</h3>
          <div class="border border-dark">
            <form @submit.prevent="confirmDeleteCommentfunction">
              <label for="comment_del_id">Delete Comment id</label>
              <input type="Text" name="comment_del_id" v-model="comment_del_id">
            
              <div v-show="submitted_comment_del && !comment_del_id"> input is required</div>
            
              <button>Delete Comments</button>
                    <div v-if="confirmdeletecomment">
                      <div >
                        Are you sure you want to delete this comment?
                        <button @click="confirmdeletecomment = false ; deleteComment(comment_del_id)">Yes</button>
                        <button @click="confirmdeletecomment =false ">No</button>
                      </div>
                    
                    </div>
            </form>
    
            <p v-if="submitted_comment_del"> Comment has been deleted with id {{ comment_del_id }}</p>
          </div>
    
          <div class="errorlocation" v-if="error10">
            {{ error10 }}
          </div>
        </div>
    
      </div>
    </div>
    <br><br>
    <br>
    <br>
    <p></p>

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

      theme: 'light',




      submitted__list_users: false,
      submitted_new_user: false,
      completed_new_user: false,
      completed_new_article: false,
      completed_edit_article: false,
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
      confirmnewuser: false,

      new_article: "",
      newarticleid: "",
      confirmnewarticle: false,
     

      editing_article_id: "",
      editing_article_title: "",
      editing_article_author: "",
      editing_article_text: "",
      confirmeditarticle: false,

      deleting_article_id: "",
      submitted_Single_Article_Comments: false,
      confirmdeletearticle: false,

      submitted_comment_gen: false,
      submitted_comment_del: false,

      submitted_Single_Article_Comments_id: "",

      comment_gen_id: "",
      comment_gen_text: "",
      confirmaddcomment: false,

      comment_del_id: "",
      comment_del_text: "",
      confirmdeletecomment :false,

    }

  },
  mounted() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    }
  },
  methods: {




    confirmDeleteCommentfunction() {
      if (this.comment_del_id) {
        this.confirmdeletecomment = true;
      } else {
        this.submitted_comment_del = true;
      }
    },

    confirmnewarticlefunction() {
      if (this.submitted_new_Article == false) {
        this.confirmnewarticle = true;
      } else {
        this.submitted_new_Article = true;
      }
    },

    confirmAddCommentfunction() {
      if (this.comment_gen_id) {
        this.confirmaddcomment = true;
      } else {
        this.submitted_comment_gen = true;
      }
    },

    confirmeditearticlefunction() {
      if (this.editing_article_id) {
        this.confirmeditarticle= true;
      } else {
        this.submitted_Edit_Article = true;
      }
    }, 

    confirmdeletearticlefunction() {
      if (this.deleting_article_id) {
        this.confirmdeletearticle = true;
      } else {
        this.submitted_Single_Article_delete = true;
      }
    },

    confirmnewuserfunction() {
      if (this.submitted_new_user) {
        this.confirmnewuser = true;
        
      } else {
        this.submitted_new_user = true;
      }
    },


    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
    beforeDestroy() {
      localStorage.removeItem('theme');
    },

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
            if (this.confirmnewuser == true && this.submitted_new_user == true) {
              this.new_user_first_name = ""
              this.new_user_last_name = ""
              this.new_user_email = ""
              this.new_user_password = ""
              this.submitted_new_user = false
              this.completed_new_user = true
            }
           
            
          
            
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
   
      ////

      const { new_article_author, new_article_title, new_article, newarticleid } = this
      console.log("test")

      articleService.addNewArticle(new_article_title, new_article_author, new_article)
        .then((response) => {
          this.newarticleid = response.article_id;
          this.completed_new_article = true
          this.submitted_new_Article = true
        })
        .catch(error5 => this.error5 = error5)


    },


    updateArticle(e) {



      ////

      this.error6 = ""
      const { editing_article_id, editing_article_author, editing_article_title, editing_article_text} = this
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
              this.submitted_Edit_Article = true
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
          this.confirmaddcomment = true
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



<style scoped >
.light {
  background-color: white;
  color: black;
}

.dark {
  background-color: black;
  color: white;
}

h2 {
  text-decoration: underline;
  text-align: center;

}

h3 {
  text-decoration: underline;


}

p {
  font-size:smaller;
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


