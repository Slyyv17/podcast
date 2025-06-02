import Header from "./header";
import Statistics from "./statistics";

export default function mainDB() {
    return (
        <main className="h-screen w-full flex items-center justify-center bg-[#131313]">
            <section className="flex flex-col justify-start items-center w-full h-full">
                <Header />
                <article>
                    <Statistics />
                </article>
            </section>
        </main>
    );
}