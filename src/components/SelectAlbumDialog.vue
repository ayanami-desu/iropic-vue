<template>
  <el-dialog
    title="选择相册"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    :center="true"
    @open="handleDialogOpen"
  >
    <el-select
      v-model="selectedAlbum"
      value-key="selectedAlbum"
      clearable
      placeholder="请选择相册"
    >
      <el-option
        v-for="item in albumList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
 
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="confirmSelect"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAlbumListReq } from "@/api/album.js";

export default {
  name: "SelectAlbumDialog",
  data() {
    return {
      dialogVisible: false,
      selectedAlbum: null,
      albumList: [],
    };
  },
  methods: {
    handleDialogOpen() {
        this.getAlbumList()
    },
    async getAlbumList() {
      let res = await getAlbumListReq();
      this.albumList = res.data;
    },
    confirmSelect(){
        if(this.selectedAlbum) this.$emit('finish', this.selectedAlbum)
        
    }
  },
};
</script>