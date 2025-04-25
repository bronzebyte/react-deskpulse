import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
} from "@heroui/drawer";

export const CommonDrawer = ({ title, children, ...restProps }) => {
    return (
        <Drawer {...restProps}>
            <DrawerContent className="transform  translate-y-[48px] dark:text-white">
                <>
                    <DrawerHeader className="flex flex-col gap-1 font-bold text-2xl dark:text-white">
                        {title}
                    </DrawerHeader>
                    <DrawerBody className="dark:text-white">{children}</DrawerBody>
                </>
            </DrawerContent>
        </Drawer>
    );
};
