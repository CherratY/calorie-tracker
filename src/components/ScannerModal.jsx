import {
  useEffect,
  useRef
} from "react";

import {
  BrowserMultiFormatReader
} from "@zxing/browser";


export default function ScannerModal({
  onFoodFound,
  close
}) {

  const videoRef = useRef(null);

  const readerRef = useRef(null);


  useEffect(() => {

    const codeReader =
      new BrowserMultiFormatReader();

    readerRef.current =
      codeReader;


    async function startCamera() {

      try {

        await codeReader.decodeFromVideoDevice(

          undefined,

          videoRef.current,

          (result, error) => {


            if(result) {

              console.log(
                "BARCODE:",
                result.text
              );


              // temporary test
              alert(
                "Barcode detected: "
                + result.text
              );


            }


          }

        );


      } catch(error) {

        console.error(
          error
        );

      }

    }


    startCamera();


    return () => {

      codeReader.reset();

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
        onClick={()=>{
          close();
        }}
      >
        Close
      </button>


    </div>

  );

}