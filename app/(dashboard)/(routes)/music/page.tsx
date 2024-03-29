"use client";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/Heading";
import { MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { useState } from "react";

import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

const MusicPage = () => {
  const [music, setMusic] = useState<string>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submited");
    try {
      setMusic("");

      const response = await axios.post("/api/music", values);
      console.log(response);
      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      //TODO: Open Pro Model
      console.log(error);
    }
    console.log(values);
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into Music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-none
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
             "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                          focus-visible:ring-0
                          focus-visible:ring-transparent
                        "
                        disabled={isLoading}
                        placeholder="Piano Solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div
              className="p-8 rounded-lg w-full flex items-center 
            justify-center bg-muted"
            >
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No music generated!" />}
          {music && (
            <audio controls className="w-full m-8">
              <source src={music} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
