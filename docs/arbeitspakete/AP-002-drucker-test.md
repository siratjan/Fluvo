# AP-002 · Risikotest Bon-Druck: CloudPRNT und Druck ohne Internet

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** R2
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Mit einem echten Star-Drucker klären, ob beide Druckwege aus dem Briefing tragen: CloudPRNT (Drucker fragt den Server ab) und der lokale Rückfall aus der PWA, wenn das Internet ausfällt. „Offline-First für Küche und Bon" ist [FEST] — scheitert der lokale Druck, braucht es früh eine Alternative.

## Einordnung

- **Berührt:** [FEST] Offline-First für Küche und Bon, fluvo verkauft keine Hardware · [STACK] Star CloudPRNT · [OFFEN] Q8
- **Business Brain:** `@Hardware & Onboarding`, `Zero-Hardware-Start`
- **Nicht Teil dieses Pakets:** Bon-Layout, TSE-Block auf dem Bon, Modul `printing`

## Abnahmekriterien

- [ ] Druckermodell festgelegt (unterstützt CloudPRNT **und** einen lokalen Druckweg)
- [ ] CloudPRNT: Drucker holt einen Testauftrag von einem einfachen Testserver ab und bestätigt ihn; Abfrage-Intervall und Verzögerung bis zum Druck gemessen
- [ ] Lokaler Druck aus einer per HTTPS geladenen Seite im selben WLAN ohne Internet: funktioniert / funktioniert nicht, mit genauer Fehlermeldung des Browsers
- [ ] Falls nicht: mindestens eine Alternative geprüft (TLS auf dem Drucker, Bluetooth, USB)
- [ ] Ergebnis und Empfehlung als ADR-Entwurf; Q8 beantwortet oder mit klarem nächsten Schritt versehen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | jarvis | Testaufbau beschreiben, Ergebnisse aufnehmen |
| 2 | fluvo-printing (Skill) | Protokollablauf und bekannte Hürden |
| 3 | architect | Alternativen bewerten, ADR-Entwurf |
| 4 | doc-updater | Q8, Roadmap R2 nachziehen |

## Schritte

1. Druckermodell auswählen, Testaufbau beschreiben.
2. Wegwerf-Testskript für die CloudPRNT-Abfrage — nur nach ausdrücklicher Ansage von Sirat (dann „Entsteht Code?" anpassen).
3. Tests am Gerät, Auswertung, ADR-Entwurf.

## Braucht von Sirat

- Einen Star-Drucker zum Testen (kaufen oder leihen) — Entscheidung über das Modell
- Ansage, ob ein Wegwerf-Testskript geschrieben werden darf

## Ergebnis

_Noch offen._
