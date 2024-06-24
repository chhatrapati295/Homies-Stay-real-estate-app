"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ParamsType {
  id: any;
}

const EditListingPage = ({ params }: { params: ParamsType }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (user) {
      verifyUserRecord();
    }
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", params?.id);
    if (data && data.length > 0) {
      setIsVerified(true);
    } else {
      router.replace("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      bedroom: "",
      bathroom: "",
      builtIn: "",
      parking: "",
      lotSize: "",
      area: "",
      price: "",
      hoa: "",
      description: "",
      propertyType: "single family house", // default value for property type
      type: "sell", // default value for radio group
    },
    validationSchema: Yup.object({
      bedroom: Yup.number().required("Required"),
      bathroom: Yup.number().required("Required"),
      builtIn: Yup.number().required("Required"),
      parking: Yup.number().required("Required"),
      lotSize: Yup.number().required("Required"),
      area: Yup.number().required("Required"),
      price: Yup.number().required("Required"),
      hoa: Yup.number().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { data, error } = await supabase
        .from("listing")
        .update(values)
        .eq("id", params.id)
        .select();
      if (data) {
        console.log(data);
        toast({ title: "Listing updated successfully" });
      }
      if (error) {
        console.log(error);
        toast({ title: "something went wrong" });
      }
    },
  });

  if (!isVerified) {
    return (
      <div className="page_screen flex gap-2  justify-center items-center text-primary text-sm font-medium">
        <Image
          src={"/logo.svg"}
          alt="loader"
          width={20}
          height={20}
          className="animate-spin"
        />{" "}
        <span className="text-gray-600">fetching your information</span>
      </div>
    );
  }
  return (
    <div className="page_screen flex justify-center items-center px-12">
      <div className="w-full  mx-auto border rounded-sm p-8 flex flex-col gap-6">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3"
        >
          <div className=" grid grid-cols-1 md:grid-cols-3  gap-x-8 gap-y-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="" className="text-gray-400 text-sm font-normal">
                Do you want to sell it or rent it?
              </Label>
              <RadioGroup
                name="type"
                defaultValue={formik.values.type}
                className="flex flex-col gap-2"
                onValueChange={(value) => formik.setFieldValue("type", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell" className="">
                    Sell
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent" id="rent" />
                  <Label htmlFor="rent" className="">
                    Rent
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="propertyType"
                className="text-gray-400 text-sm font-normal"
              >
                Property Type
              </Label>
              <Select
                name="propertyType"
                onValueChange={(value) =>
                  formik.setFieldValue("propertyType", value)
                }
                defaultValue={formik.values.propertyType}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="single family house"
                    className="hover:bg-purple-100"
                  >
                    Single Family House
                  </SelectItem>
                  <SelectItem
                    value="town house"
                    className="hover:bg-purple-100"
                  >
                    Town House
                  </SelectItem>
                  <SelectItem
                    value="group family house"
                    className="hover:bg-purple-100"
                  >
                    Group Family House
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div></div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="bedroom"
                className="text-gray-400 text-sm font-normal"
              >
                Bedroom
              </Label>
              <Input
                type="number"
                id="bedroom"
                name="bedroom"
                value={formik.values.bedroom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.12"
                className={
                  formik.touched.bedroom && formik.errors.bedroom
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.bedroom && formik.errors.bedroom ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.bedroom}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="bathroom"
                className="text-gray-400 text-sm font-normal"
              >
                Bathroom
              </Label>
              <Input
                type="number"
                id="bathroom"
                name="bathroom"
                value={formik.values.bathroom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.12"
                className={
                  formik.touched.bathroom && formik.errors.bathroom
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.bathroom && formik.errors.bathroom ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.bathroom}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="builtIn"
                className="text-gray-400 text-sm font-normal"
              >
                Built In
              </Label>
              <Input
                type="number"
                id="builtIn"
                name="builtIn"
                value={formik.values.builtIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.12"
                className={
                  formik.touched.builtIn && formik.errors.builtIn
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.builtIn && formik.errors.builtIn ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.builtIn}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="parking"
                className="text-gray-400 text-sm font-normal"
              >
                Parking
              </Label>
              <Input
                type="number"
                id="parking"
                name="parking"
                value={formik.values.parking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.12"
                className={
                  formik.touched.parking && formik.errors.parking
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.parking && formik.errors.parking ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.parking}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="lotSize"
                className="text-gray-400 text-sm font-normal"
              >
                Lot Size (Sq.Ft)
              </Label>
              <Input
                type="number"
                id="lotSize"
                name="lotSize"
                value={formik.values.lotSize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.330 Sq.Ft"
                className={
                  formik.touched.lotSize && formik.errors.lotSize
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.lotSize && formik.errors.lotSize ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.lotSize}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="area"
                className="text-gray-400 text-sm font-normal"
              >
                Area (Sq.Ft)
              </Label>
              <Input
                type="number"
                id="area"
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.330 Sq.Ft"
                className={
                  formik.touched.area && formik.errors.area
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.area && formik.errors.area ? (
                <div className="text-red-500 text-sm">{formik.errors.area}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="price"
                className="text-gray-400 text-sm font-normal"
              >
                Selling Price ($)
              </Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.100000"
                className={
                  formik.touched.price && formik.errors.price
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="hoa"
                className="text-gray-400 text-sm font-normal"
              >
                HOA (Per month in $)
              </Label>
              <Input
                type="number"
                id="hoa"
                name="hoa"
                value={formik.values.hoa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ex.100000"
                className={
                  formik.touched.hoa && formik.errors.hoa
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.hoa && formik.errors.hoa ? (
                <div className="text-red-500 text-sm">{formik.errors.hoa}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="description"
              className="text-gray-400 text-sm font-normal"
            >
              Description
            </Label>
            <Textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter more details here..."
              className={
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              type="submit"
              className="border border-primary bg-white text-primary hover:bg-gray-100"
            >
              Save
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Save & Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingPage;
