import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TextSlider = () => {
    const slides = [
        {
            title: "Start Freelancing Today",
            desc: "Join hundreds of local freelancers and grow your career with confidence.",
            cta: "Join Now",
        },
        {
            title: "Hire in Under 5 Minutes",
            desc: "Post your task, get instant offers, and hire the right freelancer fast.",
            cta: "Post a Task",
        },
        {
            title: "Trusted by 1,000+ Clients",
            desc: "Our platform has helped complete over 5,000 jobs with verified payment.",
            cta: "Explore Projects",
        },
    ];

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-8 bg-green-200 rounded-lg">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className="h-[300px] flex flex-col justify-center items-center text-center px-4 md:px-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{slide.title}</h2>
                            <p className="text-green-700 mb-6 max-w-2xl">{slide.desc}</p>
                            <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
                                {slide.cta}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TextSlider;
