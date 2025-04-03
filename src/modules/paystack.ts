import axios, { AxiosResponse } from "axios";
import { AlphaNumeric } from "../utils";

interface IPaymentBody {
    amount: number
    email: string
    currency?: string
    metadata?: Record<string, any>;
};

type PaystackResponse<T> = AxiosResponse<T> | undefined;

const Paystack = () => {
      const baseUrl: string = process.env.PAYSTACK_BASE_URL || ""
      const key: string = String(process.env.PAYSTACK_SK_TEST_KEY)
    
      const headersRequest = {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Authorization": `Bearer ${key}`,
      };

      const InitializePayment = async (body: IPaymentBody): Promise<PaystackResponse<any>> => {
            try {
                  const response = await axios.post(
                  `${baseUrl}/transaction/initialize`,
                  {
                        ...body,
                        reference: AlphaNumeric(20).toUpperCase()
                  },
                  { headers: headersRequest }
                  );
                  return response;
            } catch (error: any) {
                  return error.response;
            }
      };

      const VerifyPayment = async (reference: string): Promise<PaystackResponse<any>> => {
            try {
                  const response = await axios.get(
                  `${baseUrl}/transaction/verify/${reference}`,
                  { headers: headersRequest }
                  );
                  return response;
            } catch (error: any) {
                  return error.response;
            }
      };

      return { InitializePayment, VerifyPayment };
};

export default Paystack;