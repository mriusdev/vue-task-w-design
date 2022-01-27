export default {
    computed: {
        filteredCountries() {
            //pasiema current array, cycles through it ir kiekviena karta
            //musu funkcija ivykdo
            return this.countries.filter((country) => {
                //jeigu true, tai tas blog stays in the array, otherwise - removed
                return country.attributes.name.toLowerCase().match(this.search.toLowerCase());
            })
        }
    }
}