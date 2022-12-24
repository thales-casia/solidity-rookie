<template>
  <div class="home">
    <h1>投票</h1>
    <p>登录wallet发布文章</p>
    <fieldset>
      <legend>钱包</legend>
      <label v-if="account">
        <ul>
          <li>{{account}}</li>
        </ul>
      </label>
    </fieldset>
    <fieldset v-if="isChair">
      <legend>授权</legend>
      <div>
          <input v-model="userAddress" />
          <button @click="onVerify">授权</button>
      </div>
    </fieldset>
  </div>
</template>
<script setup lang="ts">
import { useBallot } from '@/store';
import { computed, onMounted, ref, watch } from 'vue';
const store = useBallot();
const account = computed(() => store.account);
const userAddress = ref('');
const isChair = computed(() => store.isChair);
function onVerify(e:MouseEvent) {
  if(userAddress.value) store.giveRightToVote(userAddress.value);
}
onMounted(() => {
  store.check();
});
</script>
