"use client";
import GooglePlacesSearch from "@/components/customComponents/GooglePlacesSearch";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [coordinates, setCoordinates] = useState<any>();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const addressNextBtn = async () => {
    // console.log(selectedAddress, coordinates);
    setLoader(true);

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress?.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoader(false);
      toast({
        title: "Success",
        description: "Address added successfully!",
      });
      console.log(data);
      router.replace("edit-listing/" + data[0]?.id);
    }
    if (error) {
      setLoader(false);
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
      console.error("error", error);
    }
  };
  return (
    <div className="page_screen flex justify-center items-center">
      <div className="w-4/5 md:w-1/2 border rounded-sm p-6 flex flex-col items-center justify-start min-h-[70%] gap-2 mx-auto ">
        <h2 className="font-bold text-3xl">Add New Listing</h2>
        <p className="mb-4 text-sm">Enter address which you want to list.</p>
        <GooglePlacesSearch
          coordinates={(value: any) =>
            setCoordinates({ lat: value.lat, lng: value.lng })
          }
          selectedAddress={(value: any) => setSelectedAddress(value)}
        />
        <Button
          disabled={!selectedAddress || !coordinates}
          onClick={addressNextBtn}
          className="w-full"
        >
          {loader ? <Loader2 className="animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default page;
