export async function getFoodByBarcode(barcode) {

  try {

    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );


    const data =
      await response.json();


    if(data.status !== 1){

      console.log(
        "Product not found"
      );

      return null;

    }


    const product =
      data.product;


    return {

      name:
        product.product_name ||
        "Unknown product",


      calories:
        Math.round(
          product.nutriments?.energy_kcal_100g || 0
        ),


      protein:
        Number(
          product.nutriments?.proteins_100g || 0
        ),


      carbs:
        Number(
          product.nutriments?.carbohydrates_100g || 0
        ),


      fat:
        Number(
          product.nutriments?.fat_100g || 0
        )

    };


  } catch(error) {

    console.error(
      "Open Food Facts error:",
      error
    );

    return null;

  }

}