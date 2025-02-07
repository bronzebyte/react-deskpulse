import fetcher from "@/lib/fetcher";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import useSWR, { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "next-i18next";

export const GetComments = ({ selectedCardId }) => {
  const { t } = useTranslation();
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data: fetchComments } = useSWR(
    selectedCardId ? `/tickets/${selectedCardId}/comments` : null,
    fetcher
  );
  const confirmDelete = (commentId) => {
    setCommentToDelete(commentId);
    setIsAlertOpen(true);
  };
  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditText(comment.description);
  };
  const handleEditSubmit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const response = await api.put(
        `/tickets/${selectedCardId}/comments/${commentId}`,
        {
          description: editText,
        }
      );

      const responseData = response.data;
      if (responseData) {
        toast({ title: responseData?.message, className: "bg-[#07bc0c]" });
        mutate(`/tickets/${selectedCardId}/comments`);
        setEditingComment(null);
      } else {
        toast({ title: responseData?.message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    setIsAlertOpen(false);
    try {
      const response = await api.delete(
        `/tickets/${selectedCardId}/comments/${commentToDelete}`
      );

      const responseData = response.data;
      if (responseData) {
        toast({ title: responseData?.message, className: "bg-[#07bc0c]" });
        mutate(`/tickets/${selectedCardId}/comments`);
      } else {
        toast({ title: responseData?.message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <>
      <AlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        className="bg-white"
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-center">
              {t("getComments.confirmationMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              {t("getComments.cancelBtnText")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment}>
              {t("getComments.deleteBtnText")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-6 space-y-4">
        {fetchComments?.comments?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
              {item?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex gap-4 items-center">
                <p className="text-gray-900 font-medium">
                  {item?.username || "User"}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(item?.createdAt).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              {editingComment === item._id ? (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <Button
                    className="bg-primary text-white"
                    onClick={() => handleEditSubmit(item._id)}
                  >
                    {t("getComments.saveBtnText")}
                  </Button>
                  <Button
                    className="bg-gray-400 text-white"
                    onClick={() => setEditingComment(null)}
                  >
                    {t("getComments.discardChanges")}
                  </Button>
                </div>
              ) : (
                <p className="text-gray-800 text-sm mt-1 shadow p-2 border rounded">
                  {item?.description}
                </p>
              )}

              <div className="flex gap-2 mt-2">
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => handleEditComment(item)}
                >
                  {t("getComments.editBtnText")}
                </button>
                <button
                  className="text-red-600 text-sm hover:underline"
                  onClick={() => confirmDelete(item._id)}
                >
                  {t("getComments.deleteBtnText")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
