const SETTINGS_KEY = "ct_settings";
const DIARY_KEY = "ct_diary";
const WEIGHT_KEY = "ct_weights";


export function getSettings() {
  return JSON.parse(
    localStorage.getItem(SETTINGS_KEY)
  ) || {
    age: 21,
    gender: "male",
    weight: 84,
    height: 180,
    activity: 1.55,
    goalCalories: 2500,
    goalWeight: 75
  };
}


export function saveSettings(settings) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  );
}


export function getDiary() {
  return JSON.parse(
    localStorage.getItem(DIARY_KEY)
  ) || [];
}


export function saveDiary(diary) {
  localStorage.setItem(
    DIARY_KEY,
    JSON.stringify(diary)
  );
}


// WEIGHT TRACKING

export function getWeights() {
  return JSON.parse(
    localStorage.getItem(WEIGHT_KEY)
  ) || [];
}


export function saveWeights(weights) {
  localStorage.setItem(
    WEIGHT_KEY,
    JSON.stringify(weights)
  );
}