let chuckFacts = new Vue({
    el: "#chuckFacts",

    data: {
        appName: 'Chuck Norris Facts',
        categories: [],
        currentFact: '',
        facts: [],
        isFetchingAFact: false,
        choice: '',
        query: '',
        searchHistory: []
    },

    //To populate the categories array upon first load of the page
    created: function(){
        this.getCategories();
    },

    methods:{

        //Method to retrive categories
        getCategories: function(){
            let viewModel = this
            
            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                console.log(response.data)
                //Push each value from response into categories array
                for(i = 0; i < response.data.length; i++) {
                    viewModel.categories.push(response.data[i])
                }
            })
            .catch(function(err){
                alert(err)
            })
        },

        // Method to retrieve a fact
        getFact: function(){

            this.isFetchingAFact = true
            let viewModel = this

            axios.get('https://api.chucknorris.io/jokes/random', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                console.log(response)
                viewModel.isFetchingAFact = false
                viewModel.currentFact = response.data.value
            })
            .catch(function(err){
                alert(err)
            })

        },

        // Method to retrieve a fact based on the category selected
        // not sure if this is working correctly
        searchByCategory: function(choice){
            
            this.isFetchingAFact = true
            let viewModel = this

            viewModel.facts =[];

            axios.get('https://api.chucknorris.io/jokes/random?category=' + this.choice, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                console.log(response)
                viewModel.isFetchingAFact = false
                viewModel.currentFact = response.data.value
            })
            .catch(function(err){
                alert(err) 
            })

        },

        // Method to retrieve a fact based on entered query
        //planned to take in the input from input field in html file and pass it as a field for query
        searchFact: function(query){

            this.isFetchingAFact = true
            let viewModel = this

            axios.get('https://api.chucknorris.io/jokes/search?query=' + this.query, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                console.log(query)
                console.log(response.data.result)

                viewModel.facts = [];
                viewModel.currentFact = null;

                viewModel.searchHistory.push(query)

                for(i = 0; i < response.data.result.length; i++) {
                    viewModel.isFetchingAFact = false
                    viewModel.facts.push(response.data.result[i].value)
                }

            })
            .catch(function(err){
                alert(err)
            })

        }
    }

})