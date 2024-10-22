<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add">추가</button>
    </div>
    <ul>
      <li v-for="(d, idx) in state.data" :key="idx">{{ d }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    // reactive로 객체 상태를 관리
    const state = reactive({
      data: ["메모 1", "메모 2", "메모 3", "메모 4"]
    });

    const add = () => {
      state.data.push("추가된 메모 내용");
    };

    return { state, add };
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
    border-top: 1px solid #eeeeee;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 5px 10px;
      margin: 5px;
    }
  }
}
</style>
