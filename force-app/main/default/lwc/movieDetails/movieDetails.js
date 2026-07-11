import movieData from '@salesforce/apex/Omdbsearchservice.getMovieData';
import movieSearchChannel from '@salesforce/messageChannel/movieSearchChannel__c';
import {
  APPLICATION_SCOPE,
  MessageContext,
  subscribe,
  unsubscribe,
} from "lightning/messageService";
import { LightningElement, wire } from 'lwc';

export default class MovieDetails extends LightningElement {

    subscription = null;
    movieId;
    movieDetails=[];
    error;
    loadComponent=false;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
      @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    if (this.subscription) {
      return;
    }
    this.subscription = subscribe(
      this.messageContext,
      movieSearchChannel,
      (message) => this.handleMessage(message),
      { scope: APPLICATION_SCOPE }
    );
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleMessage(message) {
    console.log('Message received: ', message);
    this.movieId = message.movieId;
    this.getMovieDetails();
    this.loadComponent=true;
  }

  async getMovieDetails(){
    
    try{
        const result = await movieData({imdbId: this.movieId,
         title:null,
         type:null,
        year:null,
         plot:'full',
         response:'json',
         callback:null,
         version:1});
         const data = JSON.parse(result);
        console.log('movie output', data);
        console.log('data got successfully');
        
        if(data.Response === 'True'){
            this.movieDetails = data;
            console.log('Movies:', JSON.stringify(this.movieDetails));

        }
        else{
            this.movieDetails = [];
            this.error = data.Error;
        }
      }
        catch(error){
            console.error('Apex error', error);
      }
    }
}