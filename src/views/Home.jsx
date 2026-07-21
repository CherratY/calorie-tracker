import {
  getDiary,
  getSettings
} from "../services/storage";

export default function Home() {

  const diary =
    getDiary();

  const settings =
    getSettings();
const calories =
  diary.reduce(
    (sum, item) =>
      sum +
      (Number(item.calories) || 0),
    0
  );

const protein =
  diary.reduce(
    (sum, item) =>
      sum +
      (Number(item.protein) || 0),
    0
  );


const carbs =
  diary.reduce(
    (sum, item) =>
      sum +
      (Number(item.carbs) || 0),
    0
  );


const fat =
  diary.reduce(
    (sum, item) =>
      sum +
      (Number(item.fat) || 0),
    0
  );

  return (
    <div className="page">

      <h1>Dashboard</h1>

      <div className="card">

        <h2>
          Remaining Calories
        </h2>

        <h1>
          {
            settings.calories -
            calories
          }
        </h1>

      </div>

      <div className="card">

        <h3>
          Calories
        </h3>

        <p>
          {calories} /
          {
            settings.calories
          }
        </p>

      </div>

      <div className="card">

        <h3>
          Protein
        </h3>

        <p>
          {protein} g
        </p>

      </div>

      <div className="card">

        <h3>
          Carbs
        </h3>

        <p>
          {carbs} g
        </p>

      </div>

      <div className="card">

        <h3>Fat</h3>

        <p>
          {fat} g
        </p>

      </div>

    </div>
  );
}