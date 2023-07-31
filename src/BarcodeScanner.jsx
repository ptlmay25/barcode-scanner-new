import React, { useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Haptics } from "@capacitor/haptics";

const BarScanner = () => {
  // --------------------  set barcode data ------------------- //

  const [scannedData, setScannedData] = useState("");

  //  ------------------- prepare it accelarate code scan for performance  ------------- //

  const prepare = () => {
    BarcodeScanner.prepare();
    startScan();
  };

  //----------------------- barcode scan code ------------------------------------------ //

  const startScan = async () => {
    try {
      // ------------------- Check user camera permission  ---------------------------  //
      await BarcodeScanner.checkPermission({ force: true });

      BarcodeScanner.hideBackground();
      setScannedData("");

      // --------------- start scanning and wait for a result
      const result = await BarcodeScanner.startScan();

      // if the result has content

      if (result.hasContent) {
        setScannedData(result.content); // set the scanned content
        // console.log(result.content);
        // Trigger a vibration
        Haptics.vibrate({ style: "light", duration: 100 });
      }
    } catch (error) {
      console.error("Error while scanning barcode:", error);
    }
  };

  return (
    <div className="self-stretch w-full flex px-10 justify-center items-center flex-col pb-20 bg-white absolute bottom-0">
      <div className="flex justify-center items-center flex-col">
        <button
          onClick={prepare}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Scan Barcode
        </button>
        {scannedData && (
          <a
            href={scannedData}
            className="text-center justify-center items-center mt-4"
          >
            Scanned Data:{scannedData}
          </a>
        )}
      </div>
    </div>
  );
};

export default BarScanner;
