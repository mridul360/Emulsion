const WHATSAPP_NUMBER = "15551234567";

export function openWhatsApp(items, customer = {}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const lines = items.map(
    (item) =>
      `• ${item.name} x${item.quantity} — $${item.price * item.quantity}`,
  );
  const message = `Hello Emulsion Bakery! I would like to place an order:\n\n${lines.join("\n")}\n\nTotal: $${total}\n\nName: ${customer.name || customer.contact || "Not provided"}\nPhone: ${customer.phone || "Not provided"}\nAddress: ${customer.address || "Not provided"}\nNote: ${customer.note || "No note"}\n\nPlease let me know the next steps.`;
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}
