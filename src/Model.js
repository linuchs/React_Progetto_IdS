class Model {
   
        constructor(string) {
        this.string=string;
        this.state={
            colonne: [],
            righe: []
        };
    }

GetData()
{
    return this.state;
}
/*I--------------------------- La funzione trasforma il file CSV grezzo in un array-------------------------------*/
 TrasformaCsvInArray() //string in questo caso è tutto il file Csv passato in blocco
{
    console.log("siamo dentro TrasformaCsvInArray");
  const stringa_Header = this.string.slice(0, this.string.indexOf("\n"));
  const csvHeader=stringa_Header.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  csvHeader.unshift('Riga');//inserisco la colonna dei risultati in testa all'header di tabella
 
  /*Riga sopra : L'header del CSV è ben formattato ad esclusione dei doppi apici "" che contengono testo con la virgola*/
  const csvRows = this.string.slice(this.string.indexOf("\n") + 1).split("\n");
  /*riga sotto : Il metodo map() crea un array e lo popola con il risultato della chiamata su tutti gli elementi 
  dell'array di partenza sul quale stiamo lavorando */
  const array_founded=[];
  let counter_out=0;//verrà incrementato ogni volta che andremo su un nuovo record
  /*Inizio... Gestisce le righe vuote del csv e inoltre accorpa le righe che fanno parte dello stesso gruppo  */
  let master=[];
  let master_counter=-1;
  for (let index = 0; index<csvRows.length; index++)
  {
      if(csvRows[index].substring(0,4).localeCompare("http")==0)/**se la riga inizia con http deve essere per forza una nuova riga */
      {
        master_counter++;
        master[master_counter] = csvRows[index];
      }
      else{
        const pivot=master[master_counter];
        master[master_counter]=pivot.concat(csvRows[index]);
      }
  }
  /*...Fine*/
  for (const element of master) 
  {
    counter_out++;
    const values = element.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);/*divido la riga i secondo il carattere "virgola"*/
    for (let index = 0; index < values.length; index++) {
      values[index] = values[index].replace(/"/g,"");
    }
    for (let y = 0; y < values.length; y++) 
    {
      if(y==0)
      {
        values.unshift(""+counter_out);
        const obj = csvHeader.reduce((object, header, index) => 
        {
              object[header] = values[index];
              return object;
        }, {});
        array_founded.push(obj);
      }
    }
   }
 this.state.colonne=csvHeader;
 this.state.righe=array_founded;
 // setheaderKeys(csvHeader); this.headerKeys(array_founded);

};

      }

export default  Model;
