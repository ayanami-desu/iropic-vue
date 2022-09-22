<template>
  <div class="all-con">
    <div class="breadcrumb-con">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="albumId">
            相册：{{ albumName }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="num-con">
          <span>{{ totalPicNum }}</span>
        </div>
      </div>
      <div>
        <el-tag
          v-for="tag in selectedTagList"
          :key="tag.id"
          closable
          @close="rmSelectedTag(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
      <div class="top-tools-con">
        <!-- <div
          class="top-tool-item"
          @click="gotoRandomImg"
        >
          <i class="el-icon-view" />
          <span>随机一张</span>
        </div> -->
        <div class="top-tool-item">
          <el-popover placement="bottom-end">
            <div
              v-for="method in orderMethods"
              :key="method.name"
            >
              <span
                @click="changeOrder(method)"
                class="order-item"
              >{{ method.name }}</span>
            </div>
            <span slot="reference"><i class="el-icon-sort" />{{ this.orderBy.name }}</span>
          </el-popover>
        </div>
      </div>
    </div>
    <HoverTool
      :selected-img-list="selectedImgList"
      @cancelSelect="cancelSelect"
    />
    <main
      v-viewer
      v-loading="pageLoading"
      class="main-con"
    >
      <ImageItem
        :image-data="image"
        :index="index"
        v-for="(image, index) in imageList"
        :key="image.id"
        ref="imageItem"
        @select="selectImg"
        @cancel="cancelSelectImg"
        @refresh="loadImages(1)"
      />
    </main>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPicNum"
      :page-size="pageSize"
      :current-page="nowPage"
      @current-change="handlePageChange"
    />
  </div>
</template>
<script>
import { getImgListReq, getRandomImgReq } from "@/api/image.js";
import HoverTool from "../components/HoverTool.vue";
import ImageItem from "../components/ImageItem.vue";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer, {
  defaultOptions: {
    title: false,
    transition: false,
  },
});

export default {
  name: "ImageArea",
  components: {
    HoverTool,
    ImageItem,
  },
  props: {},
  data() {
    return {
      albumId: this.$route.params.albumId,
      tags: this.$route.params.tags,
      pageSize: 16,
      pageLoading: true,
      imageList: [],
      albumName: '',
      totalPicNum: 0,
      selectedImgList: [],
      nowPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    };
  },
  computed: {
    orderMethods() {
      return this.$store.state.orderMethods;
    },
    orderBy() {
      return this.$store.state.orderBy
    },
    selectedTagList() {
      return this.$store.state.selectedTagList
    }
  },
  watch: {
    // 监听参数变化，重新获取数据
    $route(to) {
      this.albumId = to.params.albumId;
      let page = to.query.page ? parseInt(to.query.page) : 1;
      this.nowPage = page;
      this.loadImages(page);
    },
  },
  created: function () {
    localStorage.setItem('orderBy', 'id desc')
    this.loadImages(this.nowPage);
  },
  methods: {
    gotoRandomImg() {
      getRandomImgReq({
        field: 'pid'
      }).then((res) => {
        this.$router.push('/imageDetail/' + res.pid)
      }).catch((err) => {
        console.log(err)
      })
    },
    selectImg(index) {
      this.imageList[index]['selected'] = true
      this.selectedImgList.push(this.imageList[index]['id']);
    },
    cancelSelectImg(index) {
      //取消单张图片的选择
      this.imageList[index]['selected'] = false
      let pid = this.imageList[index]['id']
      this.selectedImgList.splice(this.selectedImgList.indexOf(pid), 1);
    },
    cancelSelect() {
      //取消全部选择
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i]['selected']) {
          this.imageList[i]['selected'] = false
        }
      }
      this.selectedImgList = []
    },
    changeOrder(order) {
      this.$store.commit({
        type: 'changeOrderBy',
        orderBy: order
      })
      this.loadImages(this.nowPage)
    },
    handlePageChange(nowPage) {
      this.cancelSelect();
      this.$router.push({
        path: this.$route.path,
        query: {
          page: nowPage
        }
      })
    },
    async loadImages(nowPage) {
      let data = {
        page: nowPage,
        num: this.pageSize,
        order: this.orderBy.order,
      };
      if (this.selectedTagList.length !==0 ) {
        let tmp = []
        for (let i = 0; i < this.selectedTagList.length; i++) {
          tmp.push(this.selectedTagList[i]["id"])
        }
        data["tags"] = tmp.join(',');
      }
      if (this.albumId) {
        data["aid"] = this.albumId;
      }
      let res = await getImgListReq(data);
      if (res.data.imageNum === 0) {
        this.$message.success("没有图片！");
        this.pageLoading = false
        return;
      }
      let temp = res.data.data;
      let pidList = []
      for (let i = 0; i < temp.length; i++) {
        pidList.push(res.data.data[i]['id'])
        temp[i]["selected"] = false;
      }
      this.$store.commit({
        type: 'increment',
        pidList: pidList
      })
      this.imageList = temp;
      this.totalPicNum = res.data.imageNum;
      if (this.albumId) this.albumName = temp[0]['belongAlbum']
      this.pageLoading = false
      if (this.nowPage === 1) {
        this.$notify.success({
          title: "Info",
          message: "发现" + res.data.imageNum + "张图片",
          position: "bottom-right",
          duration: 2000,
        });
      }
    },
    rmSelectedTag(tag) {
      this.$store.commit({
        type: 'rmSelectedTag',
        tag: tag
      })
      this.loadImages(1)
    },
  },
};
</script>
<style scoped>
.all-con {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.breadcrumb-con {
  width: 100%;
  height: 30px;
  color: black;
  padding: 0 0 0 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breadcrumb {
  display: flex;
  align-items: center;
  ;
}

.num-con {
  background-color: #777;
  color: #fff;
  margin-left: 2em;
  padding: 0 0.25em;
  text-align: center;
}

.top-tools-con {
  display: flex;
  padding-right: 1em;
}

.top-tool-item {
  margin-right: 0.75em;
  cursor: pointer;
}

.top-tool-item i {
  color: #0073b2;
  font-weight: bold;

}

.order-item {
  cursor: pointer;
  text-align: center;
}

.main-con {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100px;
  overflow-y: auto;
}

@media screen and (max-width: 600px) {

  /* 移动端 */
  .main-con {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (min-width: 601px) {

  /* 桌面端 */
  .main-con {
    justify-content: flex-start;
  }
}
</style>