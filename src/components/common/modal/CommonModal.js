import { Button, Modal, ModalContent, ModalHeader } from "@heroui/react";
import { Plus } from "lucide-react";
export const CommonModel = ({
    title,
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    children,
    size,
    ...restProps
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size={size ? size : "3xl"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        {children}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
