<template>
  <div>
    <div>{{ albumId }}</div>
    <div>{{ tags }}</div>
  </div>
</template>

<script>
export default {
    name:'Test',
    data(){
        return{
            albumId: this.$route.params.albumId,
            tags: this.$route.params.tags,
        }
    }
}
</script>

<style>

</style>