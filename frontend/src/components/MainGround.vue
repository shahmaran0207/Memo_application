<template>
  <div class="ground">
    <Header/>
      <Memo/>
    <Footer/>
  </div>

</template>

<script>

import Header from "./AppHeader.vue";
import Memo from "./AppMemo.vue";
import Footer from "./AppFooter.vue";

export default {
  components: {Header, Footer, Memo}
}
</script>

