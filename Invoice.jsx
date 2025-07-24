import React from 'react';

export function Invoice({ isOpen, onClose, items, details, paymentMode }) {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const paymentModeText = {
    card: 'Credit/Debit Card',
    qr: 'QR Code Payment',
    cash: 'Cash on Delivery',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Delivery Details:</h3>
          <p>{details.fullName}</p>
          <p>{details.address}</p>
          <p>{details.city}, {details.postalCode}</p>
          <p>Phone: {details.phone}</p>
          <p className="mt-2">Payment Method: {paymentModeText[paymentMode]}</p>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product.id} className="border-b">
                <td className="py-2">{item.product.name}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">₹{item.product.price.toFixed(2)}</td>
                <td className="text-right">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-right font-semibold py-4">
                Total:
              </td>
              <td className="text-right font-semibold">
                ₹{total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Thank you for your purchase! Your order will be delivered within 3-5 business days.
          </p>
          <button
            onClick={() => window.print()}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            ORDER PLACED SUCCEESSFULLY
          </button>
        </div>
      </div>
    </div>
  );
}