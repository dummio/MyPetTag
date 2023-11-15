/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '@capacitor/device';
import { Patterns } from '../../../constants';

// Import CSS
import logo from '../../../images/paw.png';
import './tagCodeInputForm.css';

//import firebase command
import { checkTagIdTaken } from '../../../firebaseCommands';

async function loadQrScanner() {
  let { BarcodeScanner, BarcodeFormat, LensFacing } = await import(
    '@capacitor-mlkit/barcode-scanning'
  );
  return {
    BarcodeScanner,
    BarcodeFormat,
    LensFacing,
  };
}

const TagCodeInputEditForm = () => {
  const [tagCode, setTagCodeReg] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [mlkit, setMlkit] = useState(null);
  const [isScanning, setIsScanning] = useState(null);
  const [pageReady, setPageReady] = useState(false);

  const ValidateForm = () => {
    let isValid = false;
    if (tagCode) {
      isValid = true;
    }
    setCanSubmit(isValid);
  };

  const ErrorHandle = (isError) => {
    let errorText = document.getElementById('error-container');

    if (isError) {
      if (errorText !== null) {
        errorText.innerHTML = 'Please Enter Valid Tag Code';
        errorText.style.display = 'flex';
        errorText.style.visibility = 'visible';
        setCanSubmit(false);
      }
    } else {
      if (errorText !== null) {
        errorText.style.display = 'none';
        errorText.style.visibility = 'hidden';
        setCanSubmit(true);
      }
    }
  };

  useEffect(ValidateForm, [tagCode]);
  useEffect(ErrorHandle, [tagCode]);
  useEffect(() => {
    async function loadDeviceInfo() {
      const info = await Device.getInfo();
      setDeviceInfo(info);
      if (!mlkit /* && info.platform === 'android'*/) {
        setMlkit(await loadQrScanner());
      }
      setPageReady(true);
    }
    loadDeviceInfo();
  }, [mlkit]);

  const navigate = useNavigate();

  async function fetchTagContent() {
    const content = await checkTagIdTaken(tagCode);
    if (content) {
      route(content);
    } else {
      console.log('Invalid tag haha');
      // alert("Invalid tag");
      ErrorHandle(true);
    }
  }

  function route(tagContent) {
    if (tagContent !== null && tagContent[0] === '' && tagContent[1] === '') {
      console.log(tagContent);
      navigate(`/tag/${tagCode}/create`);
    } else {
      console.log('Tag was taken or tag code input error');
      // alert("Invalid tag");
      ErrorHandle(true);
    }
  }

  const isTagTaken = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      console.log('TAG CODE ENTERED: ', tagCode);
      await fetchTagContent();
    } else {
      console.log('NO TAG CODE ENTERED!');
    }
  };

  useEffect(() => {
    async function onStartQrScan() {
      const { camera } = await mlkit.BarcodeScanner.requestPermissions();
      if (camera === 'granted' || camera === 'limited') {
        document.querySelector('body')?.classList.add('barcode-scanning-active');
        await mlkit.BarcodeScanner.addListener('barcodeScanned', async (result) => {
          setIsScanning(false);
          await mlkit.BarcodeScanner.removeAllListeners();
          await mlkit.BarcodeScanner.stopScan();
          let barcode = result.barcode;
          // TODO: This all really belongs in its own function
          let error = false;
          if (barcode.valueType === 'URL') {
            let url = new URL(barcode.rawValue);
            if (
              url.hostname === 'mypettag-5970e.web.app' &&
              Patterns.TAG_URL_REGEX.test(url.pathname)
            ) {
              let tag = url.pathname.substring(5, 5 + 6); // Tag will be 6 chars and occurs after '/tag/'
              setTagCodeReg(tag);
            } else {
              error = true;
            }
          } else {
            error = true;
          }

          if (error) alert('Unsupported QR Code Scanned');
        });
        await mlkit.BarcodeScanner.startScan({
          formats: [mlkit.BarcodeFormat.QrCode],
          lensFacing: mlkit.LensFacing.Back,
        });
      }
    }

    async function onStopQrScan() {
      document.querySelector('body')?.classList.remove('barcode-scanning-active');
      await mlkit.BarcodeScanner.removeAllListeners();
      await mlkit.BarcodeScanner.stopScan();
    }

    if (isScanning) {
      onStartQrScan();
    } else {
      onStopQrScan();
    }
  }, [isScanning, mlkit]);

  if (!pageReady) return null;

  return (
    <div id="input-container">
      <img className="logo" src={logo} alt="MyPetTag" width={250} height={250} />
      <div className="company-title">
        My<span style={{ color: '#75af96' }}>PetTag</span>
      </div>
      <form id="code-input-form">
        <h1 id="code-input-form-title">Create New Pet</h1>
        <p id="code-input-form-instruct">
          Please input your MyPetTag code found on the back of the tag.
        </p>
        <label>MyPetTag Code</label>
        <input
          value={tagCode}
          className="form-input"
          type="text"
          onChange={(e) => {
            setTagCodeReg(e.target.value);
          }}
        />
        <div id="error-container">
          <p></p>
        </div>
        <div id="tag-form-btns">
          {deviceInfo?.platform === 'android' && mlkit && (
            <>
              <button id="qr-scan-btn" type="button" onClick={() => setIsScanning(!isScanning)}>
                {isScanning ? 'Cancel' : 'Scan QR'}
              </button>
              <div id="btn-spacer" />
            </>
          )}
          <input id="submit-btn" type="submit" value="Submit" onClick={isTagTaken} />
        </div>
      </form>
    </div>
  );
};

export default TagCodeInputEditForm;
