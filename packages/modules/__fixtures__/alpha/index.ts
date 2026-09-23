// VERBOTEN: ein Modul importiert direkt ein anderes Modul (statt ueber Kern-Events).
// Die Regel `no-cross-module` muss diesen Import als Verstoss melden.
import { bravoValue } from '../bravo/index.js';

export const alphaValue = `alpha uses ${bravoValue}`;
