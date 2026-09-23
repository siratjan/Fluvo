// ERLAUBT: ein Modul importiert den Kern. Kein Verstoss gegen `no-cross-module`.
import { packageName } from '@fluvo/core';

export const charlieValue = `charlie uses ${packageName}`;
