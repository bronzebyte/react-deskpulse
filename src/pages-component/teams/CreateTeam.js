import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/common/drawer/Drawer";
import { useState } from "react";
import { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mutate } from "swr";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";

export const CreateTeam = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
      const {t}=useTranslation()
    
    const formSchema = z.object({
        title: z.string().min(1, { message: t("createTeam.titleRequired") }),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    async function onSubmit(data) {
        const token = Cookies.get('token')
        setIsLoading(true)
        try {
            const response = await fetch(`${API_BASE_URL}/teams`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: data?.title,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast({
                    title: responseData?.message,
                    variant: "destructive",
                });
            } else {
                toast({ title: t("createTeam.successMessage"), className: "bg-[#07bc0c]" });
                form.reset();
                setIsOpen(false)
            }

            mutate(`${API_BASE_URL}/teams`);
        } catch (error) {
            console.log(error?.message, "error+++");
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="bg-primary" onClick={() => setIsOpen(true)}>
                    Create Team
                </Button>
            </SheetTrigger>
            <SheetContent>
                <Form {...form} className="mt-6">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("createTeam.titleLabel")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Team title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-2">
                            <Button type="submit" className="w-full bg-primary">
                                {isLoading ? "Sending..." : t("createTeam.buttonText")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Drawer>
    );
};
