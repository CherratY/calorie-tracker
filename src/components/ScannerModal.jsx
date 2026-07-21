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

    const reader =
      new BrowserMultiFormatReader();


    readerRef.current = reader;


    reader.decodeFromVideoDevice(

      undefined,

      videoRef.current,

      (result, error) => {

        if(result){

          console.log(
            "BARCODE:",
            result.text
          );

        }

      }

    );


    return () => {

      if(readerRef.current){

        readerRef.current.reset();

      }

    };


  }, []);



  function handleClose(){

    // stop camera first

    if(readerRef.current){

      readerRef.current.reset();

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
        onClick={handleClose}
      >
        Close
      </button>


    </div>

  );

}