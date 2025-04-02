import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { verifyUserPayment } from "../../Redux/Slices.jsx/RazorpaySlice";
import { getRazorpayId } from "../../Redux/Slices.jsx/RazorpaySlice";
import { purchaseCourseBundle } from "../../Redux/Slices.jsx/RazorpaySlice";
import toast from "react-hot-toast";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log()
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id,
  );
  useEffect(() => {
    //console.log(razorpayKey ," ->",subscription_id)
  }, [razorpayKey, subscription_id]);
  //console.log(razorpayKey ," ->",subscription_id)
  const userData = useSelector((state) => state?.auth?.data);
  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentverified,
  );
  const paymentDetails = {
    razorPay_payment_id: "",
    razorPay_subscription_id: "",
    razorPay_signature: "",
  };

  const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (!razorpayKey || !subscription_id) {
      toast.error("data not exist");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorPay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorPay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorPay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // redirecting the user according to the verification status
        //  console.log(isPaymentVerified);
        !isPaymentVerified
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
      config: {
        display: {
          blocks: {
            utib: {
              //name for Axis block
              name: "Pay using Axis Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["UTIB"],
                },
                {
                  method: "netbanking",
                  banks: ["UTIB"],
                },
              ],
            },
            other: {
              //  name for other block
              name: "Other Payment modes",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"],
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          hide: [
            {
              method: "upi",
            },
          ],
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false, // Should Checkout show its default blocks?
          },
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <HomeLayout>
        {/* checkout page container */}
        <form
          onSubmit={handleSubscription}
          className="min-h-[90vh] flex items-center justify-center text-white"
        >
          {/* checkout card */}
          <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
            <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
              Subscription Bundle
            </h1>

            <div className="px-4 space-y-5 text-center">
              <p className="text-[17px]">
                This purchase will allow you to access all the available courses
                of our platform for{" "}
                <span className="text-yellow-500 font-bold">
                  1 Year Duration
                </span>
                . <br />
                All the existing and new launched courses will be available to
                you in this subscription bundle
              </p>

              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                <BiRupee /> <span>499</span>only
              </p>

              <div className="text-gray-200">
                <p>100% refund at cancellation</p>
                <p>* Terms & Condition Applied</p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            >
              Buy Now
            </button>
          </div>
        </form>
      </HomeLayout>
    </>
  );
}
export default Checkout;
