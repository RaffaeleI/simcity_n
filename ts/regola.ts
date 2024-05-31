export function regola(
  articolo: String | undefined,
  necessario: String | undefined
): number {
  let value = 0;

  if (articolo && necessario) {
    switch (articolo) {
      case "CHIODI": {
        if (necessario === "METALLO") value = 2;
        break;
      }
      case "ASSI": {
        if (necessario === "LEGNO") value = 2;
        break;
      }
      case "MATTONI": {
        if (necessario === "MINERALI") value = 2;
        break;
      }
      case "CEMENTO": {
        if (necessario === "MINERALI") value = 2;
        else if (necessario === "SOSTANZE CHIMICHE") value = 1;
        break;
      }
      case "COLLA": {
        if (necessario === "PLASTICA") value = 1;
        else if (necessario === "SOSTANZE CHIMICHE") value = 2;
        break;
      }
      case "VERNICE": {
        if (necessario === "METALLO") value = 2;
        else if (necessario === "MINERALI") value = 1;
        else if (necessario === "SOSTANZE CHIMICHE") value = 2;
        break;
      }
      case "MARTELLO": {
        if (necessario === "METALLO") value = 1;
        else if (necessario === "LEGNO") value = 1;
        break;
      }
      case "METRO A NASTRO": {
        if (necessario === "METALLO") value = 1;
        else if (necessario === "PLASTICA") value = 1;
        break;
      }
      case "PALA": {
        if (necessario === "METALLO") value = 1;
        else if (necessario === "LEGNO") value = 1;
        else if (necessario === "PLASTICA") value = 1;
        break;
      }
      case "UTENSILI DA CUCINA": {
        if (necessario === "METALLO") value = 2;
        else if (necessario === "LEGNO") value = 2;
        else if (necessario === "PLASTICA") value = 2;
        break;
      }
      case "SCALA": {
        if (necessario === "METALLO") value = 2;
        else if (necessario === "ASSI") value = 2;
        break;
      }
      case "TRAPANO": {
        if (necessario === "METALLO") value = 2;
        else if (necessario === "PLASTICA") value = 2;
        else if (necessario === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "ERBA": {
        if (necessario === "SEMI") value = 1;
        else if (necessario === "PALA") value = 1;
        break;
      }
      case "ARBOSCELLI": {
        if (necessario === "SEMI") value = 2;
        else if (necessario === "PALA") value = 1;
        break;
      }
      case "ARREDAMENTO DA GIARDINO": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "TESSUTI") value = 2;
        else if (necessario === "ASSI") value = 2;
        break;
      }
      case "BUCA PER IL FUOCO": {
        if (necessario === "MATTONI") value = 2;
        else if (necessario === "CEMENTO") value = 2;
        else if (necessario === "PALA") value = 1;
        break;
      }
      case "TOSAERBA": {
        if (necessario === "METALLO") value = 3;
        else if (necessario === "COMPONENTI ELETTRICI") value = 1;
        else if (necessario === "VERNICE") value = 1;
        break;
      }
      case "GNOMI DA GIARDINO": {
        if (necessario === "CEMENTO") value = 2;
        else if (necessario === "COLLA") value = 1;
        break;
      }
      case "VEGETALI": {
        if (necessario === "SEMI") value = 2;
        break;
      }
      case "SACCHETTO DI FARINA": {
        if (necessario === "SEMI") value = 2;
        else if (necessario === "TESSUTI") value = 2;
        break;
      }
      case "FRUTTA E FRUTTI DI BOSCO": {
        if (necessario === "SEMI") value = 2;
        else if (necessario === "ARBOSCELLI") value = 1;
        break;
      }
      case "PANNA": {
        if (necessario === "MANGIME") value = 1;
        break;
      }
      case "GRANOTURCO": {
        if (necessario === "SEMI") value = 4;
        else if (necessario === "MINERALI") value = 1;
        break;
      }
      case "FORMAGGIO": {
        if (necessario === "MANGIME") value = 2;
        break;
      }
      case "MANZO": {
        if (necessario === "MANGIME") value = 3;
        break;
      }
      case "CIAMBELLE": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario === "SACCHETTO DI FARINA") value = 1;
        break;
      }
      case "FRULLATO VERDE": {
        if (necessario === "VEGETALI") value = 1;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "PANINO": {
        if (necessario === "SACCHETTO DI FARINA") value = 2;
        else if (necessario === "PANNA") value = 1;
        break;
      }
      case "CHEESECAKE DI CILIEGIE": {
        if (necessario === "SACCHETTO DI FARINA") value = 1;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        else if (necessario === "FORMAGGIO") value = 1;
        break;
      }
      case "YOGURT GELATO": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario === "PANNA") value = 1;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "CAFFE": {
        if (necessario === "SEMI") value = 2;
        else if (necessario === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario === "PANNA") value = 1;
        break;
      }
      case "BERRETTO": {
        if (necessario === "TESSUTI") value = 2;
        else if (necessario === "METRO A NASTRO") value = 1;
        break;
      }
      case "SCARPE": {
        if (necessario === "PLASTICA") value = 1;
        else if (necessario === "TESSUTI") value = 2;
        else if (necessario === "COLLA") value = 1;
        break;
      }
      case "OROLOGIO": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "SOSTANZE CHIMICHE") value = 1;
        else if (necessario === "VETRO") value = 1;
        break;
      }
      case "COMPLETI DA UOMO": {
        if (necessario === "TESSUTI") value = 3;
        else if (necessario === "COLLA") value = 1;
        else if (necessario === "METRO A NASTRO") value = 1;
        break;
      }
      case "ZAINO": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "TESSUTI") value = 2;
        else if (necessario === "METRO A NASTRO") value = 1;
        break;
      }
      case "SEDIE": {
        if (necessario === "LEGNO") value = 2;
        else if (necessario === "CHIODI") value = 1;
        else if (necessario === "MARTELLO") value = 1;
        break;
      }
      case "TAVOLI": {
        if (necessario === "CHIODI") value = 2;
        else if (necessario === "ASSI") value = 1;
        else if (necessario === "MARTELLO") value = 1;
        break;
      }
      case "BIANCHERIA PER LA CASA": {
        if (necessario === "TESSUTI") value = 2;
        else if (necessario === "METRO A NASTRO") value = 1;
        break;
      }
      case "CREDENZA": {
        if (necessario === "VETRO") value = 2;
        else if (necessario === "ASSI") value = 2;
        else if (necessario === "VERNICE") value = 1;
        break;
      }
      case "DIVANO": {
        if (necessario === "TESSUTI") value = 3;
        else if (necessario === "COLLA") value = 1;
        else if (necessario === "TRAPANO") value = 1;
        break;
      }
      case "GRIGLIA PER BARBECUE": {
        if (necessario === "METALLO") value = 3;
        else if (necessario === "UTENSILI DA CUCINA") value = 1;
        break;
      }
      case "FRIGORIFERO": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "VETRO") value = 2;
        else if (necessario === "COMPONENTI ELETTRICI") value = 2;
        break;
      }
      case "SISTEMA DI ILLUMINAZIONE": {
        if (necessario === "SOSTANZE CHIMICHE") value = 1;
        else if (necessario === "VETRO") value = 1;
        else if (necessario === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "TV": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "VETRO") value = 2;
        else if (necessario === "COMPONENTI ELETTRICI") value = 2;
        break;
      }
      case "FORNO A MICROONDE": {
        if (necessario === "METALLO") value = 4;
        else if (necessario === "VETRO") value = 1;
        else if (necessario === "COMPONENTI ELETTRICI") value = 1;
        break;
      }
      case "GELATO CON BISCOTTO": {
        if (necessario === "PANNA") value = 1;
        else if (necessario === "PANINO") value = 1;
        break;
      }
      case "PIZZA": {
        if (necessario === "SACCHETTO DI FARINA") value = 1;
        else if (necessario === "FORMAGGIO") value = 1;
        else if (necessario === "MANZO") value = 1;
        break;
      }
      case "HAMBURGER": {
        if (necessario === "PANINO") value = 1;
        else if (necessario === "MANZO") value = 1;
        else if (necessario === "GRIGLIA  PER BARBECUE") value = 1;
        break;
      }
      case "PATATINE AL FORMAGGIO": {
        if (necessario === "VEGETALI") value = 1;
        else if (necessario === "FORMAGGIO") value = 1;
        break;
      }
      case "BOTTIGLIA DI LIMONATA": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 2;
        else if (necessario === "VETRO") value = 2;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 1;
        break;
      }
      case "POP CORN": {
        if (necessario === "GRANOTURCO") value = 2;
        else if (necessario === "FORNO A MICROONDE") value = 1;
        break;
      }
      case "RACCHETTA DA TENNIS": {
        if (necessario === "MINERALI") value = 4;
        else if (necessario === "MARTELLO") value = 2;
        break;
      }
      case "BIBITA ENERGETICA": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 4;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 2;
        break;
      }
      case "SCARPE DA CALCIO": {
        if (necessario === "SOSTANZE CHIMICHE") value = 3;
        else if (necessario === "SCARPE") value = 1;
        break;
      }
      case "BARRETTA PROTEICA": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 2;
        else if (necessario === "CHEESECAKE DI CILIEGIE") value = 1;
        break;
      }
      case "TAVOLO DA PING PONG": {
        if (necessario === "LEGNO") value = 4;
        else if (necessario === "MINERALI") value = 4;
        else if (necessario === "TAVOLO") value = 1;
        break;
      }
      case "BLOCCHI CON LETTERE": {
        if (necessario === "LEGNO") value = 4;
        else if (necessario === "METRO A NASTRO") value = 1;
        break;
      }
      case "AQUILONE": {
        if (necessario === "ASSI") value = 2;
        else if (necessario === "VERNICE") value = 2;
        else if (necessario === "BIANCHERIA PER LA CASA") value = 2;
        break;
      }
      case "ORSACCHIOTTO": {
        if (necessario === "PLASTICA") value = 2;
        else if (necessario === "BIANCHERIA PER LA CASA") value = 4;
        break;
      }
      case "CONSOLE PER VIDEOGIOCHI": {
        if (necessario === "VETRO") value = 3;
        else if (necessario === "COMPONENTI ELETTRICI") value = 3;
        else if (necessario === "SISTEMA DI ILLUMINAZIONE") value = 1;
        break;
      }
      case "OLIO MOTORE": {
        if (necessario === "PETROLIO GREZZO") value = 2;
        break;
      }
      case "PNEOMATICO": {
        if (necessario === "CHIODI") value = 3;
        else if (necessario === "COLLA") value = 1;
        else if (necessario === "PETROLIO GREZZO") value = 2;
        break;
      }
      case "MOTORE": {
        if (necessario === "CHIODI") value = 3;
        else if (necessario === "COMPONENTI ELETTRICI") value = 1;
        else if (necessario === "TRAPANO") value = 1;
        break;
      }
      case "PESCE IN SCATOLA": {
        if (necessario === "METALLO") value = 1;
        else if (necessario === "PESCE") value = 1;
        break;
      }
      case "ZUPPA DI PESCE": {
        if (necessario === "UTENSILI DA CUCINA") value = 2;
        else if (necessario === "VEGETALI") value = 1;
        else if (necessario === "PESCE") value = 2;
        break;
      }
      case "PANINO AL SALMONE": {
        if (necessario === "PANINO") value = 1;
        else if (necessario === "PESCE") value = 2;
        break;
      }
      case "SACCHETTO RIUTILIZZABILE": {
        if (necessario === "TESSUTO RICICLATO") value = 2;
        break;
      }
      case "SCARPE ECOLOGICHE": {
        if (necessario === "COLLA") value = 1;
        else if (necessario === "METRO A NASTRO") value = 1;
        else if (necessario === "TESSUTO RICICLATO") value = 2;
        break;
      }
      case "TAPPETINO DA YOGA": {
        if (necessario === "VERNICE") value = 1;
        else if (necessario === "BIANCHERIA PER LA CASA") value = 2;
        else if (necessario === "TESSUTO RICICLATO") value = 3;
        break;
      }
      case "CORDINO": {
        if (necessario === "SETA") value = 2;
        break;
      }
      case "VENTAGLIO": {
        if (necessario === "LEGNO") value = 1;
        else if (necessario === "COLLA") value = 2;
        else if (necessario === "SETA") value = 2;
        break;
      }
      case "VESTAGLIA": {
        if (necessario === "VERNICE") value = 2;
        else if (necessario === "BIANCHERIA PER LA CASA") value = 1;
        else if (necessario === "SETA") value = 3;
        break;
      }
      case "OLIO DI COCCO": {
        if (necessario === "COCCHI") value = 2;
        break;
      }
      case "CREME PER IL VISO": {
        if (necessario === "SOSTANZE CHIMICHE") value = 2;
        else if (necessario === "OLIO DI COCCO") value = 2;
        break;
      }
      case "BEVANDA TROPICALE": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario === "FRUTTA E FRUTTI DI BOSCO") value = 2;
        else if (necessario === "COCCHI") value = 2;
        break;
      }
      case "CAVALLO A DONDOLO": {
        if (necessario === "LEGNO") value = 1;
        else if (necessario === "CHIODI") value = 1;
        else if (necessario === "MARTELLO") value = 1;
        break;
      }
      case "DECORAZIONI NATALIZIE": {
        if (necessario === "SEMI") value = 1;
        break;
      }
      case "BASTONCINI DI ZUCCHERO": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 3;
        break;
      }
      case "BISCOTTI ALLO ZENZERO": {
        if (necessario === "SPEZIE E ZUCCHERO") value = 1;
        else if (necessario === "UTENSILI DA CUCINA") value = 1;
        else if (necessario === "SACCHETTO DI FARINA") value = 1;
        break;
      }
      case "ORNAMENTI FESTIVI": {
        if (necessario === "VETRO") value = 2;
        else if (necessario === "VERNICE") value = 1;
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
