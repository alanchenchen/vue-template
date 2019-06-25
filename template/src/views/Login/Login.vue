<template>
    <div class="home">
        <h2 class="title">
            <a href="https://github.com/alanchenchen/vue-template">vue-template</a>
        </h2>
        <p>By 
            <a href="https://github.com/alanchenchen">Alan Chen</a>
        </p>
    </div>     
</template>

<script>
import { api, apiCover } from '@/api/index'

export default {
    name:'Login',
    data() {
        return {}
    },
    methods: {}
} 
</script>

<style lang="css" scoped>
.home{
    width:100vw;
    height:100vh;
    background: -webkit-linear-gradient(left, #4ABFFF, #3733E4);
    background: -o-linear-gradient(right, #4ABFFF, #3733E4);
    background: -moz-linear-gradient(right, #4ABFFF, #3733E4);
    background: linear-gradient(to right, #4ABFFF, #3733E4);
    color: #fff;
    font-size: 20px;
}
.title {
    padding-top: 100px;
    margin-bottom: 50px;
}
</style>