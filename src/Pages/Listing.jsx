import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { BeatLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";

export default function Listing() {
  const [listing, setLIsting] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLIsting(docSnap.data());
        console.log(docSnap.data().imgUrls);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
        <BeatLoader
          size={"30px"}
          color="#ef5e4e"
          cssOverride={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <main className="container mx-auto">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        autoplay={{ delay: 1000 }}
      >
        {listing.imgUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Listing Image ${index + 1}`}
                className="w-full h-[300px] object-fit"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}
