<template>
    <div class="main-body">
            <div class="title-container">
                <div class="title__items">
                    <a class="title__items-text">ŠALYS</a>

                    <div class="title__items-add-container">
                        <div @click="showModal = true" class="title__items-add-btn">
                            <img src="../assets/media/plus-symbol.svg" alt="">
                        </div>
                    </div>
                    
                </div>
            </div>

            <AddCountry v-if="showModal" @close="showModal = false"></AddCountry>

            <div class="search-container">

                <div class="search__items">
                    <div class="search__items-search-block">
                        <div class="search__items-search-input-container">
                            <input v-model="search" type="text">
                        </div>
                        <div @click.prevent="getData" class="search__items-search-icon-container">
                            <img src="../assets/media/search-symbol.svg" alt=""> 
                        </div>
                    </div>

                    <div class="search__items-data-filter-block">
                        <div class="search__items-data-filter-text-container">
                            <a class="search__items-data-filter-text">
                                DATA FILTER
                            </a>
                        </div>

                        <div class="search__items-data-filter-dropdown-container">
                            <img src="../assets/media/drop-down-symbol.svg" alt="">
                        </div>
                    </div>
                </div>

            </div>

            

            <div class="table-container">
                <table class="table__whole">
                    <thead class="table__header">
                        <tr>
                            <th>
                                <div class="table__header-nameAND-icon-container">
                                    Pavadinimas

                                    <div @click="sortedArray" class="table__header-sort-container">
                                        <div class="table__header-sort-icons">
                                            <img src="../assets/media/sort-up-symbol.svg" alt="">
                                        </div>
                                        <div class="table__header-sort-icons">
                                            <img src="../assets/media/sort-down-symbol.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>UŽIMAMAS PLOTAS</th>
                            <th>GYVENTOJŲ SKAIČIUS</th>
                            <th>ŠALIES TEL. KODAS</th>
                            <th>VEIKSMAI</th>
                        </tr>
                    </thead>

                    <tbody v-for="country in countries" :key="country.id" class="table__body">
                        <tr>
                            <td>
                                <router-link :to="'/countries/' + country.id + '/cities'">
                                    <a>{{ country.attributes.name }}</a>
                                </router-link>
                                
                            </td>
                            <td>{{ country.attributes.area }}</td>
                            <td>{{ country.attributes.population }}</td>
                            <td>{{ country.attributes.phone_code }}</td>
                            <td>
                                <div class="table__body-options-container">
                                    <div class="table__body-actions">
                                        <img @click="deleteCountry(country)" src="../assets/media/delete-symbol.svg" alt="">
                                    </div>

                                    <div>
                                        <img src="../assets/media/table-line.svg" alt="">
                                    </div>

                                    <div class="table__body-actions">

                                        <router-link :to="'/countries/' + country.id + '/edit'">
                                            <img src="../assets/media/edit-symbol.svg" alt="">
                                        </router-link>
                                        
                                    </div>
                                </div>
                            </td>
                        </tr>

                        
                        
                    </tbody>
                </table>
            </div>

            <div v-if="meta.links && meta.links.length" class="pagination-container">
                <div class="pagination__previous-page-container">
                    <router-link class="pagination-previous" v-if="meta.current_page !== 1" :to="{ query: { page: meta.current_page - 1 }}">
                        <img src="../assets/media/pagination-prev-symbol.svg" alt="">
                    </router-link>
                </div>

                <div v-for="page in meta.last_page" :key="page" class="pagination__pages-container">
                    <router-link :class="{'pagination__pages-current-page' : page === meta.current_page}" :to="{ query : { page: page }}">
                        {{ page }}
                    </router-link>
                </div>

                <div class="pagination__next-page-container">
                    <router-link v-if="meta.current_page !== meta.last_page" class="pagination-next" :to="{ query : { page: meta.current_page + 1 }}">
                        <img src="../assets/media/pagination-next-symbol.svg" alt="">
                    </router-link>                
                </div>
            </div>

    </div>

</template>

<script>
  import AddCountry from './AddCountry'

  export default {
      name: 'Countries',
      components: {
        AddCountry,
        // EditCountry
      },
      
      data() {
          return {
              meta: {},
              countries: [],
              search: '',
              showModal: false,
              descending: null
              // showEdit: false
              // response: true,
          };
      },

      watch: {
        '$route.query.page': {
          immediate: true,
          handler(page) {
            page = parseInt(page) || 1;
            if ( page !== this.meta.current_page ) {
              this.$http.get(`https://akademija.teltonika.lt/countries_api/api/countries?page=${page}`)
              .then(response => {
                this.meta = response.data.meta;
                this.countries = response.data.data;
              })
            }
          }
        }
      },

      methods: {
        getData(page) {
          console.log(`Checking term ${this.search}`);
          this.$http.get(`https://akademija.teltonika.lt/countries_api/api/countries?page=${page}&search=${this.search}`)
          .then(response => {
            console.log(response.data.results);
            this.countries = response.data.data
          })
          .catch(errors => {
            console.log(errors);
          })

        },

        deleteCountry(country){
          let choice = confirm(`Are you sure you want to delete ${country.attributes.name}?`)
          
          if(choice) {
            let testCountries = this.countries.filter(cntry => cntry.id != country.id)
            this.countries = testCountries;
            
            this.$http({
            method: 'delete',
            url: 'https://akademija.teltonika.lt/countries_api/api/countries/' + country.id
            })
            .then(response =>{
              console.log(response.data.message);
            })
            .catch(errors => {
              console.log(errors);
            })
          }
          
        },

        sortedArray(){
          if(this.descending == false){
            this.descending = true;
            return this.countries.sort((a, b) => b.attributes.population - a.attributes.population);
        
          } else {
            this.descending = false;
            return this.countries.sort((a, b) => a.attributes.population - b.attributes.population);
          }
          
          
        }
      },

        

    // mixins: [searchMixin]
    
  };
</script>

<style scoped>
  @import '../assets/styles/style.css';
  @import '../assets/styles/title.css';
  @import '../assets/styles/search.css';
  @import '../assets/styles/table.css';
  @import '../assets/styles/pagination.css';
  
</style>