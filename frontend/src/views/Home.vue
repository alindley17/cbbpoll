<template>
  <div>
    <section class="hero is-light">
        <div class="hero-body has-text-left">
          <div class="container">
            <h1 v-if="user.nickname === ''" class="title">
              Welcome!
            </h1>
            <h1 v-if="user.nickname != ''" class="title">
              Welcome {{user.nickname}}!
            </h1>
            <h2 class="subtitle">
              This is the site for the <a class="has-text-link" href="https://www.reddit.com/r/CollegeBasketball/">/r/CollegeBasketball</a> User Poll. Applications for voters are currently being accepted. Please log in to apply or submit a ballot.
            </h2>
            <b-button v-if="user.nickname === ''" type="is-primary" @click="requestToken()">Login Using Reddit</b-button>
            <b-button v-if="user.nickname != '' && user.is_voter" type="is-primary" tag="router-link"
                to="/submitBallot">Submit Ballot</b-button>
          </div>
        </div>
      </section>
    <div class="container">
      <section class="section">
        <br>
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical is-8">
            <div class="tile is-child box">
              <latest/>
            </div>
          </div>
          <div class="tile is-parent is-vertical is-4">
            <div class="tile is-child box">
              <officialBallots/>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import latest from '@/components/latestPoll.vue'
import officialBallots from '@/components/officialBallots.vue'

import axios from 'axios'

export default {
  name: 'home',
  components: {
    latest,
    officialBallots
  },
  computed: {
    apiUrl: {
      get() {
        return this.$store.state.apiUrl
      }
    },
    serverToken: {
      get() {
        return this.$store.state.serverToken
      }
    },
    user: {
      get() {
        return this.$store.state.user
      }
    }
  },
  created() {
    // TODO: check server token validity
    let config = {
      headers: {'Authorization': "Bearer " + this.serverToken}
    };

    if(this.user != '') {
      axios.get(this.apiUrl + 'v1/users/' + this.user.nickname)
      .then(response => {
        console.log(response);

        switch(response.status) {
          case 200:
            // redirect to signed-in homepage
            // this.$store.commit('saveUser', response.data);

            // FAKE DATA FOR DEV
            this.$store.commit('saveUser', {
              nickname: response.data.nickname,
              is_voter: true,
              is_admin: true
            });
            break;
          case 400: 
            // catch bad request error
            break;
          case 405:
            // catch method not allowed error
            break;
          default:
            // catch any other responses
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
    } else {
      return
    }
  },
  mounted() {
    console.log('server token', this.serverToken)
    console.log('user', this.user)
  },
  methods: {
    requestToken() {
      window.open('https://www.reddit.com/api/v1/authorize?client_id=J0AAtQFLqssEqQ&response_type=token&state=someSdldladfkding!!!&redirect_uri=http://localhost:8080/oauth&scope=identity', '_self')
    }
  }
}
</script>
