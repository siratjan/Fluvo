# FA-12: Speisekarte und Preise pflegen („gültig ab", „momentan aus", Allergene mit Warnung)

- **Status:** mit Sirat durchgegangen (Runden 47–48, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Der Inhaber ändert selbst — auf Tablet oder Handy — Preise, Artikel, Optionen, Allergene und Steuersatz. Die Annahme darf die Verfügbarkeit umschalten („momentan aus") **und Artikel/Optionen entfernen** (dokumentiert für den Inhaber). Ein Artikel **ohne Preis wird nicht angelegt** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47); da die Annahme keinen Preis setzen darf, legt praktisch **nur der Inhaber Artikel an** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47, bestätigt Runde 48; schränkt die frühere B10-Lesart „Annahme darf Artikel/Optionen ohne Preis anlegen" ein). Die Änderung gilt für alle Kanäle, ohne dass eine bereits aufgenommene Bestellung oder ein laufendes KI-Gespräch einen anderen Preis bekommt. |
| **Akteur** | Inhaber (Preise, Artikel anlegen, Optionen, Allergene, Steuersatz, „momentan aus", Entfernen); Annahme („momentan aus" **und** Artikel/Optionen **entfernen** — dokumentiert für den Inhaber; **Anlegen** scheitert praktisch, weil ohne Preis nicht angelegt wird und die Annahme keinen Preis setzen darf — [ENTSCHIEDEN Sirat 2026-09-22], Runde 47, bestätigt Runde 48) |
| **Auslöser** | Der Inhaber öffnet das Profil und ändert etwas an der Speisekarte (u. a. legt einen Artikel an); oder die Annahme markiert einen Artikel als „momentan aus" bzw. entfernt einen Artikel/eine Option. |
| **Vorbedingungen** | Der Bearbeiter ist am Profil angemeldet (Inhaber per E-Mail-Link; Annahme mit Betriebsrechten). Das Restaurant hat eine hinterlegte Speisekarte. Bedienung auf Tablet/Handy, nicht am PC. Preise, Allergene und Steuersatz kann **nur** der Inhaber ändern; **Artikel anlegen** kann praktisch nur der Inhaber (ohne Preis wird nicht angelegt). Die Annahme kann „momentan aus" schalten und Artikel/Optionen **entfernen** (dokumentiert für den Inhaber). |
| **Nachbedingungen** | Die Änderung ist gespeichert und für alle Kanäle (KI, Website, Bon, Annahme) wirksam — sofort oder ab dem gewählten „gültig ab"-Datum. Bereits aufgenommene Bestellungen behalten ihren Preis und Artikeltext. Änderungen an Allergenen und Steuersatz sind protokolliert; jede Karten-Änderung der **Annahme** (Entfernen von Artikeln/Optionen, „momentan aus") ist **für den Inhaber dokumentiert** (Sirat, Runde 27, 2026-09-22 — B10, eingeschränkt durch Runde 47). Ein Anlege-Versuch **ohne Preis** hinterlässt **keinen** Datensatz. |

## Ist-Ablauf heute (aus der Mitschrift)

