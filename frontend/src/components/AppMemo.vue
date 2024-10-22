<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add">추가</button>
    </div>
    <ul>
      <li v-for="(d, idx) in state.data" :key="idx" @click="edit(idx)">{{ d }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";

export default {
  setup() {
    // reactive로 객체 상태를 관리
    const state = reactive({
      data: [],
    });

    const add = () => {
      const content=prompt("내용을 입력해 주세요");

      axios.post("/api/memos", {content: content}).then((res)=>{
        state.data=res.data;
      });
    };

    //put: 일부 내용을 수정할 때 사용
    const edit=(idx)=>{
      const content=prompt("내용을 입력해 주세요", state.data[idx]);
      axios.put("/api/memos"+idx,{content}).then((res)=>{
        state.data=res.data;
      });
    };

    axios.get("/api/memos").then((res)=>{
      state.data=res.data;
    });

    return { state, add, edit };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  .act {
    text-align: right;
    padding: 10px 10px 5px 5px;
  }

  ul {
    list-style: none;
    padding: 15px;
    margin: 0;

    li {
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #eeeeee;
    }
  }
}
</style>
