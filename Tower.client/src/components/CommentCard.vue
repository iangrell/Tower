<template>
    <div class="row">
        <div class="col-2">
            <img class="comment-img" :src="comment?.creator?.picture" :alt="comment?.creator?.name">
        </div>
        <div class="col-10 bg-white">
            <h6>{{ comment?.creator?.name }}</h6>
            <p>{{ comment?.body }}</p>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        comment:{ type: Comment, required: true}
    },

    setup(){
    return { 
        
     }
    }
};
</script>


<style lang="scss" scoped>

.comment-img {
    height: 7vh;
    widows: 7vh;
    border-radius: 50%;
}

</style>