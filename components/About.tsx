export default function About() {
    return (
        <div id="about" className="w-full flex flex-col items-center py-16 px-8 md:py-32 md:px-12 lg:py-40 lg:px-12">

            <p className="font-semibold tracking-widest uppercase text-accent text-xs md:text-sm lg:text-sm">
                What is KYPitch?
            </p>

            <p className="font-bold leading-tight mt-4 text-2xl md:text-4xl lg:text-5xl">
                About
            </p>

            <p className="text-center font-normal opacity-70 max-w-2xl mt-6 text-base md:text-xl lg:text-2xl">
                Know Your Pitch helps you learn and recognize musical notes through fun, semi-competitive gameplay. Train your ear, test your accuracy, and challenge yourself to beat your best scores as you grow more confident in identifying pitches.
            </p>

            <p className="font-semibold max-w-2xl w-full mt-10 text-base md:text-xl lg:text-2xl md:mt-12">
                What KYPitch offers:
            </p>

            <ul className="font-normal max-w-2xl w-full mt-4 space-y-3 text-base md:text-xl lg:text-2xl">
                <li><span className="font-bold">✔ Pitch Training</span> – Learn to recognize and match musical notes accurately.</li>
                <li><span className="font-bold">✔ Note Practice</span> – Improve your ability to identify and recall individual notes.</li>
                <li><span className="font-bold">✔ Music Theory Basics</span> – Understand essentials like note names, octaves, and how pitches relate.</li>
                <li><span className="font-bold">✔ Game-Based Learning</span> – Sharpen your ear through fun, interactive, semi-competitive challenges.</li>
                <li><span className="font-bold">✔ Leaderboards</span> – Track your progress, compare scores, and push yourself to climb the ranks.</li>
            </ul>

        </div>
    );
}