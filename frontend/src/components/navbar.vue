<template>
  <div>
    <b-navbar type="is-dark" fixed-top>
      <template slot="brand">
        <b-navbar-item href="/">
          <div class="navbar-item green-text">/r/CollegeBasketball Poll</div>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-dropdown hoverable aria-role="list">
          <a id="navDropdown" class="navbar-item" slot="trigger">
            <span>Results</span>
          </a>

          <b-dropdown-item aria-role="listitem" has-link>
            <router-link to="/results">Current Week</router-link>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" has-link>
            <router-link to="/overview">Season</router-link>
          </b-dropdown-item>
        </b-dropdown>

        <b-navbar-item tag="router-link" to="/voters">
          Voters
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/teams">
          Teams
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/about">
          About
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="router-link" to="/submitBallot" v-if="user.is_voter">
          Submit/Edit Ballot
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/admin" v-if="showAdmin">
          <div>Admin</div>
        </b-navbar-item>
        <b-navbar-item v-if="user.nickname === ''">
          <div class="green-text" @click="requestToken()">Login/Sign Up</div>
        </b-navbar-item>
        <b-navbar-item v-if="user.nickname != ''">
          <div class="green-text" @click="logout">Logout</div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      showAdmin: false
    }
  },
  computed: {
    serverToken: {
      get() {
        return this.$store.state.serverToken
      }
    },
    user: {
      get() {
        return this.$store.state.user
      }
    },
    showSubmitBallot() {
      if(this.serverToken != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    logout() {
      // TODO logout of server and reddit
      this.$store.commit('quitSession')
    },
    requestToken() {
      window.open('https://www.reddit.com/api/v1/authorize?client_id=J0AAtQFLqssEqQ&response_type=token&state=someSdldladfkding!!!&redirect_uri=http://localhost:8080/oauth&scope=identity', '_self')
    }
  }
}

</script>

<style scoped lang="scss">
.green-text {
  color: #42b983;
}

#navDropdown {
  color: whitesmoke !important;
}
#navDropdown:hover {
  background-color: #292929 !important
}
</style>
