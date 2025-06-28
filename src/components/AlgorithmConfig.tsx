import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Play, RotateCcw } from "lucide-react";
import { ALGORITHM_OPTIONS, ALGORITHM_CONFIG } from "@/algorithms";

const formSchema = z.object({
  algorithm: z.string().min(1, "Please select an algorithm"),
  arraySize: z
    .number()
    .min(ALGORITHM_CONFIG.MIN_ARRAY_SIZE, "Array size must be at least 5")
    .max(ALGORITHM_CONFIG.MAX_ARRAY_SIZE, "Array size cannot exceed 1000"),
  speed: z
    .number()
    .min(ALGORITHM_CONFIG.MIN_SPEED)
    .max(ALGORITHM_CONFIG.MAX_SPEED),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues = {
  algorithm: ALGORITHM_CONFIG.DEFAULT_ALGORITHM,
  arraySize: ALGORITHM_CONFIG.DEFAULT_ARRAY_SIZE,
  speed: ALGORITHM_CONFIG.DEFAULT_SPEED,
};

const AlgorithmConfig = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const onSubmit = (data: FormData) => {
    console.log("Starting algorithm with config:", data);
  };
  const onReset = () => {
    form.reset({
      ...defaultValues,
    });
  };

  const watchedSpeed = form.watch("speed");
  const watchedArraySize = form.watch("arraySize");

  return (
    <div className="mx-auto max-w-5xl mt-5">
      <Card className="border-muted backdrop-blur-sm">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="algorithm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Algorithm</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select algorithm" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ALGORITHM_OPTIONS.map((algo) => (
                              <SelectItem key={algo.value} value={algo.value}>
                                {algo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="arraySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Array Size: {watchedArraySize}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter array size"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="speed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speed: {watchedSpeed}</FormLabel>
                        <FormControl>
                          <div className="px-2 py-4">
                            <Slider
                              min={ALGORITHM_CONFIG.MIN_SPEED}
                              max={ALGORITHM_CONFIG.MAX_SPEED}
                              step={ALGORITHM_CONFIG.SPEED_STEP}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                              className="w-full"
                            />
                          </div>
                        </FormControl>
                        <div className="flex justify-between text-xs opacity-70 px-2">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-muted justify-end">
                <Button type="submit">
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
                <Button type="button" variant="outline" onClick={onReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmConfig;
