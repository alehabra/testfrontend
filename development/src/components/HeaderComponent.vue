<template>
  <header id="header">
    <div class="header-title">
      <h3>FOOTBALL LEAGUE</h3>
    </div>
    <div class="header-buttons">
      <button class="header-btn-add" v-on:click="updateMatch()">
        <span>+</span>
        Add Match
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    updateMatch: function () {
      this.$store.dispatch("updateMatches");
    },
  },
};
</script>

<style lang="scss">
#table {
  #header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0rem auto;
    border-radius: 0.5rem;
    color: #1c1919;
    padding: 1rem 0rem;
    align-items: center;
    .header-title {
      align-self: center;
      h3 {
        text-align: left;
        color: #273652;
        margin: 0rem;
        font-size: 1.3rem;
        @media screen and (max-width: 1023px) {
          font-size: 1rem;
        }
      }
    }
    .header-buttons {
      align-self: center;
      .header-btn-add {
        border-radius: 0.3rem;
        cursor: pointer;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
        border: 2px solid #273652;
        color: #273652;
        background: transparent;
        font-weight: 600;
        font-size: 1rem;
        text-transform: capitalize;
        padding: 0.5rem 1.8rem;
        @media screen and (max-width: 1023px) {
          padding: 0.5rem 0.9rem;
          font-size: 0.8rem;
        }
        span {
          padding: 0rem 0.3rem;
        }
        &:hover {
          background: #273652;
          color: white;
        }
      }
    }
  }
}
</style>
