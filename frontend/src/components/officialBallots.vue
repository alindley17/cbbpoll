<template>
  <div class="has-text-left">
    <div class="title is-6">Official Ballots</div>
    <div ref="ballotWrap" class="ballot-wrap">
      <span v-for="user in dummyData" :key="user.username" class="width-auto">
        <span :class="bindSprite(user)"></span>
        <span>{{user.username}}, </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'officialBallots',
  data() {
    return {
      dummyData: [
      {
        username: "Akron-fan",
        flair: "akron"
      },
      {
        username: "Bamaball",
        flair: "ala"
      },
      {
        username: "MJ23",
        flair: "unc"
      },
      {
        username: "Underdogs",
        flair: "lehigh"
      },
      {
        username: "team-lips",
        flair: "lips"
      },
      {
        username: "RIP",
        flair: "kansas"
      },
      {
        username: "huskers",
        flair: "neb"
      },
      {
        username: "ArizonaFTW",
        flair: "ari"
      }]
    }
  },
  mounted() {
    let lastBallot = this.$refs.ballotWrap.lastChild.innerHTML
    lastBallot = lastBallot.slice(0, -2)
    this.$refs.ballotWrap.lastChild.innerHTML = lastBallot;
  },
  methods: {
    bindSprite(user) {
      return "flair-sprite team team-" + user.flair
    }
  }
}
</script>

<style scoped lang="scss">
.ballot-wrap {
  display: flex;
  flex-wrap: wrap;
  line-height: 2rem;
}
.flair-sprite {
  transform: scale(0.5)
}
.width-auto {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
}

</style>
