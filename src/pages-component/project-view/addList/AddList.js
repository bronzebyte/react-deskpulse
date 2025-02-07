import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mutate } from "swr";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AddList = ({ setColumns, projectId }) => {
    const [isAddingList, setIsAddingList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const formSchema = z.object({
        title: z.string().min(1, { message: t("addList.listTitleRequired") }),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    async function onSubmit(data) {
        const refetchData = () => {
            mutate(`/projects/${projectId}`);
        };
        setIsLoading(true);
        try {
            const response = await api.post(`/projects/${projectId}/lists`, {
                title: data?.title,
                sortOrder: "0",
            });

            const responseData = await response.data;
            if (responseData) {
                toast({ title: responseData.message, className: "bg-[#07bc0c]" });
                setColumns((prev) => ({
                    ...prev,
                    [responseData._id]: { title: data.title, tasks: [] },
                }));
                form.reset();
                refetchData();
                setIsAddingList(false);
            } else {
                toast({
                    title: responseData?.message,
                    variant: "destructive",
                });
            }
            mutate(`${API_BASE_URL}/projects/${projectId}/lists`);
        } catch (error) {
            console.log(error?.message, "error+++");
        }
    }
    return (
        <>
            {isAddingList ? (
                <div className="w-72">
                    <Card className="bg-white text-black border-0">
                        <CardContent className="p-3">
                            <Form {...form} className="mt-6">
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" className="mb-2" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button
                                            size="sm"
                                            className="bg-primary hover:bg-unset text-white"
                                            type="submit"
                                        >
                                            {t("addList.addList")}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsAddingList(false)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <Button
                    size="sm"
                    className="w-72 justify-center bg-primary hover:bg-unset text-white"
                    onClick={() => setIsAddingList(true)}
                >
                   {t("addList.addNewList")}
                </Button>
            )}
        </>
    );
};
