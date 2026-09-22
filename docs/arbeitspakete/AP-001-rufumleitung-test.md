# AP-001 · Risikotest Rufumleitung am Pilot-Anschluss

- **Status:** freigegeben
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-21
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** R1
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Klären, ob der Overflow-Modus („Rufumleitung bei Nichtmelden" auf die Nummer der Voice-Plattform) am echten Anschluss des Piloten so funktioniert, wie das Briefing es annimmt — bevor der Anrufmanager KI gebaut wird. Das Ergebnis kann die Architektur der Telefonie-Anbindung kippen.

## Einordnung

- **Berührt:** [FEST] Overflow-Modus, Stammkunden-Erkennung nur per Rufnummer · [OFFEN] Q1, Q4
- **Business Brain:** `Overflow-Modus`, `Zero-Hardware-Start` (A21), `Entlastungs-MVP` (A11b) — Status vor Beginn im Assumptions Log nachlesen
- **Nicht Teil dieses Pakets:** Bau der Voice-Anbindung, Portierung oder SIP-Anbindung (nur als Alternative bewerten)

## Abnahmekriterien

- [ ] Netzbetreiber und Anschlussart des Piloten sind bekannt
- [ ] Testanruf mit Umleitung: Es ist dokumentiert, welche Rufnummer bei der Voice-Plattform ankommt (Anrufer oder Restaurant)
- [ ] Gemessen, wie viele Sekunden der Anrufer klingeln hört, bis die KI abnimmt; kürzeste einstellbare Umleitungszeit notiert
- [ ] Verhalten bei „besetzt" geprüft (greift die Umleitung auch dann?)
- [ ] Ergebnis und Empfehlung als ADR-Entwurf; Q1 in `docs/open-questions.md` beantwortet oder mit klarem nächsten Schritt versehen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | jarvis | Testprotokoll vorbereiten, Ergebnisse von Sirat aufnehmen |
| 2 | voice-integrator | Anbieter-Doku: welche Felder liefert die Plattform zur Anrufer-Nummer bei umgeleiteten Anrufen |
| 3 | architect | Alternativen bewerten (Umleitung / Portierung / SIP), ADR-Entwurf |
| 4 | doc-updater | Q1, Roadmap R1 nachziehen |

## Schritte

1. Testprotokoll schreiben (was wird gewählt, was wird notiert). — **erledigt 2026-09-21:** [testprotokoll-AP-001-rufumleitung.md](testprotokoll-AP-001-rufumleitung.md); Pflichtumfang = Variante X (Netzbetreiber steuert), Variante Y nur Kür.
2. Sirat führt die Testanrufe mit dem Piloten durch.
3. Auswertung, Alternativen, ADR-Entwurf.

## Braucht von Sirat

- Zugang zum Anschluss des Piloten bzw. einen Termin mit ihm (angefragt: —)
- Eine Testnummer bei der Voice-Plattform

## Ergebnis

_Noch offen._ Freigabe durch Sirat am 2026-09-21 („ich führe das aus"). Vorbereitung: Web-Recherche Rufumleitung, Testprotokoll mit Variante X. Test selbst steht aus.
