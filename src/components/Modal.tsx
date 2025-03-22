import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: "Cart" | "View";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
            {/* Nền mờ */}
            <div 
                className={`fixed inset-0 bg-gray-800/50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} 
                aria-hidden="true"
            ></div>

            {/* Nội dung Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel 
                    className={`bg-white w-[800px] p-6 rounded shadow-lg relative transition-transform duration-500 ${
                        isOpen ? "translate-y-0" : "-translate-y-10"
                    }`}
                >
                    <Dialog.Title className="text-xl font-semibold mb-4">
                        {content === "Cart" ? "Thêm vào giỏ hàng" : "Xem chi tiết sản phẩm"}
                    </Dialog.Title>
                    <Dialog.Description>
                        {content === "Cart" 
                            ? "Sản phẩm đã được thêm vào giỏ hàng thành công!" 
                            : "Thông tin chi tiết về sản phẩm sẽ được hiển thị ở đây."}
                    </Dialog.Description>
                    <div className="flex justify-end mt-6">
                        <Button onClick={onClose} className="bg-red-500 text-white">Đóng</Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default Modal;
