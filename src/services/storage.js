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


  return diary.meals.map(item => ({
    ...item,
    calories: Number(item.calories) || 0,
    protein: Number(item.protein) ||0,
    carbs: Number(item.carbs) ||0,
    fat: Number(item.fat) || 0
  }));

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

export function getSettings(){

  const saved =
    localStorage.getItem(
      "settings"
    );


  return saved
    ? JSON.parse(saved)
    : {

        calories: 2000,

        protein: 150,

        carbs: 250,

        fat: 70

      };

}

export function saveSettings(settings){

  localStorage.setItem(

    "settings",

    JSON.stringify(settings)

  );

}

const WEIGHTS_KEY = "weights";


export function getWeights(){

  const saved =
    localStorage.getItem(
      WEIGHTS_KEY
    );


  return saved
    ? JSON.parse(saved)
    : [];

}



export function saveWeights(weights){

  localStorage.setItem(

    WEIGHTS_KEY,

    JSON.stringify(weights)

  );

}