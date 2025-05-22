import Partner from "./MainSection/Partner";
import Review from "./MainSection/Review";
import Slider from "./MainSection/Slider";
import TypewriterBanner from './TypewriterBanner';

const Main = () => {
    return (
        <div>

            <Slider></Slider>
            <TypewriterBanner></TypewriterBanner>
            <Review></Review>
            <Partner></Partner>
        </div>
    );
};

export default Main;