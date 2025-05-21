// Example: inside Main.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto mt-4 bg-base-200">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
            >
                <SwiperSlide>
                    <img
                        className="w-full h-[250px] md:h-[400px] object-cover"
                        src="https://play-lh.googleusercontent.com/0A7iZ8nlxYvIn9MX2vWqdPGhog39SfghxJhxSbU9-qsUCCg8ixhUW-gZhg_dNfijwpL1=w3840-h2160-rw"
                        alt="Slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-[250px] md:h-[400px] object-cover"
                        src="https://passivejournal.com/wp-content/uploads/2023/02/Untitled-design.png"
                        alt="Slide 3"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-[250px] md:h-[400px] object-cover"
                        src="https://digitaldropouts.net/wp-content/uploads/2023/07/Artboard-5@4x.png"
                        alt="Slide 4"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-[250px] md:h-[400px] object-cover"
                        src="https://futurestartup.com/wp-content/uploads/2021/04/Grameenphone-Logo.png"
                        alt="Slide 5"
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Slider;