<template>
    <div>
        <h1>{{ article.title }}</h1>
    </div>

</template>


<script>

export default {
    data() {
        return {
            article: {}
        }
    },
    mounted() {
        articleService.getOne(this.$route.params.id)
        .then((article) => {
            this.article = article;
            commentsService.getAllComments((this.$route.params.id))
            .then((comments) => {
                    this.comments = comments
                    this.num_comments = comments.length
                })
                .catch(error => this.error = error)
                
        })
        .catch(error => this.error = error)
    }
}

</script>