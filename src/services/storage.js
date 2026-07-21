const DIARY_KEY = "currentDiary";
const HISTORY_KEY = "diaryHistory";


function today(){

  return new Date()
    .toISOString()
    .split("T")[0];

}



export function getDiary(){

  const saved =
    localStorage.getItem(
      DIARY_KEY
    );


  if(!saved){

    return createNewDay();

  }


  const diary =
    JSON.parse(saved);


  // new day detected

  if(diary.date !== today()){


    saveHistory(diary);


    return createNewDay();

  }


  return diary.meals;

}




function createNewDay(){

  const newDiary = {

    date: today(),

    meals: []

  };


  localStorage.setItem(

    DIARY_KEY,

    JSON.stringify(newDiary)

  );


  return [];

}





export function saveDiary(meals){


  const data = {

    date: today(),

    meals

  };


  localStorage.setItem(

    DIARY_KEY,

    JSON.stringify(data)

  );


}





function saveHistory(day){


  const history =
    JSON.parse(

      localStorage.getItem(
        HISTORY_KEY
      )

    ) || [];



  history.push(day);



  localStorage.setItem(

    HISTORY_KEY,

    JSON.stringify(history)

  );


}





export function getHistory(){

  return JSON.parse(

    localStorage.getItem(
      HISTORY_KEY
    )

  ) || [];

}