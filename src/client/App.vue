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
import axios from 'axios'
import { ref } from 'vue'
import _sodium from 'libsodium-wrappers'
const message = ref('')
const textFile = ref(null)
async function getUser() {
  try {
    const response = await axios.get('/config');
    await _sodium.ready;
    const sodium = _sodium;
    function decrypt_after_extracting_nonce(nonce_and_ciphertext) {
      if (nonce_and_ciphertext.length < sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES) {
          throw "Short message";
      }
      let nonce = nonce_and_ciphertext.slice(0, sodium.crypto_secretbox_NONCEBYTES),
          ciphertext = nonce_and_ciphertext.slice(sodium.crypto_secretbox_NONCEBYTES);
      const key = sodium.from_hex('724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed')
      return sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    }
    const decrypt = decrypt_after_extracting_nonce(sodium.from_base64(response.data))
    console.log(sodium.to_string(decrypt))
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
