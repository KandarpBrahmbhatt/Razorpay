import axios from "axios";

function App() {

  const handlePayment = async () => {

    try {

      // CREATE ORDER
      const { data } = await axios.post(
        "http://localhost:5000/api/n/create"
      );

      const options = {

        key: "rzp_test_SojpXfzoaV3g0O",

        amount: data.amount,

        currency: data.currency,

        name: "My React Store",

        description: "Test Payment",

        order_id: data.id,

        handler: async function (response) {

          console.log(response);

          // VERIFY PAYMENT
          const verify = await axios.post(
            "http://localhost:5000/verify-payment",
            response
          );

          if (verify.data.success) {
            alert("Payment Successful");
          }

        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handlePayment}>
        Pay ₹500
      </button>
    </div>
  );
}

export default App;