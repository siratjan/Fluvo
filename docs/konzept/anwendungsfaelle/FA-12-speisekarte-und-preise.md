# FA-12: Speisekarte und Preise pflegen („gültig ab", „momentan aus", Allergene mit Warnung)

- **Status:** mit Sirat durchgegangen (Runden 47–48, 2026-09-22; Runde 51/54/55 eingearbeitet 2026-09-23 — Options-/Varianten-Modell, „keine geplanten Preise" und variantenlose Artikel/Standardvariante geschlossen; `base_price_cents` entfällt)
- **Stand:** 2026-09-23

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
3. **Im Piloten** gilt die Änderung **sofort ab dem Speichern** — es gibt **keine** in der Zukunft geplante Preisänderung ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54; **präzisiert/ersetzt** den „gültig ab"-Datumsteil aus Runde 47 für den Piloten). Ein künftig geplanter Preis ist **späterer Ausbau** (siehe Nachtrag Runde 54, Nicht Teil dieses Anwendungsfalls).
4. Der Inhaber bestätigt die Änderung.
5. Das System speichert. Ab dem Speichern nennen KI und Website den neuen Preis. Ein zu diesem Zeitpunkt **laufendes KI-Gespräch** rechnet mit dem Preisstand vom **Gesprächsbeginn** zu Ende.
6. Bereits aufgenommene Bestellungen behalten ihren Preis und Artikeltext (eingefroren).

> **Nachtrag Runde 51 (2026-09-23, aus dem Kreuzverhör FA-01 — FA-12-Detail, beim Einzeldurchgang zu vertiefen):** **Extra-Zutaten** („extra Zwiebeln") sind **bepreiste Optionen**, nicht Notizen. Der **Aufpreis je Extra hängt von der Größe/Variante** des Artikels ab (Beispiel Sirat: kleine Pizza Margherita, Extra-Zutat Zwiebel = 50 Cent); der **Server** rechnet den Aufpreis, die KI/Annahme nennen ihn mit ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51).

> **Nachtrag Runde 54 (2026-09-23, Einzeldurchgang K5 — schließt zwei Punkte):**
> 1. **Options-/Varianten-Modell (entschieden):** Je Artikel gibt es eine Tabelle für **Größen/Varianten** (`menu_item_variants`, mit eigenem Preis je Größe) und einen **Aufpreis je Extra je Variante** als **direkten Wert** (`menu_option_variant_prices`), **kein Faktor, keine Staffel**. Dasselbe Extra kostet je nach Größe unterschiedlich viel. Der **Server** rechnet den Aufpreis; die Bestellung friert Variante und Aufpreis ein. Damit ist das Options-/Varianten-Modell **geschlossen** ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54). Details: K5 ([../modelle/er-durchstich.md](../modelle/er-durchstich.md), [../vertraege/datenwoerterbuch.md](../vertraege/datenwoerterbuch.md)).
> 2. **Keine geplanten Preisänderungen im Piloten (entschieden):** Eine Preisänderung gilt **ab dem Speichern**; Bestellungen frieren ihren Preis ohnehin ein. Ein **künftig geplanter** Preis („gültig ab" in der Zukunft) ist im Piloten **nicht** vorgesehen und als **späterer Ausbau** vermerkt ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54 — **präzisiert/ersetzt** für den Piloten den „gültig ab"-Datumsteil aus Runde 47). Das Feld `menu_items.price_valid_from` entfällt (K5).

> **Nachtrag Runde 55 (2026-09-23, Einzeldurchgang K5 — variantenlose Artikel):** Es gibt **beides** — Artikel mit Größen und Artikel mit nur einem Preis (z. B. Getränke, Salat), die trotzdem Extras mit Aufpreis haben können. Umsetzung **ohne Sonderfall:** **Jeder Artikel hat mindestens eine Variante**; ein Artikel **ohne Größe** bekommt **genau eine Standardvariante**. Der Preis kommt damit **immer** aus der Variante; **`menu_items.base_price_cents` entfällt** — ein Grundpreis am Artikel wäre eine zweite Preis-Wahrheit neben der Variante ([FEST 9] „eine Speisekarte"). Der Extra-Aufpreis hängt weiterhin an einer Variante (`menu_option_variant_prices`), bei variantenlosen Artikeln an der Standardvariante. **DB-Invariante:** mind. eine Variante je aktivem Artikel, **im Kern beim Speichern** durchgesetzt (Standardvariante wird bei fehlender Größe automatisch angelegt). ([ENTSCHIEDEN Sirat 2026-09-23], Runde 55). Details: K5. *Nicht Teil dieses Falls:* die Oberflächen-Anzeige der Standardvariante ohne Größennamen (Hinweis für K10).

## Ausnahmeabläufe

- **2a. „Momentan aus" (Verfügbarkeit)** (zweigt von Schritt 2 ab): Der Inhaber **oder die Annahme** (Betriebsrecht, Runde 11) markiert einen Artikel als momentan nicht verfügbar. Das wirkt **sofort** für alle Kanäle; die KI bietet ihn nicht mehr an (FA-01, Ausnahme 5a). **Zurücksetzen (Einschalten)** dürfen **Annahme und Inhaber**. **Kein automatisches Zurücksetzen** am nächsten Tag: Der Artikel bleibt sichtbar als „momentan aus" gekennzeichnet, **bis ihn jemand von Hand wieder einschaltet** (Sirat, Runde 27, bestätigt Runde 28, 2026-09-22 — B12; ändert die frühere Lesart „springt am nächsten Geschäftstag von selbst zurück"). Länger nicht verfügbare Artikel nimmt der Inhaber oder die Annahme von der Karte (2c). Endet in: Artikel nicht bestellbar, bis Annahme oder Inhaber ihn von Hand wieder einschalten.
- **2b. Allergene oder Steuersatz ändern** (zweigt von Schritt 2 ab): Nur der **Inhaber** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13; bestätigt Runde 27, 2026-09-22). Das System zeigt eine **deutliche Warnung** (rechtliche Folgen), der Inhaber bestätigt ausdrücklich, und die Änderung wird **protokolliert**. Endet in: geändert und protokolliert. → Haftung offen (Anwalt).
- **2c. Artikel oder Option hinzufügen** (zweigt von Schritt 2 ab): Ein Artikel wird **nur mit Preis** angelegt. Fehlt der Preis, **schlägt das Anlegen fehl**; das System zeigt den Hinweis „**Artikel konnte nicht angelegt werden, weil der Preis fehlt**" und speichert **nichts** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47). Da nur der **Inhaber** einen Preis setzen darf, legt praktisch **nur der Inhaber Artikel/Optionen an** ([ENTSCHIEDEN Sirat 2026-09-22], Runde 47, bestätigt Runde 48 — schränkt B10 ein). Anlegen mit „sofort" oder „gültig ab", analog zur Preisänderung. Endet in: neuer Artikel mit Preis, oder — ohne Preis — Hinweis und kein Datensatz.
- **2c′. Artikel oder Option entfernen** (zweigt von Schritt 2 ab): Das dürfen **Inhaber und Annahme** (Sirat, Runde 27, 2026-09-22 — B10, entfernen bleibt). Jede solche Änderung durch die **Annahme** wird **für den Inhaber dokumentiert** (Inhaber-Log/Tagesübersicht, K10). Ein entfernter Artikel bleibt in bereits aufgenommenen Bestellungen als eingefrorener Artikeltext erhalten. Endet in: geänderte Karte, alte Bestellungen unverändert.
- **3a. „Gültig ab"-Datum in der Zukunft** — **im Piloten nicht enthalten** ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54): Keine in der Zukunft geplante Preisänderung; die Änderung gilt ab dem Speichern. Der Fall (Preis heute alt, ab Datum X neu) ist als **späterer Ausbau** vermerkt (siehe „Nicht Teil dieses Anwendungsfalls").
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
| **Im Piloten:** Preisänderung gilt **sofort ab dem Speichern** — **keine** in der Zukunft geplante Änderung (präzisiert/ersetzt Runde 2/3/47 für den Piloten) | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 54 |
| „Gültig ab"-Datum in der Zukunft und Preis-Historie sind **späterer Ausbau**, nicht im Piloten | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 54 |
| **Extra-Zutaten** sind bepreiste Optionen; der Aufpreis je Extra hängt von der **Größe/Variante** ab und liegt als **direkter Wert je Paar (Extra × Variante)** vor (kein Faktor/keine Staffel); der Server rechnet | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51/54 |
| **Jeder Artikel hat mindestens eine Variante**; ein Artikel **ohne Größe** bekommt **genau eine Standardvariante** (einheitliche Regel, kein Sonderfall). Der Preis kommt immer aus der Variante — **`menu_items.base_price_cents` entfällt** (keine zweite Preis-Wahrheit, [FEST 9]). Extra-Aufpreis immer an einer Variante. Invariante im Kern beim Speichern durchgesetzt | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 55 |
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
| FA-12-T1 · Preis sofort ändern | Inhaber ändert Preis eines Artikels, „sofort" | Nächster Anruf/Website nennt neuen Preis | Alter Preis nach der Änderung | manuell am Gerät + automatisch |
| FA-12-T2 · Preisänderung gilt sofort, keine Zukunftsplanung (Runde 54) | Inhaber ändert einen Preis | Änderung gilt **ab dem Speichern**; **keine** Option, ein Datum in der Zukunft zu wählen | Zukunfts-Datum planbar; Änderung erst später wirksam | automatisch |
| FA-12-T3 · Laufendes Gespräch bei sofortiger Änderung (Grenzfall) | Preis wird geändert, während ein KI-Gespräch schon läuft | Gespräch rechnet mit Startpreis zu Ende | Änderung trifft das laufende Gespräch | automatisch |
| FA-12-T4 · Bereits aufgenommene Bestellung | Bestellung angelegt, danach Preis geändert | Bestellung behält alten Preis und Artikeltext | Rückwirkende Preisänderung | automatisch |
| FA-12-T5 · „Momentan aus" | Artikel als momentan aus markiert | KI/Website bieten ihn sofort nicht mehr an | Artikel bleibt bestellbar | manuell + automatisch |
| FA-12-T6 · „Momentan aus" wieder einschalten (Annahme) | Annahme setzt einen „momentan aus"-Artikel wieder auf verfügbar | Artikel wieder bestellbar; Annahme darf einschalten | Nur der Inhaber darf einschalten | manuell + automatisch |
| FA-12-T7 · „Momentan aus" springt **nicht** von selbst zurück (Grenzfall) | Artikel „momentan aus", nächster Geschäftstag beginnt, niemand schaltet ein | Artikel bleibt „momentan aus", bis jemand ihn von Hand wieder einschaltet | Artikel wird am nächsten Tag von selbst wieder verfügbar | automatisch |
| FA-12-T8 · Artikel ohne Preis anlegen (Grenzfall) | Inhaber (oder Annahme) versucht, einen Artikel **ohne Preis** anzulegen | Anlegen scheitert, Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt", **nichts gespeichert** | Artikel ohne Preis wird gespeichert | automatisch |
| FA-12-T9 · Annahme versucht Artikel anzulegen (B10 eingeschränkt) | Annahme (Betriebsrechte) versucht, einen Artikel anzulegen — sie kann keinen Preis setzen | Anlegen kommt nicht zustande (ohne Preis kein Datensatz), Hinweis; **nichts gespeichert** | Annahme legt einen Artikel an oder setzt einen Preis | automatisch |
| FA-12-T10 · Annahme entfernt Artikel/Option (B10) | Annahme (Betriebsrechte) entfernt einen Artikel und eine Option | Entfernen gelingt; die Änderung ist **für den Inhaber dokumentiert** (Log); alte Bestellungen behalten den eingefrorenen Artikeltext | Entfernen ohne Dokumentation für den Inhaber | automatisch |
| FA-12-T11 · Allergen ändern (Grenzfall) | Inhaber ändert ein Allergen | Deutliche Warnung, Bestätigung nötig, Änderung protokolliert | Änderung ohne Warnung/Protokoll | manuell + automatisch |
| FA-12-T12 · Steuersatz ändern (Grenzfall) | Inhaber ändert den Steuersatz eines Artikels | Deutliche Warnung, Bestätigung nötig, Änderung protokolliert | Änderung ohne Warnung/Protokoll | manuell + automatisch |
| FA-12-T13 · Annahme-Grenzen an der Karte | Annahme (Betriebsrechte) versucht, Preis/Allergen/Steuersatz zu ändern und einen Artikel anzulegen, und schaltet einen Artikel „momentan aus" | Preis/Allergen/Steuersatz **nicht** änderbar (nur Inhaber); Anlegen kommt ohne Preis nicht zustande; „momentan aus" gelingt | Annahme ändert Preis/Allergen/Steuersatz oder legt einen Artikel an | automatisch |
| FA-12-T14 · Zwei-Restaurant-Fall | Inhaber A ändert Preis; Restaurant B hat eigene Karte | Nur A's Karte ändert sich; B unverändert und für A nicht sichtbar | Übergriff auf fremden Tenant | automatisch |
| FA-12-T15 · Extra-Aufpreis ist größenabhängig (Runde 54) | Artikel mit Varianten „klein"/„groß"; Extra „Zwiebel" mit **je Variante eigenem** Aufpreis (Beispiel: klein 50 Cent, groß anderer Wert) hinterlegt | Bestellung mit „klein" nimmt den Klein-Aufpreis, „groß" den Groß-Aufpreis; Server rechnet | Gleicher Aufpreis unabhängig von der Größe; Faktor/Staffel statt direktem Wert | automatisch |
| FA-12-T16 · Variante und Aufpreis werden eingefroren (Runde 54) | Bestellung mit Größe + Extra angelegt, danach Variantenpreis/Extra-Aufpreis in der Karte geändert | Bestellung behält gewählte Variante, Einzelpreis und eingefrorenen Extra-Aufpreis | Rückwirkende Änderung an der aufgenommenen Bestellung | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Stammdatenpflege → Speisekarte ändern" (K2 noch offen)
- **Zustandsübergänge:** keiner an einer Bestellung — Stammdatenänderung; wirkt auf künftige `createOrder`-Aufrufe.
- **Technische Anwendungsfälle:** TU-? (Preis mit „gültig ab", Verfügbarkeit, Allergen/Steuer mit Protokoll, Prompt-Synchronisation der KI; Zuordnung in K7)
- **Verträge / Events:** vorläufig `menu.updated`, Protokoll-Ereignis für Allergen-/Steueränderung (Namen offen, K6); Preisstand-Regel berührt FA-01. **Kein `menu.price_scheduled`** — geplante Preise entfallen im Piloten (Runde 54).
- **Testszenarien:** FA-12-T1 … FA-12-T16 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI nennt Preise/nimmt „momentan aus" wahr), FA-05 (Annahme nutzt dieselbe Karte), FA-17 (Zonen/Lieferzeit, Liefergebiet), FA-20 (Onboarding legt Karte an), FA-21 (Betreiber-Rechte)

## Offene Fragen

> **Beantwortet (Runde 54, Options-/Varianten-Modell):** Größen/Varianten je Artikel (`menu_item_variants`, eigener Preis je Größe) und ein **Aufpreis je Extra je Variante** als **direkter Wert** (`menu_option_variant_prices`) — **kein Faktor, keine Staffel** ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54). Der Inhaber pflegt den Aufpreis je Paar (Extra × Größe); der Server rechnet. Details in K5.

> **Beantwortet (Runde 55, variantenlose Artikel):** Es gibt Artikel mit Größen **und** Artikel mit nur einem Preis (Getränke, Salat) mit möglichen Extras. **Jeder Artikel hat mindestens eine Variante**; ein Artikel ohne Größe bekommt **genau eine Standardvariante** — einheitliche Regel ohne Sonderfall. Der Preis kommt immer aus der Variante, **`menu_items.base_price_cents` entfällt** (keine zweite Wahrheit, [FEST 9]); der Extra-Aufpreis hängt immer an einer Variante ([ENTSCHIEDEN Sirat 2026-09-23], Runde 55). Details in K5.

> **Beantwortet (Runde 54, geplante Preise):** Im Piloten gibt es **keine** in der Zukunft geplante Preisänderung — sie gilt ab dem Speichern ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54). „Gültig ab"-Datum/Preis-Historie sind späterer Ausbau; `menu_items.price_valid_from` entfällt (K5).

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
- **In der Zukunft geplante Preisänderungen** („gültig ab" Datum X) und eine **Preis-Historie** — späterer Ausbau, im Piloten nicht enthalten ([ENTSCHIEDEN Sirat 2026-09-23], Runde 54).
