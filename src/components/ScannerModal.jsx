import { useEffect, useRef } from "react";

import {
  BrowserMultiFormatReader
} from "@zxing/browser";

import {
  getFoodByBarcode
} from "../services/openFoodFacts";

export default function ScannerModal({
  close,
  onFoodFound
}) {

  const videoRef = useRef(null);

  const controlsRef = useRef(null);

  const detectedRef = useRef(false);


  useEffect(() => {

    detectedRef.current = false;

    const reader =
      new BrowserMultiFormatReader();


    reader.decodeFromVideoDevice(

      undefined,

      videoRef.current,

      async (result, error, controls) => {


        if (controls) {

          controlsRef.current =
            controls;

        }


        if (result && !detectedRef.current) {


          detectedRef.current = true;


          const barcode =
            result.getText();


          console.log(
            "BARCODE FOUND:",
            barcode
          );


          // stop camera immediately

          if(controlsRef.current){

            controlsRef.current.stop();

          }


          if(onFoodFound){

            const food =
              await getFoodByBarcode(barcode);

            if(food){
              onFoodFound(food);
            }

          }


        }


      }

    );


    return () => {

      if(controlsRef.current){

        controlsRef.current.stop();

      }

    };


  }, []);



  function handleClose(){

    if(controlsRef.current){

      controlsRef.current.stop();

    }

    close();

  }



  return (

    <div className="scanner">


      <h2>
        Scan Barcode
      </h2>


      <video

        ref={videoRef}

        autoPlay

        muted

        playsInline

      />


      <button

        type="button"

        onClick={handleClose}

      >
        Close
      </button>


    </div>

  );

}