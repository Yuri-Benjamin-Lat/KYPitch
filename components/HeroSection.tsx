export default function HeroSection() {
    return (
        <div className="w-full flex flex-col items-center 
        py-16 px-8
        md:py-32 md:px-12
        lg:py-40 lg:px-12
        ">
            <p className="text-center font-bold
            text-4xl 
            md:text-6xl 
            lg:text-7xl
            ">
                Know Your Pitch
            </p>

            <p className="text-center font-normal 
            text-base mt-1
            md:text-2xl md:mt-2
            lg:text-3xl lg:mt-3
            ">
                The simplest way to level up your pitch accuracy
            </p>
        </div>
    );
}