> Heute gibt es beim Piloten eine **neue Papier-Speisekarte**, die **weitergegeben** wird — an das Telefon und an die Küche; einen weiteren Pflege-Prozess gibt es nicht (Sirat, Runde 47, 2026-09-22). Die Selbstbedienung durch den Inhaber im System ist neu (Runde 1: „Änderungen dürfen nicht an Sirat hängen").

## Normalablauf (Preisänderung)

1. Der Inhaber öffnet die Speisekarte in seinem Profil (Tablet/Handy).
2. Der Inhaber ändert den Preis eines Artikels.
3. Das System fragt: **sofort** gültig oder **ab einem Datum** (ein **Datum**, keine Uhrzeit; ein „gültig ab"-Datum wirkt ab Tagesbeginn dieses Tages — Sirat, Runde 47, 2026-09-22).
4. Der Inhaber wählt.
5. Das System speichert. Ab dem gewählten Zeitpunkt nennen KI und Website den neuen Preis. Ein zu diesem Zeitpunkt **laufendes KI-Gespräch** rechnet mit dem Preisstand vom **Gesprächsbeginn** zu Ende.
6. Bereits aufgenommene Bestellungen behalten ihren Preis und Artikeltext (eingefroren).

## Ausnahmeabläufe

- **2a. „Momentan aus" (Verfügbarkeit)** (zweigt von Schritt 2 ab): Der Inhaber **oder die Annahme** (Betriebsrecht, Runde 11) markiert einen Artikel als momentan nicht verfügbar. Das wirkt **sofort** für alle Kanäle; die KI bietet ihn nicht mehr an (FA-01, Ausnahme 5a). **Zurücksetzen (Einschalten)** dürfen **Annahme und Inhaber**. **Kein automatisches Zurücksetzen** am nächsten Tag: Der Artikel bleibt sichtbar als „momentan aus" gekennzeichnet, **bis ihn jemand von Hand wieder einschaltet** (Sirat, Runde 27, bestätigt Runde 28, 2026-09-22 — B12; ändert die frühere Lesart „springt am nächsten Geschäftstag von selbst zurück"). Länger nicht verfügbare Artikel nimmt der Inhaber oder die Annahme von der Karte (2c). Endet in: Artikel nicht bestellbar, bis Annahme oder Inhaber ihn von Hand wieder einschalten.
- **2b. Allergene oder Steuersatz ändern** (zweigt von Schritt 2 ab): Nur der **Inhaber** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13; bestätigt Runde 27, 2026-09-22). Das System zeigt eine **deutliche Warnung** (rechtliche Folgen), der Inhaber bestätigt ausdrücklich, und die Änderung wird **protokolliert**. Endet in: geändert und protokolliert. → Haftung offen (Anwalt).
- **2c. Artikel oder Option hinzufügen** (zweigt von Schritt 2 ab): Ein Artikel wird **nur mit Preis** angelegt. Fehlt der Preis, **schlägt das Anlegen fehl**; das System zeigt den Hinweis „**Artikel konnte nicht angelegt werden, weil der Preis fehlt**" und speichert **nichts** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47). Da nur der **Inhaber** einen Preis setzen darf, legt praktisch **nur der Inhaber Artikel/Optionen an** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47, bestätigt Runde 48 — schränkt B10 ein). Anlegen mit „sofort" oder „gültig ab", analog zur Preisänderung. Endet in: neuer Artikel mit Preis, oder — ohne Preis — Hinweis und kein Datensatz.
- **2c′. Artikel oder Option entfernen** (zweigt von Schritt 2 ab): Das dürfen **Inhaber und Annahme** (Sirat, Runde 27, 2026-09-22 — B10, entfernen bleibt). Jede solche Änderung durch die **Annahme** wird **für den Inhaber dokumentiert** (Inhaber-Log/Tagesübersicht, K10). Ein entfernter Artikel bleibt in bereits aufgenommenen Bestellungen als eingefrorener Artikeltext erhalten. Endet in: geänderte Karte, alte Bestellungen unverändert.
- **3a. „Gültig ab"-Datum in der Zukunft** (zweigt von Schritt 3 ab): Bis zum Datum gilt der alte Preis, ab dem Datum der neue. Endet in: geplante Preisänderung hinterlegt.
- **5a. Laufendes KI-Gespräch bei sofortiger Änderung** (zweigt von Schritt 5 ab): Ein Gespräch, das bei der Änderung schon läuft, bleibt beim Preisstand vom Gesprächsbeginn; der neue Preis gilt ab dem nächsten Anruf. Endet in: Kunde zahlt nie einen anderen Preis, als ihm am Telefon genannt wurde.

## Darf nicht

- Eine Preisänderung trifft **kein** laufendes KI-Gespräch und **keine** bereits aufgenommene Bestellung ([ENTSCHIEDEN Sirat 2026-09-18, Runde 3]; [Briefing §5.2, eingefroren]).
- Es gibt **keine** zweite Kopie der Speisekarte; alle Kanäle lesen dieselbe ([FEST 3]).
- Allergene und Steuersatz werden **nicht** ohne deutliche Warnung und **nicht** ohne Protokoll geändert ([ENTSCHIEDEN Sirat 2026-09-18, Runde 3]).
- Ein Artikel wird **nie ohne Preis angelegt**; ein Anlege-Versuch ohne Preis hinterlässt **keinen** Datensatz, sondern den Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt" ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47).
- Die **Annahme** kann **keinen Preis, kein Allergen und keinen Steuersatz** ändern — das darf **nur der Inhaber**. Die Annahme darf „momentan aus" schalten (an, ab) **und** Artikel/Optionen **entfernen**; jede solche Änderung der Annahme wird **für den Inhaber dokumentiert** (Sirat, Runde 27, 2026-09-22 — B10). Da die Annahme keinen Preis setzen darf und ohne Preis nicht angelegt wird, kann sie praktisch **keinen Artikel anlegen** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47, bestätigt Runde 48).
- Der Inhaber ändert **nichts**, was nur der Betreiber darf: Restaurant anlegen/sperren, Module/Minutenpaket, Rufnummer/KI-Einrichtung, Steuerdaten/TSE, Drucker koppeln (mindestens beim ersten Mal) ([ENTSCHIEDEN Sirat 2026-09-18, Runde 2]).
- Der Kunde zahlt **nie** einen anderen Preis, als ihm am Telefon genannt wurde ([ENTSCHIEDEN Sirat 2026-09-18, Runde 3]).
- Der Inhaber von Restaurant A ändert **nur** die Karte von A ([FEST 4]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Inhaber pflegt selbst: Preise, Artikel, Optionen, „momentan aus" (auf Tablet/Handy) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 1/2 |
| Die Annahme hat Inhaber-**Betriebsrechte** (u. a. „momentan aus", Lieferzeit, Zonen, Öffnungszeiten/Ruhetage/Urlaub, KI an/aus, Bon nachdrucken, Bestellung von Hand) — **nicht** die Geld-Bestätigung (Kassensturz, Tagesabschluss, unbezahlte Bestellung) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10/11 |
| **Preise, Allergene und Steuersatz** ändert **nur der Inhaber**, **nicht** die Annahme | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 (bestätigt Runde 27) |
| Ein Artikel wird **nur mit Preis** angelegt; **ohne Preis** wird **nicht angelegt**, Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt" | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 47 |
| Die Annahme darf Artikel/Optionen **entfernen** (dokumentiert für den Inhaber, Inhaber-Log) — und praktisch **nicht anlegen**: ohne Preis wird nicht angelegt, und die Annahme darf keinen Preis setzen. Schränkt die B10-Lesart „Annahme darf Artikel/Optionen ohne Preis anlegen" ein | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 27 (B10) + Runde 47, bestätigt Runde 48 |
| „Momentan aus" **einschalten/zurücksetzen** dürfen **Annahme und Inhaber**; **kein automatisches Zurücksetzen** — der Artikel bleibt sichtbar „momentan aus", bis ihn jemand von Hand wieder einschaltet | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 27/28 (B12) |
| Preisänderung „gültig ab"-Datum **oder** sofort | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2/3 |
| „Gültig ab" ist ein **Datum** (keine Uhrzeit); es wirkt ab **Tagesbeginn** dieses Tages | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 47 |
| Laufendes KI-Gespräch rechnet mit Preisstand vom Gesprächsbeginn; Änderung gilt ab nächstem Anruf | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 3 |
| Bereits aufgenommene Bestellungen behalten Preis und Artikeltext (eingefroren) | [FEST] | Briefing §5.2 |
| **Vorbestellung** über einen Preiswechsel hinweg: es gilt der **Preis vom Bestelltag** (bei Bestellung eingefroren) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 33; Briefing §5.2 |
| „Momentan aus" wirkt sofort für alle Kanäle | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Allergene und Steuersatz: Inhaber darf selbst ändern, mit deutlicher Warnung und Protokoll | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 3 (Variante b) |
| Eine Speisekarte für alle Kanäle; KI kennt Änderungen ohne Zutun des Inhabers | [FEST] | Briefing §2.3, §5.4 |
| Bedienbar auf Tablet/Handy, ohne Schulung | [FEST] | Briefing §1, §9.9; Mitschrift Runde 2 |
| Rechte-Trennung Inhaber / Betreiber | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Haftung für falsche Allergen-/Steuerangaben, wenn der Inhaber selbst pflegt | [OFFEN] | open-questions.md (Anwalt) |
| Anmeldung Inhaber per E-Mail-Link | [STACK] | Briefing §4 (Login) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Preis sofort ändern | Inhaber ändert Preis eines Artikels, „sofort" | Nächster Anruf/Website nennt neuen Preis | Alter Preis nach der Änderung | manuell am Gerät + automatisch |
| Preis „gültig ab" Datum | Inhaber wählt ein Datum (z. B. morgen); nur Datum, keine Uhrzeit wählbar | Bis Tagesende des Vortags alter Preis, ab Tagesbeginn des gewählten Datums neuer Preis | Neuer Preis vor dem gewählten Datum; Uhrzeit-Eingabe | automatisch |
| Laufendes Gespräch bei sofortiger Änderung (Grenzfall) | Preis wird geändert, während ein KI-Gespräch schon läuft | Gespräch rechnet mit Startpreis zu Ende | Änderung trifft das laufende Gespräch | automatisch |
| Bereits aufgenommene Bestellung | Bestellung angelegt, danach Preis geändert | Bestellung behält alten Preis und Artikeltext | Rückwirkende Preisänderung | automatisch |
| „Momentan aus" | Artikel als momentan aus markiert | KI/Website bieten ihn sofort nicht mehr an | Artikel bleibt bestellbar | manuell + automatisch |
| „Momentan aus" wieder einschalten (Annahme) | Annahme setzt einen „momentan aus"-Artikel wieder auf verfügbar | Artikel wieder bestellbar; Annahme darf einschalten | Nur der Inhaber darf einschalten | manuell + automatisch |
| „Momentan aus" springt **nicht** von selbst zurück (Grenzfall) | Artikel „momentan aus", nächster Geschäftstag beginnt, niemand schaltet ein | Artikel bleibt „momentan aus", bis jemand ihn von Hand wieder einschaltet | Artikel wird am nächsten Tag von selbst wieder verfügbar | automatisch |
| Artikel ohne Preis anlegen (Grenzfall) | Inhaber (oder Annahme) versucht, einen Artikel **ohne Preis** anzulegen | Anlegen scheitert, Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt", **nichts gespeichert** | Artikel ohne Preis wird gespeichert | automatisch |
| Annahme versucht Artikel anzulegen (B10 eingeschränkt) | Annahme (Betriebsrechte) versucht, einen Artikel anzulegen — sie kann keinen Preis setzen | Anlegen kommt nicht zustande (ohne Preis kein Datensatz), Hinweis; **nichts gespeichert** | Annahme legt einen Artikel an oder setzt einen Preis | automatisch |
| Annahme entfernt Artikel/Option (B10) | Annahme (Betriebsrechte) entfernt einen Artikel und eine Option | Entfernen gelingt; die Änderung ist **für den Inhaber dokumentiert** (Log); alte Bestellungen behalten den eingefrorenen Artikeltext | Entfernen ohne Dokumentation für den Inhaber | automatisch |
| Allergen ändern (Grenzfall) | Inhaber ändert ein Allergen | Deutliche Warnung, Bestätigung nötig, Änderung protokolliert | Änderung ohne Warnung/Protokoll | manuell + automatisch |
| Steuersatz ändern (Grenzfall) | Inhaber ändert den Steuersatz eines Artikels | Deutliche Warnung, Bestätigung nötig, Änderung protokolliert | Änderung ohne Warnung/Protokoll | manuell + automatisch |
| Annahme-Grenzen an der Karte | Annahme (Betriebsrechte) versucht, Preis/Allergen/Steuersatz zu ändern und einen Artikel anzulegen, und schaltet einen Artikel „momentan aus" | Preis/Allergen/Steuersatz **nicht** änderbar (nur Inhaber); Anlegen kommt ohne Preis nicht zustande; „momentan aus" gelingt | Annahme ändert Preis/Allergen/Steuersatz oder legt einen Artikel an | automatisch |
| Zwei-Restaurant-Fall | Inhaber A ändert Preis; Restaurant B hat eigene Karte | Nur A's Karte ändert sich; B unverändert und für A nicht sichtbar | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Stammdatenpflege → Speisekarte ändern" (K2 noch offen)
- **Zustandsübergänge:** keiner an einer Bestellung — Stammdatenänderung; wirkt auf künftige `createOrder`-Aufrufe.
- **Technische Anwendungsfälle:** TU-? (Preis mit „gültig ab", Verfügbarkeit, Allergen/Steuer mit Protokoll, Prompt-Synchronisation der KI; Zuordnung in K7)
- **Verträge / Events:** vorläufig `menu.updated`, `menu.price_scheduled`, Protokoll-Ereignis für Allergen-/Steueränderung (Namen offen, K6); Preisstand-Regel berührt FA-01
- **Testszenarien:** FA-12-T1 … (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI nennt Preise/nimmt „momentan aus" wahr), FA-05 (Annahme nutzt dieselbe Karte), FA-17 (Zonen/Lieferzeit, Liefergebiet), FA-20 (Onboarding legt Karte an), FA-21 (Betreiber-Rechte)

## Offene Fragen

> **Frage an Sirat / Anwalt:** Wer haftet für falsche **Allergen-/Steuerangaben**, wenn der Inhaber sie selbst pflegt? Genügt Warnung + Protokoll, oder braucht es eine Freigabe durch den Betreiber? (In Runde 47 nicht behandelt, bleibt offen — neben Q10.)

> **Frage an Sirat / K8:** Wie schnell (in Sekunden) muss eine sofortige Änderung („momentan aus", Preis) bei der **KI** ankommen, damit sie nicht kurz Falsches anbietet? (Messbare Anforderung; die Karte im Voice-Prompt ist nur ein Cache, Briefing §5.4.) *Vorschlag Jarvis für K8 (in Runde 47 nicht mit Sirat besprochen, technisch): spätestens beim **nächsten Anruf**; ein laufendes Gespräch bleibt beim **Startstand** vom Gesprächsbeginn — konsistent mit Runde 44.* → offen, wird in K8 entschieden.

> **Beantwortet (Runde 47):** „Gültig ab" ist ein **Datum** ohne Uhrzeit und wirkt ab **Tagesbeginn** dieses Tages ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 47).

> **Beantwortet (Runde 47, bestätigt Runde 48):** Ein Artikel **ohne Preis wird nicht angelegt** (Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt"); ein Anlege-Versuch ohne Preis hinterlässt keinen Datensatz ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 47). **Folge (bestätigt Runde 48):** Da nur der Inhaber einen Preis setzen darf, kann die **Annahme praktisch keinen Artikel anlegen** — ihr bleiben „momentan aus" und das **Entfernen** (dokumentiert) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 33):** Bei einer **Vorbestellung**, deren Wunschzeit hinter einem Preiswechsel liegt, gilt der Preis vom **Bestelltag** — der bei der Bestellung eingefrorene Preis ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 33; Briefing §5.2). Damit ist die frühere offene Frage aus FA-01/FA-05/FA-12 geschlossen.

## Nicht Teil dieses Anwendungsfalls

- **Öffnungszeiten, Ruhetage, Urlaub** pflegen → **FA-18** (in Runde 10 in den Schnitt aufgenommen). Voraussetzung für die Vorbestellung (FA-01).
- **Liefergebiet, Mindestbestellwert, Liefergebühr** und **Lieferzonen mit Lieferzeit** pflegen → FA-17.
- **Speisekarte anlegen** beim Onboarding (Foto/PDF → Artikel) → FA-20, Speisekarten-Digitalisierung.
- **Betreiber-Rechte** (Restaurant anlegen/sperren, Module, Steuerdaten, Drucker koppeln) → FA-20/FA-21.
- Technische **Synchronisation** der Karte in den Voice-Prompt → K7.
