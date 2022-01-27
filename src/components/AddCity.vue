<template>
    <div @click="$emit('close')" class="modal__container">

        <div class="modal__content-container">
            <div class="modal__title-container">
                <a class="modal-title-text">
                    PRIDĖTI MIESTĄ
                </a>
            </div>

            <form @submit.prevent="postData" @keydown="errors.clear($event.target.name)">
                <div class="modal__form-container">
                    <div class="modal__form-input-container">
                        <div class="modal__form-title-container">
                            <a class="modal__form-title-text">Pavadinimas</a>
                        </div>
                        
                        <div class="modal__form-input-block">
                            <input name="data.attributes.name" v-model="data.attributes.name" class="modal__form-input" type="text">
                        </div>

                        
                        <span v-text="errors.get('data.attributes.name')" class="modal__form-input-error-msg"></span>

                    </div>
                    <div class="modal__form-input-container">
                        <div class="modal__form-title-container">
                            <a class="modal__form-title-text">Užimamas plotas</a>
                        </div>
                        
                        <div class="modal__form-input-block">
                            <input name="data.attributes.area" v-model="data.attributes.area" class="modal__form-input" type="number">
                        </div>

                        
                        <span v-text="errors.get('data.attributes.area')" class="modal__form-input-error-msg"></span>
                        

                    </div>
                    <div class="modal__form-input-container">
                        <div class="modal__form-title-container">
                            <a class="modal__form-title-text">Gyventojų skaičius</a>
                        </div>
                        
                        <div class="modal__form-input-block">
                            <input name="data.attributes.population" v-model="data.attributes.population" class="modal__form-input" type="number">
                        </div>

                        
                        <span v-text="errors.get('data.attributes.population')" class="modal__form-input-error-msg"></span>
                        

                    </div>
                    <div class="modal__form-input-container">
                        <div class="modal__form-title-container">
                            <a class="modal__form-title-text">Miesto Pašto kodas</a>
                        </div>
                        
                        <div class="modal__form-input-block">
                            <input name="data.attributes.phone_code" v-model="data.attributes.phone_code" class="modal__form-input" type="number">
                        </div>

                        
                        <span v-text="errors.get('data.attributes.phone_code')" class="modal__form-input-error-msg"></span>
                        

                    </div>
                    
                    
                    <div class="modal__form-btn-container">
                        <span v-text="this.postResponse" class="modal__form-input-success-msg"></span>
                        <div class="modal__form-btn-div-wrap">
                            <button type="submit" class="modal__form-btn">SAUGOTI</button>
                        </div>
                    </div>

                    <div class="modal__exit-btn-container">
                        <img src="../assets/media/close-symbol.svg" alt="">

                    </div>

                    
                    
                </div>
                
            </form>
            
        </div>
    </div>

</template>

<script>

class Errors {
    constructor() {
        this.errors = {};
    }
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    record(errors) {
        this.errors = errors
    }

    clear(field){
        delete this.errors[field];
    }

}


export default {
    name: 'AddCity',

    props: [
        'showModal',
        // 'response'
    ],

    data() {
        return {
            
            errors: new Errors(),
            id: this.$route.params.id,
            // okay: false,
            data: {
                attributes: {
                    name: '',
                    area: '',
                    population: '',
                    postal_code: '',
                }
            },
            postResponse: ''

        }
    },

    methods: {
        postData() {
            return this.$http.post('https://akademija.teltonika.lt/countries_api/api/countries/' + this.id + "/cities", {
                data: this.data
            })
            .then(this.onPostedSuccess)
            .catch(error => this.errors.record(error.response.data.errors))
        },

        onPostedSuccess(response) {
            this.postResponse = response.data.message;

            this.data.attributes.name = '';
            this.data.attributes.area = '';
            this.data.attributes.population = '';
            this.data.attributes.postal_code = '';
        }
    }

}
</script>

<style scoped>
    @import '../assets/styles/style.css';
    @import '../assets/styles/modal.css';
</style>
