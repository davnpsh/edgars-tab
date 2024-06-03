import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

enum ActionButton {
  DELETE,
  SUBMIT,
}

const formSchema = z.object({
  description: z.string().min(2).max(50),
  price: z.coerce.number().gte(0),
  amt: z.coerce.number().gte(0),
});

const formatters = {
  DESCRIPTION: (description: string) => description.toUpperCase(),
  PRICE: (price: number) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }),
};

interface ItemProps {
  id: number;
  description: string;
  price: number;
  amt: number;
  signalRefresh: () => void;
}

export default function Item({
  id,
  description,
  price,
  amt,
  signalRefresh,
}: ItemProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pressedButton, setPressedButton] = useState<ActionButton | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Prevent closing of Dialog when loading
  function onDialogOpenChange() {
    if (loading && dialogOpen) {
      return;
    }
    setDialogOpen(!dialogOpen);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
      price: price,
      amt: amt,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Mark as pressed button
    setPressedButton(ActionButton.SUBMIT);

    try {
      const res = await fetch(`/api/receipt/item/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          description: values.description,
          price: values.price,
          amount: values.amt,
        }),
      });

      if (res.ok) {
        signalRefresh();
      }
    } catch (error) {
      console.error("Error trying to update item: ", error);
    }

    setLoading(false);
    // Release
    setPressedButton(null);
  }

  function onDelete() {
    setLoading(true);
    // Mark as pressed button
    setPressedButton(ActionButton.DELETE);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <tr className="hover:bg-yellow-300 cursor-pointer">
          <td className="text-left align-top">{id}</td>
          <td className="text-left align-top">
            {formatters.DESCRIPTION(description)}
          </td>
          <td className="text-right align-top">{formatters.PRICE(price)}</td>
          <td className="text-right align-top">{amt}</td>
        </tr>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modify item</DialogTitle>
          <DialogDescription>Change information of the item</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amt"
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={loading && true}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
                disabled={loading && true}
              >
                {loading && pressedButton === ActionButton.DELETE && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
              <Button type="submit" disabled={loading && true}>
                {loading && pressedButton === ActionButton.SUBMIT && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
