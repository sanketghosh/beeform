"use client";

// packages
import {
  CircleCheckIcon,
  CircleIcon,
  Loader2Icon,
  MarsIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  VenusIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { cn } from "@/lib/utils";
import {
  UserInformationSchema,
  UserInformationSchemaType,
} from "@/app/(main)/provide-information/_schemas";
import {
  ActivityLevelCategory,
  BodyFatCategory,
  FitnessGoalCategory,
} from "@/app/(main)/provide-information/_constants";
import {
  HandleMetricsDataType,
  HandleMetricsValueSliderType,
} from "@/app/(main)/provide-information/_types";
import { metricsLimits } from "@/app/(main)/provide-information/_utils/metrics-limits";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { addPersonalInfoAction } from "../_actions/add-personal-info-action";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function PersonalInfoForm() {
  const [selectedBodyFatCategory, setSelectedBodyFatCategory] = useState<
    UserInformationSchemaType["bodyFatCategory"] | null
  >(null);
  const [selectedFitnessGoalCategory, setSelectedFitnessGoalCategory] =
    useState<UserInformationSchemaType["fitnessGoal"] | null>(null);
  const [selectedActivityLevelCategory, setSelectedActivityLevelCategory] =
    useState<UserInformationSchemaType["activityLevel"] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<UserInformationSchemaType>({
    resolver: zodResolver(UserInformationSchema),
    defaultValues: {
      name: "",
      age: 20, // Initialize age in defaultValues
      sex: undefined,
      height: 175,
      weight: 65,
      usedMeasuringTape: false,
      neck: 20,
      waist: 50,
      bodyFatCategory: undefined,
      fitnessGoal: undefined,
      workoutDays: 1,
      activityLevel: undefined,
    },
  });

  const age = form.watch("age");
  const sex = form.watch("sex");
  const height = form.watch("height");
  const weight = form.watch("weight");
  const usedMeasuringTape = form.watch("usedMeasuringTape");
  const neck = form.watch("neck");
  const waist = form.watch("waist");
  const workoutDays = form.watch("workoutDays");

  const handleIncreaseMetrics = ({
    name,
    valueProp,
  }: HandleMetricsDataType) => {
    const { max } = metricsLimits[name];
    form.setValue(name, Math.min(valueProp + 1, max));
  };

  const handleDecreaseMetrics = ({
    name,
    valueProp,
  }: HandleMetricsDataType) => {
    const { min } = metricsLimits[name];
    form.setValue(name, Math.max(valueProp - 1, min));
  };

  const handleMetricsValueSliderChange = ({
    name,
    value,
  }: HandleMetricsValueSliderType) => {
    form.setValue(name, value[0]);
  };

  const handleSexChange = (value: "Male" | "Female") => {
    form.setValue("sex", value);
  };

  const handleBodyFatCategorySelect = (
    category: UserInformationSchemaType["bodyFatCategory"],
  ) => {
    setSelectedBodyFatCategory(category);
    form.setValue("bodyFatCategory", category);
  };

  const handleFitnessGoalCategorySelect = (
    category: UserInformationSchemaType["fitnessGoal"],
  ) => {
    setSelectedFitnessGoalCategory(category);
    form.setValue("fitnessGoal", category);
  };

  const handleActivityLevelCategorySelect = (
    category: UserInformationSchemaType["activityLevel"],
  ) => {
    setSelectedActivityLevelCategory(category);
    form.setValue("activityLevel", category);
  };

  const handleGenerateData = async (data: UserInformationSchemaType) => {
    startTransition(async () => {
      const result = await addPersonalInfoAction(data);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        // router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.error,
        });
      }
    });
  };

  const handleResetForm = () => {
    setSelectedBodyFatCategory(null);
    setSelectedFitnessGoalCategory(null);
    setSelectedActivityLevelCategory(null);
    form.reset();
    toast({
      title: "Success!",
      description: "Form has been reset.",
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGenerateData)}
          className="space-y-12"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>User's full name is required.</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* AGE  */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How old are you ? (In Years) </FormLabel>
                <FormControl>
                  <div className="w-72 space-y-6">
                    <div className="flex items-center gap-6 font-bold">
                      <Button
                        disabled={isPending}
                        size={"icon"}
                        variant={"secondary"}
                        type="button"
                        onClick={() =>
                          handleDecreaseMetrics({
                            name: "age",
                            valueProp: age,
                          })
                        }
                      >
                        <MinusIcon />
                      </Button>

                      <span className="flex w-10 items-center justify-center text-4xl">
                        {age}
                      </span>

                      <Button
                        disabled={isPending}
                        size={"icon"}
                        variant={"secondary"}
                        type="button"
                        onClick={() =>
                          handleIncreaseMetrics({
                            name: "age",
                            valueProp: age,
                          })
                        }
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <Slider
                      disabled={isPending}
                      min={10}
                      max={100}
                      step={1}
                      value={[age]}
                      onValueChange={(value) =>
                        handleMetricsValueSliderChange({
                          name: "age",
                          value,
                        })
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* SEX */}
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you a male or female ?</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      role="button"
                      className={cn(
                        "flex w-full flex-col items-center space-y-1 rounded-xl border-2 p-4 hover:bg-secondary/30",
                        sex === "Male" &&
                          "border-indigo-700/70 bg-indigo-500/20",
                      )}
                      onClick={() => handleSexChange("Male")}
                    >
                      <MarsIcon size={30} />
                      <p className="text-lg font-medium">Male</p>
                    </div>
                    <div
                      role="button"
                      className={cn(
                        "flex w-full flex-col items-center space-y-1 rounded-xl border p-4 hover:bg-secondary/30",
                        sex === "Female" &&
                          "border-indigo-700/70 bg-indigo-500/20",
                      )}
                      onClick={() => handleSexChange("Female")}
                    >
                      <VenusIcon size={30} />
                      <p className="text-lg font-medium">Female</p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* HEIGHT */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How tall are you ? (In centimeter)</FormLabel>
                  <FormControl>
                    <div className="w-72 space-y-6">
                      <div className="flex items-center gap-6 font-bold">
                        <Button
                          disabled={isPending}
                          size={"icon"}
                          variant={"secondary"}
                          type="button"
                          onClick={() =>
                            handleDecreaseMetrics({
                              name: "height",
                              valueProp: height,
                            })
                          }
                        >
                          <MinusIcon />
                        </Button>

                        <span className="flex w-10 items-center justify-center text-4xl">
                          {height}
                        </span>

                        <Button
                          disabled={isPending}
                          size={"icon"}
                          variant={"secondary"}
                          type="button"
                          onClick={() =>
                            handleIncreaseMetrics({
                              name: "height",
                              valueProp: height,
                            })
                          }
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <Slider
                        disabled={isPending}
                        min={70}
                        max={400}
                        step={1}
                        value={[height]}
                        onValueChange={(value) =>
                          handleMetricsValueSliderChange({
                            name: "height",
                            value,
                          })
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* WEIGHT */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your weight ? (In KG)</FormLabel>
                  <FormControl>
                    <div className="w-72 space-y-6">
                      <div className="flex items-center gap-6 font-bold">
                        <Button
                          disabled={isPending}
                          size={"icon"}
                          variant={"secondary"}
                          type="button"
                          onClick={() =>
                            handleDecreaseMetrics({
                              name: "weight",
                              valueProp: weight,
                            })
                          }
                        >
                          <MinusIcon />
                        </Button>

                        <span className="flex w-10 items-center justify-center text-4xl">
                          {weight}
                        </span>

                        <Button
                          disabled={isPending}
                          size={"icon"}
                          variant={"secondary"}
                          type="button"
                          onClick={() =>
                            handleIncreaseMetrics({
                              name: "weight",
                              valueProp: weight,
                            })
                          }
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <Slider
                        disabled={isPending}
                        min={15}
                        max={700}
                        step={1}
                        value={[weight]}
                        onValueChange={(value) =>
                          handleMetricsValueSliderChange({
                            name: "weight",
                            value,
                          })
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="usedMeasuringTape"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a measuring tape ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue="false"
                    className="flex items-center space-x-6"
                    onValueChange={(val) => field.onChange(val === "true")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {usedMeasuringTape ? (
            <div className="space-y-12">
              <div className="space-y-3">
                <h1 className="text-lg font-semibold md:text-xl">
                  What's is current body fat percentage ?
                </h1>
                <p className="font-medium leading-tight text-muted-foreground">
                  To accurately determine your body fat percentage, we require
                  two measurements: your neck size and waist size. These
                  essential measurements enable us to calculate your body fat
                  percentage.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* neck */}
                <FormField
                  control={form.control}
                  name="neck"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Neck (In centimeter)</FormLabel>
                      <FormControl>
                        <div className="w-72 space-y-6">
                          <div className="flex items-center gap-6 font-bold">
                            <Button
                              disabled={isPending}
                              size={"icon"}
                              variant={"secondary"}
                              type="button"
                              onClick={() =>
                                handleDecreaseMetrics({
                                  name: "neck",
                                  valueProp: neck,
                                })
                              }
                            >
                              <MinusIcon />
                            </Button>

                            <span className="flex w-10 items-center justify-center text-4xl">
                              {neck}
                            </span>

                            <Button
                              disabled={isPending}
                              size={"icon"}
                              variant={"secondary"}
                              type="button"
                              onClick={() =>
                                handleIncreaseMetrics({
                                  name: "neck",
                                  valueProp: neck,
                                })
                              }
                            >
                              <PlusIcon />
                            </Button>
                          </div>
                          <Slider
                            disabled={isPending}
                            min={10}
                            max={100}
                            step={1}
                            value={[neck]}
                            onValueChange={(value) =>
                              handleMetricsValueSliderChange({
                                name: "neck",
                                value,
                              })
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* waist */}
                <FormField
                  control={form.control}
                  name="waist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waist (In centimeter)</FormLabel>
                      <FormControl>
                        <div className="w-72 space-y-6">
                          <div className="flex items-center gap-6 font-bold">
                            <Button
                              disabled={isPending}
                              size={"icon"}
                              variant={"secondary"}
                              type="button"
                              onClick={() =>
                                handleDecreaseMetrics({
                                  name: "waist",
                                  valueProp: waist,
                                })
                              }
                            >
                              <MinusIcon />
                            </Button>

                            <span className="flex w-10 items-center justify-center text-4xl">
                              {waist}
                            </span>

                            <Button
                              disabled={isPending}
                              size={"icon"}
                              variant={"secondary"}
                              type="button"
                              onClick={() =>
                                handleIncreaseMetrics({
                                  name: "waist",
                                  valueProp: waist,
                                })
                              }
                            >
                              <PlusIcon />
                            </Button>
                          </div>
                          <Slider
                            disabled={isPending}
                            min={30}
                            max={350}
                            step={1}
                            value={[weight]}
                            onValueChange={(value) =>
                              handleMetricsValueSliderChange({
                                name: "weight",
                                value,
                              })
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="bodyFatCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Fat Category</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {BodyFatCategory.map((item) => (
                        <button
                          type="button"
                          disabled={isPending}
                          key={item.label}
                          className={cn(
                            "flex w-full cursor-pointer select-none items-center gap-4 rounded-xl border-2 p-4 hover:bg-secondary/30 disabled:bg-opacity-20",
                            selectedBodyFatCategory === item.label &&
                              "border-indigo-700/70 bg-indigo-500/20",
                          )}
                          onClick={() =>
                            handleBodyFatCategorySelect(
                              item.label as UserInformationSchemaType["bodyFatCategory"],
                            )
                          }
                        >
                          {selectedBodyFatCategory === item.label ? (
                            <CircleCheckIcon
                              size={20}
                              className="shrink-0 stroke-indigo-600 stroke-2"
                            />
                          ) : (
                            <CircleIcon
                              size={20}
                              className="shrink-0 stroke-2"
                            />
                          )}
                          <div className="flex flex-col items-start text-left">
                            <h2 className="text-sm font-semibold capitalize">
                              {item.label.replace("_", " ").toLowerCase()}
                            </h2>
                            <p className="text-sm font-medium text-muted-foreground">
                              {item.bodyFat}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* FITNESS GOAL */}
          <FormField
            control={form.control}
            name="fitnessGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your ultimate fitness goal ?</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {FitnessGoalCategory.map((item) => (
                      <button
                        type="button"
                        disabled={isPending}
                        key={item.label}
                        className={cn(
                          "flex w-full cursor-pointer select-none items-center gap-4 rounded-xl border-2 p-4 hover:bg-secondary/30 disabled:bg-opacity-20",
                          selectedFitnessGoalCategory === item.label &&
                            "border-indigo-700/70 bg-indigo-500/20",
                        )}
                        onClick={() =>
                          handleFitnessGoalCategorySelect(
                            item.label as UserInformationSchemaType["fitnessGoal"],
                          )
                        }
                      >
                        {selectedFitnessGoalCategory === item.label ? (
                          <CircleCheckIcon
                            size={20}
                            className="shrink-0 stroke-indigo-600 stroke-2"
                          />
                        ) : (
                          <CircleIcon size={20} className="shrink-0 stroke-2" />
                        )}
                        <div className="flex flex-col items-start text-left">
                          <h2 className="text-sm font-semibold capitalize">
                            {item.label.replace("_", " ").toLowerCase()}
                          </h2>
                          <p className="text-sm font-medium text-muted-foreground">
                            {item.details}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How active are you during the day ?</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {ActivityLevelCategory.map((item) => (
                      <button
                        type="button"
                        disabled={isPending}
                        key={item.label}
                        className={cn(
                          "flex w-full cursor-pointer select-none items-center gap-4 rounded-xl border-2 p-4 hover:bg-secondary/30 disabled:bg-opacity-20",
                          selectedActivityLevelCategory === item.label &&
                            "border-indigo-700/70 bg-indigo-500/20",
                        )}
                        onClick={() =>
                          handleActivityLevelCategorySelect(
                            item.label as UserInformationSchemaType["activityLevel"],
                          )
                        }
                      >
                        {selectedActivityLevelCategory === item.label ? (
                          <CircleCheckIcon
                            size={20}
                            className="shrink-0 stroke-indigo-600 stroke-2"
                          />
                        ) : (
                          <CircleIcon size={20} className="shrink-0 stroke-2" />
                        )}
                        <div className="flex flex-col items-start text-left">
                          <h2 className="text-sm font-semibold capitalize">
                            {item.label.replace("_", " ").toLowerCase()}
                          </h2>
                          <p className="text-sm font-medium text-muted-foreground">
                            {item.details}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workoutDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How many days are you willing to workout ? (Min 1 day){" "}
                </FormLabel>
                <FormControl>
                  <div className="w-72 space-y-6">
                    <div className="flex items-center gap-6 font-bold">
                      <Button
                        disabled={isPending}
                        size={"icon"}
                        variant={"secondary"}
                        type="button"
                        onClick={() =>
                          handleDecreaseMetrics({
                            name: "workoutDays",
                            valueProp: workoutDays,
                          })
                        }
                      >
                        <MinusIcon />
                      </Button>

                      <span className="flex w-10 items-center justify-center text-4xl">
                        {workoutDays}
                      </span>

                      <Button
                        disabled={isPending}
                        size={"icon"}
                        variant={"secondary"}
                        type="button"
                        onClick={() =>
                          handleIncreaseMetrics({
                            name: "workoutDays",
                            valueProp: workoutDays,
                          })
                        }
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <Slider
                      disabled={isPending}
                      min={1}
                      max={7}
                      step={1}
                      value={[workoutDays]}
                      onValueChange={(value) =>
                        handleMetricsValueSliderChange({
                          name: "workoutDays",
                          value,
                        })
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="flex items-center justify-start gap-4">
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <>
                  Generating program
                  <Loader2Icon className="animate-spin" />
                </>
              ) : (
                <>
                  Generate You Program
                  <WandSparklesIcon />
                </>
              )}
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleResetForm}
              type="button"
            >
              Reset Form <RotateCcwIcon />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
