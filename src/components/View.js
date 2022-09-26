import React  from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {Dropdown} from 'bootstrap-4-react';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


class View extends React.Component {
    constructor(props)
    {
        super(props);
        this.azzerra=true;
        this.select_all="Seleziona tutte le colonne";
        this.selezionato=true;
        this.options = {
          sizePerPageRenderer:this.sizePerPageRenderer
        };
        this.intestazione=[];
        this.set_table_visible=false;
      
    }

/** Menù a discesa per la selezione delle colonne - personalizzata*/
 CustomToggleList = ( {
  columns,
  onColumnToggle,
  toggles,
 }) => (
    <Dropdown dropright>
        <Dropdown.Button  info id="dropdownMenuButton">Seleziona altre colonne della tabella</Dropdown.Button>
        <Dropdown.Menu  aria-labelledby="dropdownMenuButton" >
        <><Dropdown.Item
                                    
                        data-toggle="input"
                        aria-pressed={this.selezionato ? 'true' : 'false'}
                        className={` btn btn-info    ${this.selezionato ? 'toggle' : 'active'}`}
                        onClick={() => 
                        { 
                          if(this.azzerra===true)
                          {     
                            for (let index = 0; index < columns.length-1; index++)
                            {
                                if(columns[index].csvExport===false){
                                  onColumnToggle(columns[index].dataField);}
                                  columns[index].csvExport=true;
                            }this.azzerra=false;   this.selezionato=false; this.select_all="Deseleziona tutte le colonne";        
                          }
                          else
                          {
                          for (let index = 0; index < columns.length-1; index++) 
                          {
                            if(columns[index].csvExport==true){
                            onColumnToggle(columns[index].dataField);}
                            columns[index].csvExport=false;
                          }this.azzerra=true;     this.selezionato=true;  this.select_all="Seleziona tutte le colonne";     
                       }}}>{this.select_all}</Dropdown.Item>
                      <Dropdown.Divider />
                </>
              {
      columns
        .map(colonnas => ({
          ...colonnas,
          toggle: toggles[colonnas.dataField]
       
        }))
        
        .map(
          (colonna,indice)=> (
          <><Dropdown.Item
            key={colonna.dataField}
            data-toggle="input"
            aria-pressed={colonna.toggle ? 'true' : 'false'}
            className={` btn btn-info  ${colonna.toggle ? 'active' : 'toggle'}`}
            onClick={() => { onColumnToggle(colonna.dataField); columns[indice].csvExport = !columns[indice].csvExport; } }>
              {colonna.text}
            </Dropdown.Item>
          </>
        )
      )
    }
     </Dropdown.Menu>
      </Dropdown>
 );
 /*I----- Personalizza  la parte dell'interfaccia relativa alla paginazione,
va inserita all'interno di BootstrapTable2 -----*/
 sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className="btn-group" role="group">
    {
      options.map((option) => {
        const isSelect = currSizePerPage === `${option.page}`;
        return (
          <button
            key={ option.text }
            type="button"
            onClick={ () => onSizePerPageChange(option.page) }
            className={ `btn ${isSelect ? 'btn-warning' : 'btn-info'}` }
          >
            { option.text }
          </button>
        );
      })
    }
  </div>
);
 
/** Arricchisco l'array delle colonne passato dal padre (Controller) con gli attributi che servono al componente
 (BootstrapTable2) per visualizzare i dati */
 Formatta_Header =()=>
 {
  
const headerFormattato=[];
if(this.props.chiavi.length>0){
 
    console.log("ci siamo!");
      for (let index = 0; index <= this.props.chiavi.length; index++)
      {
        if(index==0)
        {
          headerFormattato.push({dataField:this.props.chiavi[index],text:this.props.chiavi[index],csvExport:true,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex % 2 === 0) {
                return {backgroundColor: '#ffffff'};}
              return {backgroundColor: '#E9F5E9'};}
          }); 
        }
        else
        {
          if(index>0&&(index<(this.props.chiavi.length%10)))
          {
            headerFormattato.push({dataField:this.props.chiavi[index],text:this.props.chiavi[index],filter: textFilter({
            style: { backgroundColor: '#fff2cc' },
            placeholder: 'Ricerca per colonna'
            }), csvExport:true,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex % 2 === 0) {
                return {backgroundColor: '#ffffff'};}
              return {backgroundColor: '#E9F5E9'};}
            });
          }
          else
          {
            headerFormattato.push({dataField:this.props.chiavi[index],text:this.props.chiavi[index],filter: textFilter({
            style: { backgroundColor: '#fff2cc' },
            placeholder: 'Ricerca per colonna'
            }),
            hidden:true, /** ricordiamoci che questo hidden è relativo alle colonne che non si vedono*/
            csvExport:false,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex % 2 === 0) {
                return {backgroundColor: '#ffffff'};}
              return {backgroundColor: '#E9F5E9'};}
            });
          } 
        }
      }   
    }
this.intestazione=headerFormattato;
if(this.intestazione.length>0)
this.set_table_visible=true;

};

  /**----------------------RENDER------------------------------- */
  render()
  {
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;
this.Formatta_Header();

    /*----- 
    console.log("dati : "+this.props.dati); 
    console.log("intestazione : "+this.props.intestazione); 
    console.log("chiavi : " + this.props.chiavi);-----*/
    return (

      this.set_table_visible &&   
      <ToolkitProvider
      keyField='Riga'
      data={ this.props.righe }
      columns={this.intestazione}//this.props.intestazione
     columnToggle
      search
      exportCSV={{  onlyExportFiltered: true, exportAll: false }}
      >
    {
      props => (
      <>
      <div className="row ">
      <div className="col">
         <SearchBar 
          className="btn btn-success my-0 my-sm-0"
          style={{ backgroundColor: '#fff2cc',color:"#000000" }}
          placeholder="Ricerca per riga " {...props.searchProps} />
        <ClearSearchButton className="btn btn-warning my-0 my-sm-0" text="Annulla" {...props.searchProps} />{/**/}
      </div>
      <div className="col">
         <this.CustomToggleList  {...props.columnToggleProps} />{/**/}
      </div><div className="col">
        <ExportCSVButton className="btn-secondary" {...props.csvProps}>Esportiamo il CSV</ExportCSVButton>{/** */}
      </div>
      </div>
      <div className="row ">
      <div className="col">
        <BootstrapTable
          bootstrap4 keyField='Riga' 
          pagination={paginationFactory(this.options)}
          filter={filterFactory()}
          filterPosition="top"  
          printable {...props.baseProps} 
          />
      </div>
      </div></>)
    }
    </ToolkitProvider>
 
  
    
    );
  }
}
export default View;
