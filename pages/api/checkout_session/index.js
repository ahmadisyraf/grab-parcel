const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
    const { item } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                { price: item.price, quantity: item.quantity, },
            ],
            payment_method_types: ['fpx'],
            mode: "payment",
            // allow_promotion_codes: true,
            success_url: `${req.headers.origin}/request/success?status=success`,
            cancel_url: `${req.headers.origin}/request/success?status=cancel`,
        });

        res.json({ id: session.id });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
}

export default CreateStripeSession;