export function calculateBMR(
  gender,
  weight,
  height,
  age
) {
  if (gender === "male") {
    return (
      10 * weight +
      6.25 * height -
      5 * age +
      5
    );
  }

  return (
    10 * weight +
    6.25 * height -
    5 * age -
    161
  );
}

export function calculateTDEE(
  gender,
  weight,
  height,
  age,
  activity
) {
  const bmr = calculateBMR(
    gender,
    weight,
    height,
    age
  );

  return Math.round(bmr * activity);
}