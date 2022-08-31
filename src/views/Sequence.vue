<template>
  <div class="con">
    <div>有{{ imageNum }}图片需要打标签</div>
    <div>
      <ul>
        <li
          v-for="image in imageList"
          :key="image.id"
          class="li-item"
          @click="$router.push('/imageDetail/' + image.id)"
        >
          {{ image.origin_filename }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getImageSeqReq } from "../api/image";
export default {
  name: "Sequence",
  data() {
    return {
      imageList: [],
      imageNum: 0,
    };
  },
  methods: {
    async getImageSeq() {
      let res = await getImageSeqReq();
      this.imageList = res.data;
      this.imageNum = res.num;
      let pidList = [];
      for (let i = 0; i < res.data.length; i++) {
        pidList.push(res.data[i]['id'])
      }
      this.$store.commit({
        type: 'increment',
        pidList: pidList
      })
    },
  },
  created: function () {
    this.getImageSeq();
  },
};
</script>

<style scoped>
.con{
    width: 100%;
}
ul {
  padding: 0;
  margin: 0;
}
.li-item{
    cursor: pointer;
    margin: 0.25em 0;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>