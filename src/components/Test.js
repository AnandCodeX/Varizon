import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Navbar from './Navbar';

const CsvToJsonUploader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [lstoragedata, setLstoragedata] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  function setlocalStorageData() {
    const storedData = localStorage.getItem('jsonData');
    if (storedData) {
      const jsonData = JSON.parse(storedData);
      console.log(jsonData);
      setLstoragedata(jsonData);
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

  useEffect(() => {
    setlocalStorageData();
  }, [jsonData]);

  const filteredData = lstoragedata && lstoragedata.filter(supplier => {
    return (
      supplier["Supplier name"] && supplier["Supplier name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier["Payment terms"] && supplier["Payment terms"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
<React.Fragment>
 
   <div >
    <div className='menu'><div>  <h3>Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} /></div>
      <div><h3>Search Suppliers</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
     </div></div>
    
    <div>{lstoragedata && (
        <div className='sinfo'>
          <h3 className='table'>Supplier Information</h3>
          <table className='table'>
            <thead>
              <tr>
                <th className='ths'>Supplier Name</th>
                <th className='thp'>Payment Terms</th>
              </tr>
            </thead>
            <tbody className='tra'>
              {filteredData.map((supplier, index) => (
                <tr  key={index}>
                  <td className='tds'>{supplier["Supplier name"]}</td>
                  <td className='tdp'>{supplier["Payment terms"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}</div>
  
      
    </div></React.Fragment>
   
  );
};

export default CsvToJsonUploader;
