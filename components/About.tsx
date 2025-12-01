export default function About() {
    return (
        <div id="about" className="w-full flex flex-col
        py-16 px-8
        md:py-32 md:px-12
        lg:py-40 lg:px-12
        ">
            <p className="text-center font-bold
            text-2xl
            md:text-4xl
            lg:text-5xl
            ">
                About
            </p>

            <p className="text-center text-justify font-normal
            text-sm mt-4
            md:text-xl md:mt-8
            lg:text-2xl lg:mt-8
            ">
                Know Your Pitch helps you learn and recognize musical notes through fun, semi-competitive gameplay. Train your ear, test your accuracy, and challenge yourself to beat your best scores as you grow more confident in identifying pitches.
            </p>

            <p className="text-justify font-normal
            text-sm mt-4
            md:text-xl md:mt-8
            lg:text-2xl lg:mt-8
            ">
                What <span className="font-bold">KYPitch</span> offer:
            </p>

            <ul className="text-justify font-normal
            text-sm mt-2 pl-4 pr-4
            md:text-xl md:mt-4 md:pl-8 md:pr-8
            lg:text-2xl lg:mt-4
            ">
                <li><span className="font-bold inline-block">✔ Pitch Training</span> – Learn to recognize and match musical notes accurately.</li>
                <li><span className="font-bold inline-block">✔ Note Practice</span> – Improve your ability to identify and recall individual notes.</li>
                <li><span className="font-bold inline-block">✔ Music Theory Basics</span> – Understand essentials like note names, octaves, and how pitches relate.</li>
                <li><span className="font-bold inline-block">✔ Game-Based Learning</span> – Sharpen your ear through fun, interactive, semi-competitive challenges.</li>
                <li><span className="font-bold inline-block">✔ Leaderboards</span> – Track your progress, compare scores, and push yourself to climb the ranks.</li>
            </ul>


        </div>
    );
}

/*
    Option #1

            <p className="text-justify font-normal
            text-sm mt-4
            md:text-xl md:mt-8
            lg:text-2xl lg:mt-8
            ">
                What <span className="font-bold">KYPitch</span> offer:
            </p>

            <ul className="text-justify font-normal
            text-sm mt-2 pl-4
            md:text-xl md:mt-4 md:pl-8
            lg:text-2xl lg:mt-4
            ">
                <li><span className="font-bold inline-block">✔ Pitch Training</span> – Learn to recognize and match musical notes accurately.</li>
                <li><span className="font-bold inline-block">✔ Note Practice</span> – Improve your ability to identify and recall individual notes.</li>
                <li><span className="font-bold inline-block">✔ Music Theory Basics</span> – Understand essentials like note names, octaves, and how pitches relate.</li>
                <li><span className="font-bold inline-block">✔ Game-Based Learning</span> – Sharpen your ear through fun, interactive, semi-competitive challenges.</li>
                <li><span className="font-bold inline-block">✔ Leaderboards</span> – Track your progress, compare scores, and push yourself to climb the ranks.</li>
            </ul>

*/

/*

    Option #2

            <p className="text-center font-normal
            text-sm mt-4
            md:text-xl md:mt-8
            lg:text-2xl lg:mt-8
            ">
                What <span className="font-bold">KYPitch</span> offer:
            </p>

            <ul className="text-center font-normal
            text-sm mt-2
            md:text-xl md:mt-4
            lg:text-2xl lg:mt-4
            ">
                <li className="font-bold inline-block">✔ Pitch Training</li>
                <li>Learn to recognize and match musical notes accurately.</li>
                <li><span className="font-bold inline-block mt-5">✔ Note Practice</span></li>
                <li>Improve your ability to identify and recall individual notes.</li>
                <li><span className="font-bold inline-block mt-5">✔ Music Theory Basics</span></li>
                <li>Understand essentials like note names, octaves, and how pitches relate.</li>
                <li><span className="font-bold inline-block mt-5">✔ Game-Based Learning</span></li>
                <li>Sharpen your ear through fun, interactive, semi-competitive challenges.</li>
                <li><span className="font-bold inline-block mt-5">✔ Leaderboards</span></li>
                <li>Track your progress, compare scores, and push yourself to climb the ranks.</li>
            </ul>

*/