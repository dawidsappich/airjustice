export enum FormStep {
	ROOT = 0,
	INITIAL = 1, // 1
	TIMING = 3, // 1.1
	REASON = 5, // 2
	REPLACEMENTCARRIAGE = 7, // 3
	// 4 und 5 sind reine Berechnungen im EPK-Diagramm
	CUSTOMERINFO = 9, // 6
	TIMECHECKIN = 12, // 7
	NOTTRANSPORTOK = 15, // 8 (ist nicht im EPK entahlten für DIREKTFLUG)
	POSSIBLETOTAL = 18, // 9
	CONTACTCARRIER = 21, // 10
	COMPENSATION = 24, // 11
	USERCONACTINFO = 27, //12
	SUMMARY = 30, // 13
	ASSIGMENT = 33, // 13
	NOCALIM = 36, // Ende wenn verspätung weniger als 3 Stunden beträgt
	// TODO: Define all step
}