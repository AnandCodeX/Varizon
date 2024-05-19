import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CsvToJsonUploader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [lstoragedata,setlstoragedata]=useState(null)

  function setlocalStorageData (){
    const storedData = localStorage.getItem('jsonData');
if (storedData) {
  const jsonData = JSON.parse(storedData);
  console.log(jsonData);
  setlstoragedata(jsonData)
}

  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data;
          setJsonData(data);
          localStorage.setItem('jsonData', JSON.stringify(data));
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
  };
  useEffect(()=>{setlocalStorageData()},[jsonData])

  return (
    <div>
      <h2>Varizon Portal</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {lstoragedata && (
          <div>
          <h2>Supplier Information</h2>
          <table>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Payment Terms</th>
              </tr>
            </thead>
            <tbody>
              {lstoragedata.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier["Supplier name"]}</td>
                  <td>{supplier["Payment terms"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvToJsonUploader;
