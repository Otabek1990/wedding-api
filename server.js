import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Body parser sozlamasi
app.use(bodyParser.json());

// Telegram API so'rovini qabul qilish va yuborish
app.post("/send-message", async (req, res) => {
  const { token, chatId, ism, status } = req.body;

  try {
    const message = `Ism: ${ism}\nObuna: ${status}`; // Xabarni birlashtirish

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message, // To'g'ri xabarni yuborish
        }),
      }
    );

    const data = await response.json();
    if (data.ok) {
      res.status(200).send("Xabar muvaffaqiyatli yuborildi!");
    } else {
      res.status(500).send(data.description);
    }
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).send("Serverda xatolik yuz berdi.");
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishga tushdi`);
});
