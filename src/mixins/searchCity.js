export default {
    computed: {
        filteredCities() {
            //pasiema current array, cycles through it ir kiekviena karta
            //musu funkcija ivykdo
            return this.cities.filter((city) => {
                //jeigu true, tai tas blog stays in the array, otherwise - removed
                return city.attributes.name.toLowerCase().match(this.search.toLowerCase());
            })
        }
    }
}