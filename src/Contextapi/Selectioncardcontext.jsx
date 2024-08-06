import React, { createContext, useState } from 'react';

export const Selectioncardcontext = createContext({
  DataSelectionModel: [],
  setDataSelectionModel: () => {},
  dataSelectedRows: [],
  setdataSelectedRows: () => {},
  dataSelectedExportRows: [],
  setdataSelectedExportRow: () => {},
});


const SelectionDataProvider = ({ children }) => {
    const [DataSelectionModel, setDataSelectionModel] = useState([]);
    const [dataSelectedRows, setdataSelectedRows] = useState([]);
    const [dataSelectedExportRows, setdataSelectedExportRow] = useState([]);

    return (
        <Selectioncardcontext.Provider value={{
            DataSelectionModel, setDataSelectionModel,
            dataSelectedRows, setdataSelectedRows,
            dataSelectedExportRows, setdataSelectedExportRow
        }}>
            {children}
        </Selectioncardcontext.Provider>
    );
};

export default SelectionDataProvider;
