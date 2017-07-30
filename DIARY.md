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
+ Probleme mit 3rd party callback beim Datepicker, Wert wird vom formCotrol nicht erkannt. ChangeDetection?
+ Date-pciker erst einmal auskommetiert, einfaches Inputfeld mit Validierung realisiert um weiter zu kommen *ernüchternd*
+ Validerung des Formulars
+ Speichern der Einagben aus dem ersten Formular in der Datenbank d.h. Backend route eingericht und frontend eingerichtet. Für Testzwecke wird das Formular nach zwei Sekunden wieder zurückegesetzt. In der finalen app wird der nächste Schritt als Formular geladen

## Sonntag 23.07.2017

+ Refactoring form-set wird zu inital-form
+ Zum entschluss gekommen, dass es keine Sinn macht nur für den API_KEY und die DOMAIN einen Service zu implenetieren
+ Recherche zum Thema Angular Porzessstueerung Ergebnis: Busniess Logic am besten als Service modelieren, der anhand von Models alles im Girff hat. Folge: Komponenten müssen von Service(s) zur Laufzeit geladen und intasziiert werden
+ Die Landingpage ein wenig gestalten. Die navbar resposive machen

## Dienstag 25.07.2017

+ In den letzten beiden tagen mit dem Buch 'Pro Angular' beschäftigt um eine Konzept zum Laden der Formular Komponenten zu entwickeln. Es läuft daraus hinaus dass ich eine Directive implenetieren muss

## Mittwoch 26.07.2017

+ Weiter in das Thema ViewContainerRef und TemplateRef bei Angular einarbeiten. Prototype gebaut um zu schauen wie das dynamische Laden von Komponenten funktioniert. Prototyp funktioniert. Konzept entiwckelt: _FormContainer_ dient als Container für das Rendering der Formularkomponenten. Forumularkompnenten werden injiziert von _FormLoaderService_. Der Staus wird im _FormStateModel_ festgehalten.Im Model werden die Schritte mit Enumerationen abgebildet z.B. der erste Schritt ist FormStep.INITIAL. Der _FormState_ hält immer den _currentState_ und den _previousState_ fest. Ein _FormSate_ wird an den _FormLaoderService_ geschickt, un der liefert die nächste FormKomponente an den FormContainer

## Samstag 29.07.2017

+ Das dynamische Laden von Formbestandteilen funktioniert jetzt. Habe es so generisch wie möglcih gehalten. Alle Formkompnenten impoentieren ein Inteface, das als API zwischen Formconatiner und den Kindkomponenten dient. Nach jedem _FormStep_ werden die Eingaben evaluiert, das Model _FormState_ bestimmt den nächsten Schritt, und gibt dem _FormContainer_ die Form zurück, die gerendert werden soll. Funktioniert gut, so dass ich mich jetzt auf die einzelnen Komponenten konzentierein kann :)

## Soontag 30.07.2017

+ TODO Liste für heute erstellt
  + [x] Bezeichner für Formulare definieren und in Model FormStep hinterlegen
  + [x] Im Formular TIMIMG die Ab- und Ankunftszeit als Felder hinzufügen
  + [x] Richtige _ProblemCase_ Werte in DB hinterlegen, damit sie in Formular INITIAL richtig angezeigt werden
  + [x] _FormState_ nach INITIAL anpassen, so dass auch _ProblemCase_ bei nächster Formularwahl berücksichtigt wird
  + [x] Methode yum berechnen von Delta t in Formular TIMING hinzufügen
  + [ ] Datenmodell für Matrix der Distanzen der Flughäfen definieren
  + [ ] Daten aus Matrix Distanzen in DB importieren
  + [ ] Formular NOCLAIMPOSSIBLE (ende bei delta t < 3) definieren
  + [ ] FormState bei TIMING so anapssen, dass Delta t berücksichtigt wird