import {
  Line
} from "react-chartjs-2";


import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement

} from "chart.js";


import {
  getWeights
} from "../services/storage";


import WeightTracker
from "../components/WeightTracker";


ChartJS.register(

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement

);



export default function Progress(){


const weights =
getWeights();



const data={


labels:

weights.map(
w=>w.date
),


datasets:[

{

label:"Weight",

data:

weights.map(
w=>w.weight
),

}

]


};



return (

<div className="page">


<h1>
Progress
</h1>


<div className="card">

<h2>
Weight Tracking
</h2>


<WeightTracker/>


</div>



<div className="card">


<h2>
Weight History
</h2>


{

weights.length > 0 &&

<Line data={data}/>

}


</div>



</div>

);


}