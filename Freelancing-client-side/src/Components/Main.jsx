import Featured from "./MainSection/Feature";
import Partner from "./MainSection/Partner";
import Review from "./MainSection/Review";
import Slider from "./MainSection/Slider";
import TypewriterBanner from './TypewriterBanner';

const Main = () => {
    return (
        <div>
            <Slider />
            <TypewriterBanner />
            <Featured />
            <Review />
            <Partner />
        </div>
    );
};

export default Main;
