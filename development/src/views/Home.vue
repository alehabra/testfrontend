<template>
  <div id="table">
    <HeaderComponent/>
    <ListComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ListComponent from "@/components/ListComponent.vue";

export default {
  name: "Home",
  components: {
    ListComponent,
    HeaderComponent
  },
  data:() => {
    return{
      list:[],
      detail:{}
    }
  },
  beforeMount() { 
    this.$store.dispatch('getMatches')  //chiamata API nello vuex store
  }
};
</script>