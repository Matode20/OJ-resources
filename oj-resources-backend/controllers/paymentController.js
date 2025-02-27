import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

/**
 * @desc Initialize a Paystack payment
 * @route POST /api/payments/initialize
 */
export const initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ message: "Email and amount are required" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Convert to kobo (smallest currency unit in NGN)
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment initialization failed", error: error.message });
  }
};

/**
 * @desc Verify a Paystack payment
 * @route GET /api/payments/verify/:reference
 */
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      return res
        .status(200)
        .json({ message: "Payment successful", data: response.data.data });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment verification error", error: error.message });
  }
};
