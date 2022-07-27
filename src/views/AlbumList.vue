<template>
  <div class="all-con">
    <div
      v-for="album in albumList"
      :key="album.id" 
      class="cell-item"
      @click="gotoAlbum(album.id)"
    >
      <el-image
        lazy
        class="cell-img"
        :src="getAlbumCover(album.id)"
        alt="加载错误"
        fit="cover"
      >
        <div
          slot="error"
          class="image-slot"
        >
          <img
            src="../assets/gallery-line.svg"
            class="error-img"
          >
        </div>
      </el-image>
      <div class="item-body">
        <div class="item-desc">
          {{ album.name }}
        </div>
        <div class="item-desc">
          包含{{ album.images_num }}张图片
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAlbumListReq } from "@/api/album.js"
export default {
  name: "Album",
  data() {
    return {
      coverFit: "cover",
      albumList: [],
      imageNum: 0
    };
  },
  created: function(){
    this.getAlbumList()
  },
  methods:{
    async getAlbumList(){
      let res = await getAlbumListReq()
      this.albumList = res.data
      
    },
    gotoAlbum(data){
      this.$router.push({
        path: 'album/' + data
      })
    },
    getAlbumCover(albumId){
      return this.MyEnv.cover_url + albumId
    }
  }
};
</script>

<style scoped>
.all-con{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  width: 100%;
}
@media screen and (max-width: 600px){
/* .main-con {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
} */
.cell-item{
  width: 50%;
}
}
@media screen and (min-width: 601px){
  .cell-item{
  width: 25%;
}
}
.cell-item {
  background: #fff;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 4px;
  cursor: pointer;
}
.cell-img {
  height: 80%;
  width: 100%;
  
  display: block;
}
.error-img{
  margin: auto;
  display: block;
}
.item-body {
  background: #c4c4c4;
  height: 20%;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-desc {
  color: #333;
}

</style>