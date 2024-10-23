<template>
  <div class="memo-container">
    <header class="header">
      <h1>메모장</h1>
      <button class="btn-add" @click="add">+ 메모 추가</button>
    </header>

    <ul class="memo-list">
      <li v-for="d in state.data" :key="d.id" class="memo-item">
        <p>{{ d.content }}</p>
        <button class="btn-edit" @click="edit(d.id)">수정</button>
      </li>
    </ul>

    <footer class="footer">
      &copy; 2024 Memo Application. All rights reserved.
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      data: [],
    });

    const fetchMemos = async () => {
      try {
        const res = await axios.get('/api/memos');
        state.data = res.data;
      } catch (error) {
        console.error('메모 가져오기 실패:', error);
      }
    };

    const add = async () => {
      const content = prompt('새로운 메모를 입력해 주세요');
      if (!content) {
        alert('내용을 입력해 주세요.');
        return;
      }

      try {
        const res = await axios.post('/api/memos', { content });
        state.data = res.data;
      } catch (error) {
        console.error('메모 추가 실패:', error);
      }
    };

    const edit = async (id) => {
      const memo = state.data.find((d) => d.id === id);
      const content = prompt('내용을 수정해 주세요', memo.content);
      if (content === null) return;

      try {
        const res = await axios.put(`/api/memos/${id}`, { content });
        state.data = res.data;
      } catch (error) {
        console.error('메모 수정 실패:', error);
      }
    };

    onMounted(fetchMemos);

    return { state, add, edit };
  },
};
</script>

<style lang="scss" scoped>
.memo-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: linear-gradient(to bottom right, #f0f4ff, #d9e3ff); // Gradient background
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); // Increased shadow for depth
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #6c63ff; // Header background
    padding: 20px;
    border-radius: 16px 16px 0 0;
    color: white;

    h1 {
      margin: 0;
      font-size: 28px;
    }

    .btn-add {
      background-color: white;
      color: #6c63ff;
      border: 2px solid #6c63ff;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #5753cc;
        color: white;
      }
    }
  }

  .memo-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    flex-grow: 1;

    .memo-item {
      background-color: white;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); // Deeper shadow for memo items
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.2s, background-color 0.2s;

      &:hover {
        background-color: #eef2ff;
        transform: scale(1.02);
      }

      p {
        margin: 0;
        font-size: 16px;
        color: #4a4a4a;
        word-wrap: break-word;
      }

      .btn-edit {
        background-color: #ff8c00; // Edit button color
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e07b00;
        }
      }
    }
  }

  .footer {
    background-color: #6c63ff; // Footer background
    color: white;
    text-align: center;
    padding: 15px;
    border-radius: 0 0 16px 16px;
    font-size: 14px;
    margin-top: 20px;
  }
}

</style>