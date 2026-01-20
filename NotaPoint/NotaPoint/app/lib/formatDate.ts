
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatPriceUpdateDate(date: Date): string {
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}
