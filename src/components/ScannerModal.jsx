import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  BrowserMultiFormatReader
} from "@zxing/browser";

import {
  getFoodByBarcode
} from "../services/openFoodFacts";


export default function ScannerModal({
  onFoodFound,
  close
}) {

  const videoRef = useRef(null);

  const readerRef = useRef(null);

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    let active = true;


    async function startScanner() {

      if (!videoRef.current) return;


      const reader =
        new BrowserMultiFormatReader();


      readerRef.current = reader;


      await reader.decodeFromVideoDevice(

        undefined,

        videoRef.current,

        async (result) => {


          if (
            result &&
            active
          ) {

            setLoading(true);


            const food =
              await getFoodByBarcode(
                result.text
              );


            if (food) {

              onFoodFound(food);

            }


            setLoading(false);

          }

        }

      );

    }


    startScanner();


    return () => {

      active = false;


      if (readerRef.current) {

        readerRef.current.reset();

      }

    };


  }, [onFoodFound]);



  return (

    <div className="scanner">


      <h2>
        Scan Barcode
      </h2>


      <video

        ref={videoRef}

        style={{
          width:"100%"
        }}

        autoPlay

        muted

        playsInline

      />


      {
        loading &&

        <p>
          Searching food...
        </p>

      }


      <button
        onClick={close}
      >
        Close
      </button>


    </div>

  );

}