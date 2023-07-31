import React, { useState, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const ScanComp = () => {
  const [scannedData, setScannedData] = useState("");

  const prepare = () => {
    BarcodeScanner.prepare(startScan);
  };

  const startScan = async () => {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      BarcodeScanner.hideBackground();
      setScannedData("");

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        setScannedData(result.content);
      }
    } catch (error) {
      console.error("Error while scanning barcode:", error);
    }
  };

  // Run the prepare function when the component mounts (on page load)
  useEffect(() => {
    prepare();
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <>
      <div className="relative sample-background"></div>
      <div className="relative container">
        <div className="relative barcode-scanner--area--container">
          {/* <div className="relative">
            <p>Aim your camera at a barcode</p>
          </div> */}
          <div className="relative square surround-cover">
            <div className="realative barcode-scanner--area--outer surround-cover">
              <div className="realative barcode-scanner--area--inner"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanComp;
