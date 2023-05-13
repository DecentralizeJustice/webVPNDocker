<template>
  <section class="overflow-hidden">
  <div class="container mx-auto">
    <div class="pb-12 pt-8 px-6 text-center bg-white overflow-hidden border rounded-xl">
      <h3 class="mb-1 text-xl font-semibold text-black">Enter Your Password To Unlock The QR Code</h3>
      <div class="mb-6">
  <label class="block font-heading mb-2.5 text-sm font-semibold">Label</label>
  <input class="py-2.5 px-3.5 text-sm w-full hover:bg-white outline-none  border 
  border-neutral-200 rounded-lg focus-within:border-neutral-600" 
  type="text" placeholder="Write a text" v-model="message">
  <button class="inline-block py-3 px-6 my-2 leading-none text-white
   bg-indigo-500 hover:bg-indigo-600 rounded shadow" @click="getUser()">Primary button</button>
</div>
{{ textFile }}
    </div>
  </div>
</section>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue'
const message = ref('')
const textFile = ref(null)
async function getUser() {
  try {
    const response = await axios.get('/config');
    console.log(response.data);
/*     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', 'test.conf');
    document.body.appendChild(fileLink);
    fileLink.click(); */
  } catch (error) {
    console.error(error);
  }
}
</script>
<style scoped>
</style>
