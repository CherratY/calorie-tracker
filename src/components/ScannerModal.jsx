import { useEffect, useRef } from "react";

import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType
} from "@zxing/library";


export default function ScannerModal({
  close
}) {

  const videoRef = useRef(null);

  const controlsRef = useRef(null);


  useEffect(() => {


    const hints = new Map();


    hints.set(
      DecodeHintType.POSSIBLE_FORMATS,
      [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E
      ]
    );


    const reader =
      new BrowserMultiFormatReader(
        hints
      );


    reader.decodeFromVideoDevice(

      undefined,

      videoRef.current,

      (result, error, controls) => {


        if(controls){

          controlsRef.current =
            controls;

        }


        if(result){

          console.log(
            "FOUND BARCODE:",
            result.getText()
          );


          alert(
            result.getText()
          );

        }


      }

    );


    return () => {

      if(controlsRef.current){

        controlsRef.current.stop();

      }

    };


  }, []);



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

        onClick={()=>{
          
          if(controlsRef.current){

            controlsRef.current.stop();

          }

          close();

        }}

      >
        Close
      </button>


    </div>

  );

}