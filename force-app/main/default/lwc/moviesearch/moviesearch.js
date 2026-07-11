import searchMovies from '@salesforce/apex/Omdbsearchservice.searchMovies';
import MOVIE_CHANNEL from '@salesforce/messageChannel/movieSearchChannel__c';
import { MessageContext, publish } from "lightning/messageService";
import { LightningElement, wire } from 'lwc';
const DELAY=300;
export default class moviesearch extends LightningElement {

    selectedType='';
    selectedPage='1';
    selectedSearchTerm='';
    isLoading=false;
    delayTimeout;
    searchResult;
    totalResults;
    selectedMovie;
    error;

     @wire(MessageContext)
  messageContext;

    get getTypeOptions(){
        return [
            {label:'None',value:''},
            {label:'Movie',value:'movie'},
            {label:'Series',value:'series'},
            {label:'Episode',value:'episode'}
        ]
    }

    handleChange(event){
        
        let{name,value}=event.target;
        this.isLoading=true;
        if(name==='type'){
            this.selectedType=value;}
            else if(name==='pageNo'){
                this.selectedPage=value;
            }
            else if(name==='search'){
                this.selectedSearchTerm=value;
            }

            clearTimeout(this.delayTimeout);
           this.delayTimeout= setTimeout(() => {
                this.searchMovie()
            }, DELAY);
                 
     }

     //this is used to search the movie
    

async searchMovie() {
    this.isLoading = true;

    try {
        const result = await searchMovies({
            searchText: this.selectedSearchTerm,   // s
            type: this.selectedType,               // movie | series | episode
            year: null,                            // optional
            responseType: 'json',
            page: this.selectedPage                // page number
        });

        const data = JSON.parse(result);
        console.log('movie output', data);
        console.log('data got successfully');
        

        if (data.Response === 'True') {
            this.searchResult = data.Search;
            this.totalResults = data.totalResults;
            console.log('Movies:', JSON.stringify(this.searchResult));
        } else {
            this.searchResult = [];
            this.error = data.Error;
        }
    } catch (error) {
        console.error('Apex error', error);
        this.error = error.body ? error.body.message : error.message;
    } finally {
        this.isLoading = false;
    }
}

selectedMovieHandler(event){
  this.selectedMovie=event.detail;
  console.log('event listened');

  const payload = { movieId: this.selectedMovie}; 

    publish(this.messageContext, MOVIE_CHANNEL, payload);
  
}

 
}