export function calculateBMI(
weight,
height
){

const meters =
height / 100;


return (
weight /
(meters * meters)
).toFixed(1);

}