Creazione di un Single-Page Applicazion per la visualizzazione e la ricerca di dati provenienti da un file CSV.
 https://ingegneriadelsoftware.firebaseapp.com/
        <p className="mb-0" >
       Requisiti 
Il progetto consiste nell’implementazione una Interfaccia Utente, la quale permetterà di scegliere ad un utente generico un file da caricare, si potrà scegliere un file con una estensione di tipo Csv, una volta caricato in memoria il file sarà stampato a video e i dati in esso contenuti saranno visibili su una tabella.
Sui dati visualizzati nella tabella l’utente avrà la possibilità di fare una ricerca, la ricerca potrà avvenire in due modi:
</br>•	Si potrà effettuare una ricerca per riga, visualizzando tutte le righe nelle quali compare almeno una volta la chiave di ricerca fornita, in questo caso dovrà essere inserito nell’interfaccia un campo di input per la ricerca per riga.

</br>•	Inoltre, si potrà effettuare una ricerca per colonna visualizzando tutte le righe per le quali in una data colonna è presente la chiave di ricerca fornita, nel caso in cui si voglia ripetere una ricerca su una data colonna differente dovranno essere predisposti dei campi di input su tutte le colonne potenzialmente interessate ad una ricerca di tipo analogo.
Il risultato combinato della ricerca dovrà essere visualizzato nella tabella.
Sarà predisposto un menu a tendina con il quale l’utente potrà selezionare le colonne della tabella da visualizzare e nel caso queste colonne fossero selezionate, dovranno presentare il campo di input sulla quale effettuare la ricerca per colonna.
Il menù a tendina dovrà fornire la possibilità di avere una scelta di tipo “Seleziona tutte le colonne”,
si potranno escludere delle colonne o aggiungerne altre.
Inoltre, sarà predisposto un pulsante che permetterà di esportare in formato CSV tutto ciò che è visibile sulla tabella, e in alternativa tutto ciò che è visibile sulla tabella e che è il risultato delle ricerche singole o combinate per riga e per colonne.
Il file esportato sarà salvato automaticamente sul dispositivo locale, questo conterrà come intestazione le sole colonne selezionate e i relativi dati.

      </p>
      <p className="mb-0">Sono stati utilizzati i seguenti strumenti: la libreria <b>React di Javascript</b> e <b>Bootstrap per React</b>,
        per la visualizzazione e la ricerca sulla tabella è stato utilizzato il componente <b>react-bootstrap-table2.</b>
        </br>Il link relativo al file CSV:</p>
      
      https://data.bioontology.org/ontologies/OBIB/download?apikey=8b5b7825-538d-40e0-9e9e-5ab9274a9aeb&download_format=csv
      
     
        
