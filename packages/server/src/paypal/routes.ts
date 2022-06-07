import express from 'express';

const router = express.Router();

router.get('/paypal', (req, res) => {
  res.send({ data: { PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID } });
});

export default router;
