<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      {{url}}
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        url: process.env.VUE_APP_URL
      }
    }
  }
</script>
