<template>
	<div class="container">
		<!-- oauth page
		<br>
		token: {{redditToken}} -->
		 <b-loading :is-full-page="true" :active="true" :can-cancel="false"></b-loading>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ouath',
	data() {
		return {
			redditToken: String
		}
	},
	computed: {
		apiUrl: {
			get() {
				return this.$store.state.apiUrl
			}
		}
	},
	created() {
		var urlParams = new URLSearchParams(window.location.hash.substr(1));
		let token = urlParams.get('access_token');
		if(token) {
			// send token to backend
			this.redditToken = token;
			let config = {
    		headers: {'Authorization': "Bearer " + this.redditToken}
			};

			// second param in post is data
			axios.post(this.apiUrl + 'v1/sessions', '', config)
		  .then(response => {
		    console.log(response);

		    switch(response.status) {
		    	case 200:
		    		// redirect to signed-in homepage
		    		this.$store.commit('saveSession', {
		    			'token': response.data.token,
		    			'username': response.data.nickname
		    		});
		    		this.$router.replace('/')
		    		break;
		    	case 201:
		    		// catch first login and sent to setup page
		    		this.$store.commit('saveSession', response.data.token)
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
		  // .finally(() => {
		  //   // always executed
		  // });

		} else {
			// show error
		}
	}
}

</script>
