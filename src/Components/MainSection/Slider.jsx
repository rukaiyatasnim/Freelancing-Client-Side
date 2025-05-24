import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';


const slides = [
    {
        title: "Start Freelancing Today",
        desc: "Join hundreds of local freelancers and grow your career with confidence.",
        link: "/auth/register",
        btn: "Join Now",
    },
    {
        title: "Hire in Under 5 Minutes",
        desc: "Post your task, get instant offers, and hire the right freelancer fast.",
        link: "/addtask",
        btn: "Post A Task",
    },
    {
        title: "Trusted by 1,000+ Clients",
        desc: "Our platform has helped complete over 5,000 jobs with verified payment.",
        link: "/browsetask",
        btn: "Explore Here",
    },
];

const TextSlider = () => (
    <div className="max-w-screen-xl mx-auto mt-8 bg-green-200 dark:bg-green-900 rounded-lg">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
        >
            {slides.map(({ title, desc, link, btn }, i) => (
                <SwiperSlide key={i}>
                    <div className="h-[300px] flex flex-col justify-center items-center text-center px-4">
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-4">{title}</h2>
                        <p className="text-green-700 dark:text-green-200 mb-6">{desc}</p>
                        <Link
                            to={link}
                            className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition"
                        >
                            {btn}
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);

export default TextSlider;
