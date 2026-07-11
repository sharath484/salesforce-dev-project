import { LightningElement, api } from 'lwc';

export default class Movietile extends LightningElement {

    @api searchItem;
    @api selectedMovieId;

    clickhandler(event){
        const selectMovie = new CustomEvent('selectedmovie', {
            detail: this.searchItem.imdbID
        });
        this.dispatchEvent(selectMovie);
        console.log('event fired');
    }

     get tileSelected(){
        return this.selectedMovieId === this.searchItem.imdbID ? "selected" : "tile";
    }
}