import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        countries: [],
    },


    //sitas bus naudojamas norint atvaizduoti musu data
    getters: {
        // posts cia yra FUNCTION!!!!!!!
        countries: state => {
            return state.countries;
        }
    },

    // responsible for changing the state data
    mutations: {
        SET_ITEMS (state, countries) {
            // cia lygtais pasakom, kad musu posts array is state object
            // yra lygus is API gauto response.data array
            state.countries = countries
        }
    },

    actions: { 
        async loadPosts ({ commit }) {
            try {
                const response = await axios.get('https://akademija.teltonika.lt/countries_api/api/countries');

                // pasakom kad norim paleisti 'SET_ITEMS' mutation/kad ja commit norim
                commit('SET_ITEMS', response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
    }
})