# Historie

## Mittwoch 19.07.2017

+ Auswahliste für die Airports in DB importiert
+ Auswahliste als Observable implenetiert die per HTTP Requets die Ergebnisse aus der DB-Abfrage in der UI als Liste darstellt
+ UI Logik implentiert, so dass wenn der User ein Airport auswählt dieser übernommen wird

## Freitag 21.07.2017

+ Datepicker als Komponente erstellt, so dass er in mehreren Formularen verwendet werden kann
+ Date picker konfiguriert, so dass er deutsche Datuskonfiguration benutzt

## Samstag 22.07.2017

+ Datenmodell für Formularfelder konzipieren
+ Auswahllisten für Feld Problem und Flugart in DB ausgelagert bzw. in der DB angelegt als collection _forms_
+ Refactoring der Listen, so dass diese aus der DB geladen werden
+ Validerung des Formulars
+ Speichern der Einagben aus dem ersten Formular in der Datenbank
+ Probleme mit 3rd party callback beim Datepicker, Wert wird vom formCotrol nicht erkannt. ChangeDetection?