<template>
  <div class="home">
    <h1>Owner</h1>
    <p>显示创建者信息</p>
    <fieldset>
      <legend>信息</legend>
      <section v-if="account">
        <ul>
          <li>{{account}}</li>
          <li v-if="isOwner">您是管理员</li>
          <li v-else>您不是管理员</li>
        </ul>
        <button @click="onDisconnect">断开连接</button>
      </section>
      <label v-else><button @click="onConnect">链接钱包</button></label>

    </fieldset>
    <fieldset v-if="isOwner">
      <legend>转让管理员</legend>
      <section>
        <input placeholder="输入地址" v-model="otherAddress" />
        <button @click="onChange">转让</button>
      </section>
    </fieldset>
    <div>
      <router-link to="./ballot" >转入投票页面></router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWallet } from '@/store';
import { computed, onMounted, ref} from 'vue';
const store = useWallet();
const account = computed(() => store.account);
const isOwner = computed(() => store.isOwner);
const otherAddress = ref('');
function onConnect() {
  store.connect();
}
function onDisconnect() {
  store.disconnect();
}
function onChange() {
  store.changeOwner(otherAddress.value);
}

onMounted(() => {
  store.getAddress();
  store.getOwner();
});
</script>
