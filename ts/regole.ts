import { Articolo } from "./articolo";

export function regola(
  articolo: Articolo | undefined,
  necessario: Articolo | undefined
): number {
  let value = 0;

  if (articolo && necessario) {
    switch (articolo.nome) {
      case "CHIODI": {
        if (necessario.nome === "METALLO") value = 2;
        break;
      }
      case "ASSI": {
        if (necessario.nome === "LEGNO") value = 2;
        break;
      }
      case "MATTONI": {
        if (necessario.nome === "MINERALI") value = 2;
        break;
      }
      case "CEMENTO": {
        if (necessario.nome === "MINERALI") value = 2;
        else if (necessario.nome === "SOSTANZE CHIMICHE") value = 1;
        break;
      }
      case "COLLA": {
        if (necessario.nome === "PLASTICA") value = 1;
        else if (necessario.nome === "SOSTANZE CHIMICHE") value = 2;
        break;
      }
      case "VERNICE": {
        if (necessario.nome === "METALLO") value = 2;
        else if (necessario.nome === "MINERALI") value = 1;
        else if (necessario.nome === "SOSTANZE CHIMICHE") value = 2;
        break;
      }
      case "MARTELLO": {
        if (necessario.nome === "METALLO") value = 1;
        else if (necessario.nome === "LEGNO") value = 1;
        break;
      }
      case "METRO A NASTRO": {
        if (necessario.nome === "METALLO") value = 1;
        else if (necessario.nome === "PLASTICA") value = 1;
        break;
      }
      case "PALA": {
        if (necessario.nome === "METALLO") value = 1;
        else if (necessario.nome === "LEGNO") value = 1;
        else if (necessario.nome === "PLASTICA") value = 1;
        break;
      }
      case "UTENSILI DA CUCINA": {
        if (necessario.nome === "METALLO") value = 2;
        else if (necessario.nome === "LEGNO") value = 2;
        else if (necessario.nome === "PLASTICA") value = 2;
        break;
      }
      case "SCALA": {
        if (necessario.nome === "METALLO") value = 2;
        else if (necessario.nome === "ASSI") value = 2;
        break;
      }
      case "TRAPANO": {
        if (necessario.nome === "METALLO") value = 2;
        else if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "ERBA": {
        if (necessario.nome === "SEMI") value = 1;
        else if (necessario.nome === "PALA") value = 1;
        break;
      }
      case "ARBOSCELLI": {
        if (necessario.nome === "SEMI") value = 2;
        else if (necessario.nome === "PALA") value = 1;
        break;
      }
      case "ARREDAMENTO DA GIARDINO": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "TESSUTI") value = 2;
        else if (necessario.nome === "ASSI") value = 2;
        break;
      }
      case "BUCA PER IL FUOCO": {
        if (necessario.nome === "MATTONI") value = 2;
        else if (necessario.nome === "CEMENTO") value = 2;
        else if (necessario.nome === "PALA") value = 1;
        break;
      }
      case "TOSAERBA": {
        if (necessario.nome === "METALLO") value = 3;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 1;
        else if (necessario.nome === "VERNICE") value = 1;
        break;
      }
      case "GNOMI DA GIARDINO": {
        if (necessario.nome === "CEMENTO") value = 2;
        else if (necessario.nome === "COLLA") value = 1;
        break;
      }
      case "VEGETALI": {
        if (necessario.nome === "SEMI") value = 2;
        break;
      }
      case "SACCHETTO DI FARINA": {
        if (necessario.nome === "SEMI") value = 2;
        else if (necessario.nome === "TESSUTI") value = 2;
        break;
      }
      case "FRUTTA E FRUTTI DI BOSCO": {
        if (necessario.nome === "SEMI") value = 2;
        else if (necessario.nome === "ARBOSCELLI") value = 1;
        break;
      }
      case "PANNA": {
        if (necessario.nome === "MANGIME") value = 1;
        break;
      }
      case "GRANOTURCO": {
        if (necessario.nome === "SEMI") value = 4;
        else if (necessario.nome === "MINERALI") value = 1;
        break;
      }
      case "FORMAGGIO": {
        if (necessario.nome === "MANGIME") value = 2;
        break;
      }
      case "MANZO": {
        if (necessario.nome === "MANGIME") value = 3;
        break;
      }
      case "CIAMBELLE": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario.nome === "SACCHETTO DI FARINA") value = 1;
        break;
      }
      case "FRULLATO VERDE": {
        if (necessario.nome === "VEGETALI") value = 1;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "PANINO": {
        if (necessario.nome === "SACCHETTO DI FARINA") value = 2;
        else if (necessario.nome === "PANNA") value = 1;
        break;
      }
      case "CHEESECAKE DI CILIEGIE": {
        if (necessario.nome === "SACCHETTO DI FARINA") value = 1;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        else if (necessario.nome === "FORMAGGIO") value = 1;
        break;
      }
      case "YOGURT GELATO": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario.nome === "PANNA") value = 1;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "CAFFE": {
        if (necessario.nome === "SEMI") value = 2;
        else if (necessario.nome === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario.nome === "PANNA") value = 1;
        break;
      }
      case "BERRETTO": {
        if (necessario.nome === "TESSUTI") value = 2;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        break;
      }
      case "SCARPE": {
        if (necessario.nome === "PLASTICA") value = 1;
        else if (necessario.nome === "TESSUTI") value = 2;
        else if (necessario.nome === "COLLA") value = 1;
        break;
      }
      case "OROLOGIO": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "SOSTANZE CHIMICHE") value = 1;
        else if (necessario.nome === "VETRO") value = 1;
        break;
      }
      case "COMPLETI DA UOMO": {
        if (necessario.nome === "TESSUTI") value = 3;
        else if (necessario.nome === "COLLA") value = 1;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        break;
      }
      case "ZAINO": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "TESSUTI") value = 2;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        break;
      }
      case "SEDIE": {
        if (necessario.nome === "LEGNO") value = 2;
        else if (necessario.nome === "CHIODI") value = 1;
        else if (necessario.nome === "MARTELLO") value = 1;
        break;
      }
      case "TAVOLI": {
        if (necessario.nome === "CHIODI") value = 2;
        else if (necessario.nome === "ASSI") value = 1;
        else if (necessario.nome === "MARTELLO") value = 1;
        break;
      }
      case "BIANCHERIA PER LA CASA": {
        if (necessario.nome === "TESSUTI") value = 2;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        break;
      }
      case "CREDENZA": {
        if (necessario.nome === "VETRO") value = 2;
        else if (necessario.nome === "ASSI") value = 2;
        else if (necessario.nome === "VERNICE") value = 1;
        break;
      }
      case "DIVANO": {
        if (necessario.nome === "TESSUTI") value = 3;
        else if (necessario.nome === "COLLA") value = 1;
        else if (necessario.nome === "TRAPANO") value = 1;
        break;
      }
      case "GRIGLIA PER BARBECUE": {
        if (necessario.nome === "METALLO") value = 3;
        else if (necessario.nome === "UTENSILI DA CUCINA") value = 1;
        break;
      }
      case "FRIGORIFERO": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "VETRO") value = 2;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 2;
        break;
      }
      case "SISTEMA DI ILLUMINAZIONE": {
        if (necessario.nome === "SOSTANZE CHIMICHE") value = 1;
        else if (necessario.nome === "VETRO") value = 1;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "TV": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "VETRO") value = 2;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 2;
        break;
      }
      case "FORNO A MICROONDE": {
        if (necessario.nome === "METALLO") value = 4;
        else if (necessario.nome === "VETRO") value = 1;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "GELATO CON BISCOTTO": {
        if (necessario.nome === "PANNA") value = 1;
        else if (necessario.nome === "PANINO") value = 1;
        break;
      }
      case "PIZZA": {
        if (necessario.nome === "SACCHETTO DI FARINA") value = 1;
        else if (necessario.nome === "FORMAGGIO") value = 1;
        else if (necessario.nome === "MANZO") value = 1;
        break;
      }
      case "HAMBURGER": {
        if (necessario.nome === "PANINO") value = 1;
        else if (necessario.nome === "MANZO") value = 1;
        else if (necessario.nome === "GRIGLIA  PER BARBECUE") value = 1;
        break;
      }
      case "PATATINE AL FORMAGGIO": {
        if (necessario.nome === "VEGETALI") value = 1;
        else if (necessario.nome === "FORMAGGIO") value = 1;
        break;
      }
      case "BOTTIGLIA DI LIMONATA": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 2;
        else if (necessario.nome === "VETRO") value = 2;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "POP CORN": {
        if (necessario.nome === "GRANOTURCO") value = 2;
        else if (necessario.nome === "FORNO A MICROONDE") value = 1;
        break;
      }
      case "RACCHETTA DA TENNIS": {
        if (necessario.nome === "MINERALI") value = 4;
        else if (necessario.nome === "MARTELLO") value = 2;
        break;
      }
      case "BIBITA ENERGETICA": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 4;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 2;
        break;
      }
      case "SCARPE DA CALCIO": {
        if (necessario.nome === "SOSTANZE CHIMICHE") value = 3;
        else if (necessario.nome === "SCARPE") value = 1;
        break;
      }
      case "BARRETTA PROTEICA": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 2;
        else if (necessario.nome === "CHEESECAKE DI CILIEGIE") value = 1;
        break;
      }
      case "TAVOLO DA PING PONG": {
        if (necessario.nome === "LEGNO") value = 4;
        else if (necessario.nome === "MINERALI") value = 4;
        else if (necessario.nome === "TAVOLO") value = 1;
        break;
      }
      case "BLOCCHI CON LETTERE": {
        if (necessario.nome === "LEGNO") value = 4;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        break;
      }
      case "AQUILONE": {
        if (necessario.nome === "ASSI") value = 2;
        else if (necessario.nome === "VERNICE") value = 2;
        else if (necessario.nome === "BIANCHERIA PER LA CASA") value = 2;
        break;
      }
      case "ORSACCHIOTTO": {
        if (necessario.nome === "PLASTICA") value = 2;
        else if (necessario.nome === "BIANCHERIA PER LA CASA") value = 4;
        break;
      }
      case "CONSOLE PER VIDEOGIOCHI": {
        if (necessario.nome === "VETRO") value = 3;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 3;
        else if (necessario.nome === "SISTEMA DI ILLUMINAZIONE") value = 1;
        break;
      }
      case "OLIO MOTORE": {
        if (necessario.nome === "PETROLIO GREZZO") value = 2;
        break;
      }
      case "PNEOMATICO": {
        if (necessario.nome === "CHIODI") value = 3;
        else if (necessario.nome === "COLLA") value = 1;
        else if (necessario.nome === "PETROLIO GREZZO") value = 2;
        break;
      }
      case "MOTORE": {
        if (necessario.nome === "CHIODI") value = 3;
        else if (necessario.nome === "COMPONENTI ELETTRICI") value = 1;
        else if (necessario.nome === "TRAPANO") value = 1;
        break;
      }
      case "PESCE IN SCATOLA": {
        if (necessario.nome === "METALLO") value = 1;
        else if (necessario.nome === "PESCE") value = 1;
        break;
      }
      case "ZUPPA DI PESCE": {
        if (necessario.nome === "UTENSILI DA CUCINA") value = 2;
        else if (necessario.nome === "VEGETALI") value = 1;
        else if (necessario.nome === "PESCE") value = 2;
        break;
      }
      case "PANINO AL SALMONE": {
        if (necessario.nome === "PANINO") value = 1;
        else if (necessario.nome === "PESCE") value = 2;
        break;
      }
      case "SACCHETTO RIUTILIZZABILE": {
        if (necessario.nome === "TESSUTO RICICLATO") value = 2;
        break;
      }
      case "SCARPE ECOLOGICHE": {
        if (necessario.nome === "COLLA") value = 1;
        else if (necessario.nome === "METRO A NASTRO") value = 1;
        else if (necessario.nome === "TESSUTO RICICLATO") value = 2;
        break;
      }
      case "TAPPETINO DA YOGA": {
        if (necessario.nome === "VERNICE") value = 1;
        else if (necessario.nome === "BIANCHERIA PER LA CASA") value = 2;
        else if (necessario.nome === "TESSUTO RICICLATO") value = 3;
        break;
      }
      case "CORDINO": {
        if (necessario.nome === "SETA") value = 2;
        break;
      }
      case "VENTAGLIO": {
        if (necessario.nome === "LEGNO") value = 1;
        else if (necessario.nome === "COLLA") value = 2;
        else if (necessario.nome === "SETA") value = 2;
        break;
      }
      case "VESTAGLIA": {
        if (necessario.nome === "VERNICE") value = 2;
        else if (necessario.nome === "BIANCHERIA PER LA CASA") value = 1;
        else if (necessario.nome === "SETA") value = 3;
        break;
      }
      case "OLIO DI COCCO": {
        if (necessario.nome === "COCCHI") value = 2;
        break;
      }
      case "CREME PER IL VISO": {
        if (necessario.nome === "SOSTANZE CHIMICHE") value = 2;
        else if (necessario.nome === "OLIO DI COCCO") value = 2;
        break;
      }
      case "BEVANDA TROPICALE": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario.nome === "FRUTTA E FRUTTI DI BOSCO") value = 2;
        else if (necessario.nome === "COCCHI") value = 2;
        break;
      }
      case "CAVALLO A DONDOLO": {
        if (necessario.nome === "LEGNO") value = 1;
        else if (necessario.nome === "CHIODI") value = 1;
        else if (necessario.nome === "MARTELLO") value = 1;
        break;
      }
      case "DECORAZIONI NATALIZIE": {
        if (necessario.nome === "SEMI") value = 1;
        break;
      }
      case "BASTONCINI DI ZUCCHERO": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 3;
        break;
      }
      case "BISCOTTI ALLO ZENZERO": {
        if (necessario.nome === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario.nome === "UTENSILI DA CUCINA") value = 1;
        else if (necessario.nome === "SACCHETTO DI FARINA") value = 1;
        break;
      }
      case "ORNAMENTI FESTIVI": {
        if (necessario.nome === "VETRO") value = 2;
        else if (necessario.nome === "VERNICE") value = 1;
        break;
      }
      default: {
        value = 0;
        break;
      }
    }
  }
  return value;
}
