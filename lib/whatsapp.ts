// TODO: replace with real Hunter.AI WhatsApp number
const WHATSAPP_NUMBER = "5511999999999";

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site e quero saber mais sobre os serviços da Hunter.AI";

export function buildWhatsAppLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
