"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type Props = {
  selectedText: string[];
  correctionHandler: ({
    values,
  }: {
    values: z.infer<typeof FormSchema>;
  }) => void;
};

export const FormSchema = z.object({
  correction: z.string(),
  grammar: z.string(),
  punctuation: z.string(),
  edit_type: z.string(),
  notes: z.string(),
});

export default function WordEditFields({
  selectedText,
  correctionHandler,
}: Props) {
  const [inputValue, setInputValue] = useState<string>(selectedText.join(" "));
  // const [editType, setEditType] = useState<string>("Replace");

  useEffect(() => {
    setInputValue(selectedText.join(" "));
  }, [selectedText]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      correction: selectedText.join(" "),
      grammar: "Spelling",
      punctuation: "No",
      edit_type: "Replace",
      notes: "",
    },
  });

  useEffect(() => {
    if (
      form.getValues("correction").includes(" ") ||
      selectedText.join(" ").length < form.getValues("correction").length
    ) {
      form.setValue("edit_type", "Insertion");
    } else {
      form.setValue("edit_type", "Replace");
    }
    // console.log(
    //   "🚀 ~ useEffect ~ selectedText.join.length :\n",
    //   selectedText.join(" ").length
    // );
    // console.log(
    //   "🚀 ~ useEffect ~ form.getValues:\n",
    //   form.getValues("correction").length
    // );
  }, [form, inputValue, selectedText]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    correctionHandler({ values: data });
    console.log(data);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>ভুল</FormLabel>
            <FormControl>
              <Input
                placeholder="Errors will show up here"
                value={selectedText?.join(" ")}
                readOnly
                disabled
              />
            </FormControl>
            <FormDescription>
              You are correcting this part of the sentence.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>ঠিক টাইপ করুন</FormLabel>
            <FormControl>
              <Textarea
                placeholder="select first"
                disabled={!selectedText.length}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  form.setValue("correction", e.target.value);
                }}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>

          <div className="flex gap-4 justify-start">
            <FormField
              control={form.control}
              name="edit_type"
              rules={{ required: false }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Edit Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={!selectedText.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select an edit type"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Replace">Replace</SelectItem>
                      <SelectItem value="Insertion">Insertion</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Auto calculated. Change it if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grammar"
              rules={{ required: false }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Grammar Error</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedText.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a grammar error type"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Spelling">Spelling</SelectItem>
                      <SelectItem value="Context">Context</SelectItem>
                      <SelectItem value="Sentence">Sentence</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    What type of grammar error did you find?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="punctuation"
              rules={{ required: false }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Punctuation Error</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedText.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a punctuation error type"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Fill in the punctuation error you found.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="notes"
              rules={{ required: false }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="যেমন: এই শব্দটি বাংলায় নেই"
                      disabled={!selectedText.length}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add extra notes if needed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Add Correction</Button>
        </form>
      </Form>
    </div>
  );
}
