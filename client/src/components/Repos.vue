<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="10%">
        <h1>Top 100 Trending Github Repositories</h1>
        <hr><br>
        <div v-for="r in repos" v-bind:key="r.id">
          <h4>Language: {{r.language}}</h4>
          <h6>Count: {{r.count}} </h6>
          <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Url</th>
                  <th scope="col">Fav</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="x in r.repos" v-bind:key="x.id">
                  <td>{{x.description}}</td>
                  <td><a target="_blank" :href="x.url">{{ x.url }}</a></td>
                  <td>    
                  <input type="checkbox" 
                        :checked="favs.includes(x.id.toString())"
                        @change="setFavourite(x.id)">                     
                  </td>
                </tr>
              </tbody>
          </table>
          <br><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Web3Adapter from '../libs/Web3Adapter'

export default {
  mixins: [Web3Adapter], 
  name: 'Repos',
  data() {
    return {
      repos: [],
    };
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/trending-repos';
      axios.get(path)
        .then((res) => {
          this.repos = res.data.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },

    getTest() {
      window.w3.getTest();
    }, 

    listenEvent(){
      window.w3.listenEvent();
    },

    setFavourite(id) {
      window.w3.setFavourite(id);
    },    

    async getUserFavourites(){
      this.favs = await window.w3.getUserFavourites();
    }

  },
  created() {
    this.getMessage();
    this.getUserFavourites();
  },
}
</script>
