import React, { useState } from "react";

const UsbDevices = () => {
  const [devices, setDevices] = useState([]);

  const getUsbDevices = async () => {
    try {
      const devices = await navigator.usb.getDevices();
      setDevices(devices);
    } catch (error) {
      console.error("Error fetching USB devices:", error);
    }
  };

  const requestUsbDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      console.log("Requested USB device:", device);
      getUsbDevices(); // Refresh the list after a new device is connected
    } catch (error) {
      console.error("Error requesting USB device:", error);
    }
  };

  return (
    <div>
      <h1>Liste des périphériques USB</h1>
      <button onClick={getUsbDevices}>
        Rafraîchir la liste des périphériques USB
      </button>
      <button onClick={requestUsbDevice}>Ajouter un périphérique USB</button>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            {device.productName} - {device.manufacturerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsbDevices;
