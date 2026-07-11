import { LightningElement, track } from 'lwc';

export default class MyZodiacProject extends LightningElement {

     signExists = false;

     @track zodiacSign={};

     zodiacSigns = [
  {
    zodiacName: "Aries",
    startDate: "3-21",
    endDate: "4-19",
    about: "Aries is a fire sign known for being bold, energetic, and ambitious."
  },
  {
    zodiacName: "Taurus",
    startDate: "4-20",
    endDate: "5-20",
    about: "Taurus is an earth sign known for being reliable, patient, and practical."
  },
  {
    zodiacName: "Gemini",
    startDate: "5-21",
    endDate: "6-20",
    about: "Gemini is an air sign known for being adaptable, curious, and communicative."
  },
  {
    zodiacName: "Cancer",
    startDate: "6-21",
    endDate: "7-22",
    about: "Cancer is a water sign known for being emotional, intuitive, and caring."
  },
  {
    zodiacName: "Leo",
    startDate: "7-23",
    endDate: "8-22",
    about: "Leo is a fire sign known for being confident, charismatic, and creative."
  },
  {
    zodiacName: "Virgo",
    startDate: "8-23",
    endDate: "9-22",
    about: "Virgo is an earth sign known for being analytical, practical, and detail-oriented."
  },
  {
    zodiacName: "Libra",
    startDate: "9-23",
    endDate: "10-22",
    about: "Libra is an air sign known for being diplomatic, fair-minded, and sociable."
  },
  {
    zodiacName: "Scorpio",
    startDate: "10-23",
    endDate: "11-21",
    about: "Scorpio is a water sign known for being passionate, resourceful, and determined."
  },
  {
    zodiacName: "Sagittarius",
    startDate: "11-22",
    endDate: "12-21",
    about: "Sagittarius is a fire sign known for being adventurous, optimistic, and independent."
  },
  {
    zodiacName: "Capricorn",
    startDate: "12-22",
    endDate: "1-19",
    about: "Capricorn is an earth sign known for being disciplined, responsible, and goal-oriented."
  },
  {
    zodiacName: "Aquarius",
    startDate: "1-20",
    endDate: "2-18",
    about: "Aquarius is an air sign known for being innovative, independent, and humanitarian."
  },
  {
    zodiacName: "Pisces",
    startDate: "2-19",
    endDate: "3-20",
    about: "Pisces is a water sign known for being empathetic, artistic, and intuitive."
  }
];



    name;
    date;
    handleNameChange(event){
       this.name = event.target.value;

    }

    handleDateChange(event){
         this.date = event.target.value;
    }

    handleSubmit(){
       let userDob = new Date(this.date);
       let userMonth = userDob.getMonth()+1;
       let userDate = userDob.getDate();
 
       this.zodiacSign = this.checkMyZodiac(userDate,userMonth);
      
    }
     checkMyZodiac(day,month){
        
        for(let sign of this.zodiacSigns){
  
          let stats = sign.startDate.split("-").map(Number);
          let ends = sign.endDate.split("-").map(Number);  
      
          if((month == stats[0] && day >= stats[1]) || (month == ends[0] && day <= ends[1])){
        
        this.signExists=true;
        return sign;
    }
    }
 }
}