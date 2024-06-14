import { getMe } from "@/apis/auth"
import { CreateCart, fetchProductByUserId } from "@/apis/cart"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom";
import { mailService } from "../../../../server/src/lib/mail.service";
import { toast } from "sonner";

const queryClient = new QueryClient(); 


export default function Cart() {
        return (
        <QueryClientProvider client={queryClient}>
            <CartContent />
        </QueryClientProvider>
        );
    }
    
function CartContent() {
    const navigate = useNavigate()

    const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
    });

    const userId = meQuery?.data?.id;

    if(!userId){
        navigate("/login")
    }

    const { data: cartQuery} = useQuery({
        queryKey: ['carts', userId],
        queryFn: () => fetchProductByUserId(userId),
    });

    let total = 0
    if(cartQuery?.data){
        
        cartQuery?.data?.map((item: CreateCart) =>{
            total += item.price * item.quantity
        })
    }
    let includingVAT = total + 5
    
    const handleCheckout = async () =>{
        try {
            await mailService.sendMail({
                to: "trongtan.ttt0503@example.com", // Địa chỉ email người nhận
                subject: "Order Confirmation",
                html: `<h1>Thank you for your order</h1>
                       <p>Your order total is $${includingVAT}.00 USD</p>`
            });
            toast.success('The content was send to your email. !')
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <body>
                <div className="h-screen bg-[#FAF9F6] pt-20">
                    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <Link id="product-path" to="../shop">← <span>Back to shop</span></Link>

                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                            <div className="flex flex-col w-full overflow-y-auto max-h-96 bg-[#F3F4F6]">
                                {/* item list */}
                                {cartQuery?.data?.map((item: CreateCart, index: number) =>(
                                <div className="rounded-lg md:w-2/3" key={index}>
                                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item.productName}</h2>
                                        <p className="mt-1 text-xs text-gray-700">Price: ${item.price}.00</p>
                                        <p className="mt-1 text-xs text-gray-700">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                ))}
                                {/* ------------------------------------- */}
                            </div>
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${total}.00</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$5.00</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${includingVAT}.00 USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleCheckout}>Check out</button>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}