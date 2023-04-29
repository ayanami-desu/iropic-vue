<template>
  <div class="cell-item">
    <ImageNumBadge
      :num="imageData.subImg"
      v-if="imageData.subImg.length !== 0 "
    />
    <el-image
      lazy
      class="cell-img"
      :src="getImage(imageData.id)"
      :alt="imageData.filename"
      fit="cover"
      :z-index="96"
    >
      <div
        slot="placeholder"
        class="cell-img"
        v-loading="true"
      />
    </el-image>
    <i
      class="choose-icon el-icon-help"
      :class="imageData.selected ? 'el-icon-circle-check' : 'choose-icon-hover'"
      @click="selectImg(index)"
    />
    <div :class="imageData.selected ? 'item-body-selected' : 'item-body'">
      <div class="item-button">
        <span
          type="text"
          class="my-button"
          @click="gotoPicDetail(imageData.id)"
        >
          <i class="el-icon-zoom-in" />
          图片详情
        </span>
        <div class="item-desc">
          <i class="el-icon-date" />{{ stamp2Date(imageData.lastModified) }}
        </div>
      </div>
      <div>
        <i class="el-icon-folder-opened" />
        <span
          style="margin-left: 3px"
          v-if="imageData.belongAlbum"
        >{{
          imageData.belongAlbum
        }}</span>
        <span
          style="margin-left: 3px"
          v-else
        >无相册</span>
      </div>
      <div class="tags-con">
        <span
          class="my-button"
          v-if="imageData.isR18"
        ># R18</span>
        <span
          v-for="tag in imageData.label"
          :key="tag.id"
          class="my-button"
          @click="addSelectedTag(tag)"
        >
          # {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageNumBadge from "./ImageNumBadge.vue";
export default {
  name: "ImageItem",
  data() {
    return {
      isSelected: false,
    };
  },
  components: {
    ImageNumBadge,
  },
  props: {
    imageData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    selectedTagList() {
      return this.$store.state.selectedTagList
    }
  },
  methods: {
    gotoPicDetail(data) {
      this.$router.push({
        path: "/imageDetail/" + data,
      });
    },
    getImage(pid) {
      return this.MyEnv.image_url + pid;
    },
    stamp2Date(stamp) {
      let date = new Date(parseInt(stamp));
      let Y = date.getFullYear() + "-";
      let M = date.getMonth() + 1 + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Y + M + D + h + m;
    },
    selectImg(index) {
      if (this.imageData.selected) {
        this.$emit("cancel", index);
      } else {
        this.$emit("select", index);
      }
    },
    addSelectedTag(tag) {
      if (
        this.selectedTagList.indexOf(tag) >= 0 ||
        this.selectedTagList.length >= 3
      ) {
        return;
      }
      this.$store.commit({
        type: 'addSelectedTag',
        tag: tag 
      })
      this.$emit('refresh')
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  /* 移动端 */
  .cell-item {
    width: 90%;
  }
}
@media screen and (min-width: 601px) {
  /* 桌面端 */
  .cell-item {
    width: 25%;
  }
}
.choose-icon {
  position: absolute;
  color: white;
  right: 0.5em;
  top: 0.5em;
  z-index: 10;
  cursor: pointer;
  transition: color 0.5s;
  font-size: 1.5em;
}
.choose-icon:hover {
  color: #409eff;
}
.choose-icon-hover {
  opacity: 0;
  transition: opacity 0.5s;
}
.cell-item:hover .choose-icon-hover {
  opacity: 1;
}
.cell-item {
  height: 300px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  padding: 0 4px;
  margin: 4px 0;
  font-size: 14px;
}
.cell-img {
  height: 100%;
  width: 100%;
  cursor: pointer;
  display: block;
}
.item-body {
  position: absolute;
  bottom: -100px;
  transition: all 200ms ease-out 0s;
  z-index: 12;
  visibility: hidden;
  background: #c4c4c4;
  color: #333;
  height: 20%;
  width: calc(100% - 8px);
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cell-item:hover .item-body {
  visibility: visible;
  bottom: 0;
}
.item-body-selected {
  position: absolute;
  bottom: 0;
  z-index: 12;
  background: #333;
  color: #fff;
  height: 20%;
  width: calc(100% - 8px);
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-desc {
  cursor: pointer;
  user-select: none;
}
.my-button {
  padding: 0;
  cursor: pointer;
}
.tags-con {
  display: flex;
}
</style>