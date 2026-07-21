import { useState } from "react";

import {
  getWeights,
  saveWeights
} from "../services/storage";


export default function WeightTracker(){

  const [weight,setWeight] =
    useState("");

  const [weights,setWeights] =
    useState(getWeights());


  function addWeight(){

    if(!weight) return;


    const entry = {

      id: Date.now(),

      weight:Number(weight),

      date:
        new Date()
        .toLocaleDateString()

    };


    const updated=[
      ...weights,
      entry
    ];


    saveWeights(updated);

    setWeights(updated);

    setWeight("");

  }


  return (

    <div>

      <input

        type="number"

        placeholder="Weight kg"

        value={weight}

        onChange={
          e=>setWeight(e.target.value)
        }

      />


      <button onClick={addWeight}>
        Add Weight
      </button>



      {
        weights.map(w=>(

          <div
            className="food-item"
            key={w.id}
          >

            {w.date}

            <br/>

            {w.weight} kg


          </div>

        ))
      }


    </div>

  );

}