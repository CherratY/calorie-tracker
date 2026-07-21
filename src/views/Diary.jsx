import { useState } from "react";

import {
  getDiary,
  saveDiary
} from "../services/storage";

import ScannerModal from "../components/ScannerModal";

export default function Diary() {
  const [scanner,setScanner] =
    useState(false);
    
  const [diary, setDiary] =
    useState(getDiary());

  const [food, setFood] =
    useState("");

  const [meal, setMeal] =
    useState("Breakfast");

  const [calories, setCalories] =
    useState("");

  const [protein, setProtein] =
    useState("");

  const [carbs, setCarbs] =
    useState("");

  const [fat, setFat] =
    useState("");

  const addFood = () => {

    if (!food) return;

    const entry = {
      id: Date.now(),
      meal,
      food,
      calories:
        Number(calories) || 0,
      protein:
        Number(protein) || 0,
      carbs:
        Number(carbs) || 0,
      fat:
        Number(fat) || 0
    };

    const updated = [
      ...diary,
      entry
    ];

    saveDiary(updated);
    setDiary(updated);

    setFood("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const removeFood = (id) => {

    const updated =
      diary.filter(
        item => item.id !== id
      );

    saveDiary(updated);
    setDiary(updated);
  };

  const meals = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks"
  ];

  return (
    <div className="page">

      <h1>Diary</h1>

      <div className="card">
        <button
onClick={()=>
setScanner(true)
}
>
📷 Scan Food
</button>

        <select
          value={meal}
          onChange={(e) =>
            setMeal(e.target.value)
          }
        >
          {meals.map(m => (
            <option key={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          placeholder="Food name"
          value={food}
          onChange={(e) =>
            setFood(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) =>
            setCalories(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) =>
            setProtein(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={(e) =>
            setCarbs(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Fat (g)"
          value={fat}
          onChange={(e) =>
            setFat(
              e.target.value
            )
          }
        />

        <button onClick={addFood}>
          Add Food
        </button>

      </div>

      {meals.map(mealName => {

        const mealFoods =
          diary.filter(
            item =>
              item.meal ===
              mealName
          );

        return (
          <div
            className="card"
            key={mealName}
          >
            <h2>{mealName}</h2>

            {mealFoods.length === 0 &&
              <p>
                No foods yet
              </p>
            }

            {mealFoods.map(item => (

              <div
                key={item.id}
                className="food-item"
              >
                <strong>
                  {item.food}
                </strong>

                <p>
                  {item.calories}
                  kcal
                </p>

                <p>
                  P:
                  {item.protein}
                  g |
                  C:
                  {item.carbs}
                  g |
                  F:
                  {item.fat}
                  g
                </p>

                <button
                  onClick={() =>
                    removeFood(
                      item.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>
        );
      })}

    {

  scanner && (

    <ScannerModal

close={() =>
  setScanner(false)
}


onFoodFound={(food)=>{


const updated = [

  ...diary,

  {

    id: Date.now(),

    meal,

    food: food.name,

    calories: food.calories,

    protein: food.protein,

    carbs: food.carbs,

    fat: food.fat

  }

];


saveDiary(updated);

setDiary(updated);

setScanner(false);


}}

/>

  )
}
    </div>
  );
}