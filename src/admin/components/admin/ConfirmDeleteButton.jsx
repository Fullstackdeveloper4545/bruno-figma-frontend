import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
const ConfirmDeleteButton = ({
  onConfirm,
  entityName = "this item",
  title,
  description,
  triggerLabel = "Delete",
  confirmLabel = "Delete",
  size = "sm",
  disabled = false
}) => <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive" size={size} disabled={disabled}>
        {triggerLabel}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title || `Delete ${entityName}?`}</AlertDialogTitle>
        <AlertDialogDescription>
          {description || `This action cannot be undone. ${entityName} will be permanently deleted.`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
  onClick={() => void onConfirm()}
>
          {confirmLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
export {
  ConfirmDeleteButton
};
