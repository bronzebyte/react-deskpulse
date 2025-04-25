import { CommonDrawer } from "@/components/common/drawer/Drawer";
import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import teamImage from "@/images/createTeam.png";
import { Plus } from "lucide-react";
import { CommonModel } from "@/components/common/modal/CommonModal";
export const TeamModal = ({ isOpen, onOpen, onClose }) => {

    return (
        <div className="w-full flex justify-center">
            <Button color="primary" className="rounded-sm" onPress={onOpen}>
                <Plus /> Create Team
            </Button>

            <CommonModel isOpen={isOpen} onClose={onClose} title={"Create a team"}>
                <Form className="w-full">
                    <ModalBody className="w-full">
                        <div className="flex p-5 justify-center gap-9 w-full">
                            <div>
                                <Image src={teamImage} />
                            </div>
                            <div>
                                <p>
                                    Required fields are marked with an asterisk
                                    <span className="text-red-500">*</span>
                                </p>

                                <Input
                                    name="team"
                                    type="text"
                                    label="Team Name"
                                    isRequired
                                    variant="bordered"
                                    className="my-2"
                                />
                                <Input
                                    name="team"
                                    type="select"
                                    label=" Who should be in this team?"
                                    isRequired
                                    variant="bordered"
                                    className="my-2"
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-end w-full">
                        <Button variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" className="rounded-sm">
                            Create Team
                        </Button>
                    </ModalFooter>
                </Form>
            </CommonModel>
        </div>
    );
};
