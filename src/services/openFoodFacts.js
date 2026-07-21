export async function getFoodByBarcode(barcode) {

  try {

    const response =
      await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );


    const data =
      await response.json();


    if (
      data.status !== 1
    ) {
      return null;
    }


    const product =
      data.product;


    return {

      name:
        product.product_name ||
        "Unknown food",


      calories:
        Math.round(
          product.nutriments
          .energy_kcal_100g || 0
        ),


      protein:
        Math.round(
          product.nutriments
          .proteins_100g || 0
        ),


      carbs:
        Math.round(
          product.nutriments
          .carbohydrates_100g || 0
        ),


      fat:
        Math.round(
          product.nutriments
          .fat_100g || 0
        )

    };


  } catch(error){

    console.log(error);

    return null;

  }

}