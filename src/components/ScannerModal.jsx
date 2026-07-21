import { useEffect, useRef } from "react";

import {
  BrowserMultiFormatReader
} from "@zxing/browser";


export default function ScannerModal({
  close,
  onFoodFound
}) {

  const videoRef = useRef(null);

  const controlsRef = useRef(null);

  const detectedRef = useRef(false);


  useEffect(() => {

    const reader =
      new BrowserMultiFormatReader();


    reader.decodeFromVideoDevice(

      undefined,

      videoRef.current,

      (result, error, controls) => {


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

            onFoodFound(barcode);

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