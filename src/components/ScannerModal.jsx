import {
  useEffect,
  useRef
} from "react";

import {
  BrowserMultiFormatReader
} from "@zxing/browser";


export default function ScannerModal({
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

        if (result) {

          console.log(
            "FOUND:",
            result.text
          );

        }

      }

    );


    return () => {

      reader.reset();

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
        onClick={() => {

          if(readerRef.current){

            readerRef.current.reset();

          }

          close();

        }}
      >
        Close
      </button>


    </div>

  );

}