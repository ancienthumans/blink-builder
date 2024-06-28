"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ActionGetResponse, ActionGetResponseSchema } from "@/lib/zod/action-get-response-schema";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function BlinkEditorSheetButton({
  data,
  setData,
}: {
  data: ActionGetResponse;
  setData: (data: ActionGetResponse) => void;
}) {
  const form = useForm<ActionGetResponse>({
    reValidateMode: "onChange",
    mode: "all",
    resolver: zodResolver(ActionGetResponseSchema),
    defaultValues: data,
  });

  const [newAction, setNewAction] = useState("");
  const [newInputAction, setNewInputAction] = useState({ label: "", placeholder: "" });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="h-9 w-9">
          <Pencil className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Blink Card Editor</SheetTitle>
          <SheetDescription>Fill in the details to create a new card.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(setData)} className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Icon <span className="text-muted-foreground text-xs">(Image URL)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image" {...field} />
                    </FormControl>
                    <div className="flex gap-2 items-center">
                      <Separator className="w-auto grow" />
                      <span className="text-xs text-muted-foreground">OR</span>
                      <Separator className="w-auto grow" />
                    </div>
                    <Input
                      type="file"
                      onChange={(e) => {
                        if (!e.target.files) return;
                        field.onChange(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="links.actions"
                render={({ field }) => {
                  const haveActions = field.value.some((action) => !action.parameters);

                  return (
                    <FormItem>
                      <FormLabel>Actions</FormLabel>

                      <div className="flex flex-col gap-2">
                        {!!haveActions && (
                          <div className="flex flex-wrap items-center gap-2">
                            {field.value.map((action, index) => {
                              if (action.parameters) return;
                              return (
                                <div key={index + "action"} className="flex-auto">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="w-full group">
                                        {action.label}
                                        <div className="group-hover:opacity-100 opacity-0 absolute inset-0 flex items-center justify-center bg-black/80">
                                          <Trash className="size-4" />
                                        </div>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. Once deleted, you have to
                                          manually add the action again.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => {
                                            field.onChange(
                                              field.value.filter((_, i) => i !== index)
                                            );
                                          }}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"outline"} type="button">
                              <Plus className="size-4" /> Add
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add Action</DialogTitle>
                              <DialogDescription>
                                Fill in the details to add a new action to the card.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="relative flex flex-col gap-2">
                              <Label>Button Text</Label>
                              <Input
                                placeholder="Buy 1 SOL"
                                value={newAction}
                                onChange={(e) => setNewAction(e.target.value)}
                              />
                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  disabled={!newAction}
                                  onClick={() =>
                                    field.onChange([
                                      ...field.value,
                                      { label: newAction, href: "/your-api-here" },
                                    ])
                                  }
                                >
                                  Add
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="links.actions"
                render={({ field }) => {
                  const haveActions = field.value.some((action) => !!action.parameters);

                  return (
                    <FormItem>
                      <FormLabel>Input Actions</FormLabel>

                      <div className="flex flex-col gap-2">
                        {!!haveActions &&
                          field.value.map((action, index) => {
                            if (!action.parameters) return;
                            return (
                              <div key={index + "input-action"}>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button className="group w-full relative overflow-hidden flex items-center gap-2 rounded-md border border-input-primary transition-colors focus-within:border-input-checked motion-reduce:transition-none">
                                      <input
                                        placeholder={action.parameters[0].label || ""}
                                        className="ml-4 flex-1 truncate outline-none placeholder:text-quaternary disabled:bg-primary disabled:text-tertiary"
                                      />
                                      <div className="my-1.5 mr-1.5">
                                        <Button asChild>
                                          <span>{action.label}</span>
                                        </Button>
                                      </div>
                                      <div className="group-hover:opacity-100 text-white opacity-0 absolute inset-0 flex items-center justify-center bg-black/80">
                                        <Trash className="size-4" />
                                      </div>
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. Once deleted, you have to
                                        manually add the action again.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          field.onChange(field.value.filter((_, i) => i !== index));
                                        }}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            );
                          })}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"outline"} type="button">
                              <Plus className="size-4" /> Add
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add Input Action</DialogTitle>
                              <DialogDescription>
                                Fill in the details to add a new action to the card.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="relative flex flex-col gap-2">
                              <Label>Input Placeholder Text</Label>
                              <Input
                                placeholder="Enter custom SOL amount"
                                value={newInputAction.placeholder}
                                onChange={(e) =>
                                  setNewInputAction({
                                    ...newInputAction,
                                    placeholder: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="relative flex flex-col gap-2">
                              <Label>Button Text</Label>
                              <Input
                                placeholder="Buy"
                                value={newInputAction.label}
                                onChange={(e) =>
                                  setNewInputAction({
                                    ...newInputAction,
                                    label: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  disabled={!newInputAction.label || !newInputAction.placeholder}
                                  onClick={() =>
                                    field.onChange([
                                      ...field.value,
                                      {
                                        label: newInputAction.label,
                                        href: "/your-api-here",
                                        parameters: [
                                          {
                                            name: "your-parameter-name-here",
                                            label: newInputAction.placeholder,
                                          },
                                        ],
                                      },
                                    ])
                                  }
                                >
                                  Add
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>
            <Separator />

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant={"outline"} onClick={() => form.reset(data)}>
                  Cancel
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button type="submit">Save</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
