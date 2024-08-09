import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Slider() {
  const navigate = useNavigate();
  const [listingsArr, setListingsArr] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFiveListing() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListingsArr(listings);
      setLoading(false);
    }
    fetchFiveListing();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
        <Spinner />
      </div>
    );
  }
  if (listingsArr.length === 0) {
    return <></>;
  }

  return (
    listingsArr && (
      <>
        <Swiper
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect="fade"
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          autoplay={{ delay: 3000 }}
        >
          {listingsArr.map(({ id, data }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <img
                  src={data.imgUrls[0]}
                  alt={`Listing Image `}
                  className="w-full h-[300px] object-fit"
                />
                <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                  {data.name}
                </p>
                <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === "rent" && " / month"}
                </p>
                {/* <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center, no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="w-full h-[300px] overflow-hidden"
                ></div> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
}
