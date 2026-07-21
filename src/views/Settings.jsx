import { useState } from "react";

import {
  getSettings,
  saveSettings
} from "../services/storage";

import {
  calculateBMR,
  calculateTDEE
} from "../services/nutrition";

import {
calculateBMI
}
from "../services/body";

export default function Settings() {
  const initial = getSettings();

  const [settings, setSettings] =
    useState(initial);

  const bmr = calculateBMR(
    settings.gender,
    settings.weight,
    settings.height,
    settings.age
  );

  const tdee = calculateTDEE(
    settings.gender,
    settings.weight,
    settings.height,
    settings.age,
    settings.activity
  );

  const save = () => {
    saveSettings({
      ...settings,
      goalCalories: tdee
    });

    alert("Saved");
  };

  return (
    <div className="page">
      <h1>Settings</h1>

      <div className="card">

        <label>Age</label>
        <input
          type="number"
          value={settings.age}
          onChange={(e) =>
            setSettings({
              ...settings,
              age: Number(e.target.value)
            })
          }
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          value={settings.weight}
          onChange={(e) =>
            setSettings({
              ...settings,
              weight: Number(e.target.value)
            })
          }
        />

        <label>Height (cm)</label>
        <input
          type="number"
          value={settings.height}
          onChange={(e) =>
            setSettings({
              ...settings,
              height: Number(e.target.value)
            })
          }
        />

        <label>Gender</label>
        <select
          value={settings.gender}
          onChange={(e) =>
            setSettings({
              ...settings,
              gender: e.target.value
            })
          }
        >
          <option value="male">Male</option>
          <option value="female">
            Female
          </option>
        </select>

        <label>Activity</label>
        <select
          value={settings.activity}
          onChange={(e) =>
            setSettings({
              ...settings,
              activity: Number(e.target.value)
            })
          }
        >
          <option value="1.2">
            Sedentary
          </option>
          <option value="1.375">
            Light
          </option>
          <option value="1.55">
            Moderate
          </option>
          <option value="1.725">
            Active
          </option>
          <option value="1.9">
            Athlete
          </option>
        </select>

        <br />
        <br />

        <h3>BMR: {Math.round(bmr)}</h3>
        <h3>TDEE: {tdee}</h3>

        <h3>
BMI:
{
calculateBMI(
settings.weight,
settings.height
)
}
</h3>

        <button onClick={save}>
          Save
        </button>

      </div>
    </div>
  );
}