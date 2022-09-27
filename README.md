
<h1>Creazione di un Single-Page Applicazion per la visualizzazione e la ricerca di dati provenienti da un file CSV.</h1>
Link relativo al deploy della applicazione su Firebase: https://ingegneriadelsoftware.firebaseapp.com/
        <p className="mb-0" >
       <h2>Requisiti</h2> 
Il progetto consiste nell’implementazione una Interfaccia Utente, la quale permetterà di scegliere ad un utente generico un file da caricare, si potrà scegliere un file con una estensione di tipo Csv, una volta caricato in memoria il file sarà stampato a video e i dati in esso contenuti saranno visibili su una tabella.
Sui dati visualizzati nella tabella l’utente avrà la possibilità di fare una ricerca, la ricerca potrà avvenire in due modi:
</br>•	Si potrà effettuare una ricerca per riga, visualizzando tutte le righe nelle quali compare almeno una volta la chiave di ricerca fornita, in questo caso dovrà essere inserito nell’interfaccia un campo di input per la ricerca per riga.

</br>•	Inoltre, si potrà effettuare una ricerca per colonna visualizzando tutte le righe per le quali in una data colonna è presente la chiave di ricerca fornita, nel caso in cui si voglia ripetere una ricerca su una data colonna differente dovranno essere predisposti dei campi di input su tutte le colonne potenzialmente interessate ad una ricerca di tipo analogo.
</br>Il risultato combinato della ricerca dovrà essere visualizzato nella tabella.
</br>Sarà predisposto un menu a tendina con il quale l’utente potrà selezionare le colonne della tabella da visualizzare e nel caso queste colonne fossero selezionate, dovranno presentare il campo di input sulla quale effettuare la ricerca per colonna.
</br>Il menù a tendina dovrà fornire la possibilità di avere una scelta di tipo “Seleziona tutte le colonne”,
si potranno escludere delle colonne o aggiungerne altre.
</br>Inoltre, sarà predisposto un pulsante che permetterà di esportare in formato CSV tutto ciò che è visibile sulla tabella, e in alternativa tutto ciò che è visibile sulla tabella e che è il risultato delle ricerche singole o combinate per riga e per colonne.
</br>Il file esportato sarà salvato automaticamente sul dispositivo locale, questo conterrà come intestazione le sole colonne selezionate e i relativi dati.
</p>

</br> <h2> Pattern architetturale e Classi utilizzate.</h2>
Il linguaggio utilizzato per lo sviluppo della applicazione è Javascript, in particolare è stata utilizzata la libreria ReactJS.
</br>Il pattern architetturale utilizzato per lo sviluppo è MVC (Model-View-Controller), per cui la struttura della single-page application risultante è divisa in tre parti fondamentali:
</br>•	Controller che riceve i comandi passati dall'utente e comunica con le altre due componenti, con il Model per modificare i dati e con la View per visualizzare i dati.
</br>•	Model che implementa i metodi per accedere ai dati utilizzati dall’applicazione.
</br>•	View che visualizza i dati contenuti nel Model e si occupa dell'interazione con l’utente.

</br> <h3>MVC nella nostra applicazione. </h3>
</br></br>• Il Controller fornisce un form dal quale è possibile scegliere esclusivamente files di tipo CSV, una volta scelto il file verrà attivato il pulsante “Carica File”, la cui attivazione porterà all’esecuzione della funzione “Gestore_MVC” attraverso il quale il Controller gestirà la classe Model che si occuperà di formattare il contenuto del file CSV in modo da dare in output al Controller, sotto forma di due array i dati che quest’ultimo fornirà al componente View per la visualizzazione delle informazioni contenute nel file CSV.
(Per utilizzare all’interno del Controller i costrutti hook incorporati in React, il Controller non è stato implementato come una classe, altrimenti gli useState hooks non si sarebbero potuti utilizzare in quanto avrebbero dato errore, in alternativa si può convertire il Controller in una classe). 
</br></br>• La classe Model consta di due metodi per l’elaborazione e l’accesso ai dati. Il metodo “TrasformaCsvInArray” prende in input l’intero file di testo passato dal Controller al Model, estrae la prima riga del file che è l’intestazione delle colonne del file CSV e la assegna all’array intestazione della classe Model, infine formatta le righe successive secondo la logica del file CSV assegnandole infine all’array “righe”.
</br>Una volta eseguito il metodo “TrasformaCsvInArray” il Controller può accedere agli array “intestazione” e “righe” attraverso il metodo “GetData()” della classe Model, a questo punto il Controller possiede i dati che necessità la View per visualizzare al tabella.
</br></br>• Il componente View, quindi, prende in input i due array passati dal Controller, per la visualizzazione della tabella View necessita che l’array contenente l’intestazione sia formattato secondo le specifiche richieste dal componente importato React-bootstap-table2 per cui la classe View implementa il metodo “Formatta_Header” che arricchisce l’array “intestazione” con gli attributi necessari per la visualizzazione della tabella, inoltre la classe View fornisce i metodi per customizzare gli attributi utilizzati dal sottocomponente React-bootstap-table2 per la paginazione della tabella e la ricerca su quest’ultima.
</br>Infine, permette di esportare il file CSV tramite il componente <ExportCsvButton> interno implementato da React-bootstap-table2.


      
 <h2>Componenti utilizzate. </h2>
        
</br> Bootstrap 4.6 per gli stili:
https://getbootstrap.com/docs/4.6/getting-started/introduction
</br> React-bootstrap-table2 per la tabella e i comandi correlati al suo utilizzo:
https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html

</br>Il link relativo al file CSV:
  
https://data.bioontology.org/ontologies/OBIB/download?apikey=8b5b7825-538d-40e0-9e9e-5ab9274a9aeb&download_format=csv
      
     
        
