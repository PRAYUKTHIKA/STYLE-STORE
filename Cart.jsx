import React from 'react';
import { X, CreditCard, QrCode, Banknote } from 'lucide-react';

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  const [details, setDetails] = React.useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [paymentMode, setPaymentMode] = React.useState('card');
  const [showQR, setShowQR] = React.useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-4 border-b"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">₹{item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onCheckout(details, paymentMode);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={details.fullName}
                    onChange={(e) =>
                      setDetails({ ...details, fullName: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={details.city}
                    onChange={(e) =>
                      setDetails({ ...details, city: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={details.postalCode}
                    onChange={(e) =>
                      setDetails({ ...details, postalCode: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Payment Mode</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMode('card');
                          setShowQR(false);
                        }}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 ${
                          paymentMode === 'card'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <CreditCard className={`h-6 w-6 ${
                          paymentMode === 'card' ? 'text-blue-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMode('qr');
                          setShowQR(true);
                        }}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 ${
                          paymentMode === 'qr'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <QrCode className={`h-6 w-6 ${
                          paymentMode === 'qr' ? 'text-blue-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm">QR Code</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMode('cash');
                          setShowQR(false);
                        }}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 ${
                          paymentMode === 'cash'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <Banknote className={`h-6 w-6 ${
                          paymentMode === 'cash' ? 'text-blue-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm">Cash</span>
                      </button>
                    </div>

                    {showQR && (
                      <div className="mt-4 p-4 border rounded-lg bg-white">
                        <div className="aspect-square w-full max-w-[200px] mx-auto bg-white p-4">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payment.example.com/pay"
                            alt="Payment QR Code"
                            className="w-full h-full"
                          />
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                          Scan to pay ₹{total.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-semibold">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                      {paymentMode === 'qr' ? 'Confirm Payment' : 'Proceed to Checkout'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}