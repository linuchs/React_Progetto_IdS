import React, { useState } from "react";
import InfoApp from "./components/InfoApp";
import View from "./components/View";
import Model from "./Model";
import 'bootstrap/dist/css/bootstrap.min.css';
function Controller() 
{
  const [file, setFile] = useState(); /*assegno alla variabile file un metodo setFile che attraverso useState gli aggancia i dati (hooks)*/
  
  const fileReader = new FileReader(); /*lettura asincrona del file grezzo*/
  const [intestazione_csv, setColumns] = useState([]); /*arrayRow contiene come sopra ma per array */
  const [contenuto_righe, setRows] = useState([]);/**L'array contenente l'intestazione delle colonne dal file csv */
 // const [set_table_visible, setTableVisible] = useState(false);/**booleano sulla vista della tabella formattata correttamente*/
  const [esecuzione, setEsecuzione] = useState(false);/** booleano sul pulsante Esegui*/
    
  /*I----------------------------- Il Controller gestisce il file in fase di caricamento ------------------------------------- */
  const Gestore_MCV = (event) => /** questo handler si attiva quando si fa submit su "Carica FIle" per l'elaborazione del file csv selezionato */
  {
    event.preventDefault();
    if (file) //se è stato assegnato un valore a file, ...
    {
      fileReader.onload = function (event)
      {
        const text = event.target.result;
        /* riga sopra : text contiene tutto il file e renderlo visibile a schermo
        in quanto text contiene il file per intero, ma lo debbo lavorare per
        gestire righe e colonne e i risultati correlati ad una eventuale ricerca */
  
        const Modello = new Model(text);
        Modello.TrasformaCsvInArray();/*Quì viene elaborato il file csv, ci ritornerà un array con l'intestazione delle colonne
                                      e un array con il contenuto formattato delle righe del file,*/
        console.log(Modello.state.colonne);
        console.log(Modello.state.righe);
        const modelData=Modello.GetData();
        setColumns(modelData.colonne);        
        setRows(modelData.righe);
      /**Adesso il Controller possiede un array con l'intestazione delle colonne e Rendiamo visibile la tabella*/
      //  setTableVisible(true); 
        
      };
      fileReader.readAsText(file);
    }
  };
 /*--------------------------- Interazione col form-------------------------------*/
 const handleOnChange = (e) => 
 {
     setFile(e.target.files[0]);
     setEsecuzione(true);/** Rendo visibile  "Carica File" per iniziare l'elaborazione del file grezzo  */
  };

/*------------------------------------RETURN-------------------------------------------------- */
  return(
  <div className='container-fluid'> <div className="row ">
    <div className="col">
      <div className="fs-6">
        <InfoApp ></InfoApp></div>
        
        <form className="custom_form">
          <div className="input-group">
            <input type="file" className="form-control form-control-lg" id="inputGroupFile04"
            accept={".csv"} onChange={(e) =>{handleOnChange(e)}}
            multiple aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"/> 
            {esecuzione &&
            <button className="btn btn-success" type="submit" id="inputGroupFileAddon04" onClick={(e) =>{Gestore_MCV(e);}}>
              Carica File
            </button>}
          </div><hr/> 
        </form>
        </div>
      </div>

    {/** Alla View passo l'array "contenuto_righe" contenente i dati delle righe e un array con l'intestazione dei dati dal file csv*/}
        <View righe={contenuto_righe}  chiavi={intestazione_csv}></View>
           
    </div>

  );
}
export default Controller;

