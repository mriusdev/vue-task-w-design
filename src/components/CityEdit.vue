<template>
        <div class="main-body">

        
            <div class="modal__content-container">
                <div class="modal__title-container">
                    <a class="modal-title-text">
                        REDAGUOTI ŠALĮ
                    </a>
                </div>

                <form>
                    <div v-if="city.data.attributes != null" class="modal__form-container">
                        <div class="modal__form-input-container">
                            <div class="modal__form-title-container">
                                <a class="modal__form-title-text">Pavadinimas</a>
                            </div>
                            
                            <div class="modal__form-input-block">
                                <input v-model="city.data.attributes.name" class="modal__form-input" type="text">
                            </div>

                            
                            <!-- <span class="modal__form-input-error-msg">Error msg</span> -->
                            

                            

                        </div>
                        <div class="modal__form-input-container">
                            <div class="modal__form-title-container">
                                <a class="modal__form-title-text">Užimamas plotas</a>
                            </div>
                            
                            <div class="modal__form-input-block">
                                <input v-model="city.data.attributes.area" class="modal__form-input" type="text">
                            </div>

                            
                            <!-- <span class="modal__form-input-error-msg">Error msg</span> -->
                            

                            

                        </div>
                        <div class="modal__form-input-container">
                            <div class="modal__form-title-container">
                                <a class="modal__form-title-text">Gyventojų skaičius</a>
                            </div>
                            
                            <div class="modal__form-input-block">
                                <input v-model="city.data.attributes.population" class="modal__form-input" type="text">
                            </div>

                            
                            <!-- <span class="modal__form-input-error-msg">Error msg</span> -->
                            

                            

                        </div>
                        <div class="modal__form-input-container">
                            <div class="modal__form-title-container">
                                <a class="modal__form-title-text">Šalies Tel. kodas</a>
                            </div>
                            
                            <div class="modal__form-input-block">
                                <input v-model="city.data.attributes.postal_code" class="modal__form-input" type="text">
                            </div>

                            
                            <!-- <span class="modal__form-input-error-msg">Error msg</span> -->
                            

                        

                        </div>
                        
                        
                        <div class="modal__form-btn-container">
                            <router-link :to="{ name: 'home' }">
                                <span class="modal__form-input-success-msg">{{ this.responseMsg }} - Grizti atgal?</span>
                            </router-link>
                            
                            <div class="modal__form-btn-div-wrap">
                                <button @click="saveCity()" class="modal__form-btn">SAUGOTI</button>
                            </div>
                        </div>


                        
                        
                    </div>
                    
                </form>
                
            </div>
        </div>
</template>

<script>
export default {
    name: 'CityEdit',
    data(){
        return {
            city: {
                data: {}
            },
            id: this.$route.params.id,
            idCity: this.$route.params.idCity,
            responseMsg: null
        }
    },

    methods: {
        getData() {
            this.$http.get(`https://akademija.teltonika.lt/countries_api/api/countries/${this.id}/cities/${this.idCity}`)
            .then(response => {
                this.city.data = response.data.data;
                console.log(this.city);
            })
            .catch(errors => {
                console.log(errors);
            })
        },

        saveCity() {
            this.$http.put('https://akademija.teltonika.lt/countries_api/api/countries/' + this.id + '/cities/' + this.idCity, {
                data: this.city.data
            })
            .then(response =>{
                console.log(response.data.message);
                this.responseMsg = response.data.message;
                
            })
            .catch(errors => {
            console.log(errors);
            })

            //istrinam vids is musu local array
            // let updatedCountry = this.country.forEach( cntry => {
            //     if(cntry.id == country.id) {
            //         cntry = country
            //     }
            //     return cntry = updatedCountry
                
            // })

            
        }
        
    },

    mounted() {
        this.getData();
    },
}
</script>

<style scoped>
    @import '../assets/styles/style.css';
    @import '../assets/styles/edit.css';
</style>