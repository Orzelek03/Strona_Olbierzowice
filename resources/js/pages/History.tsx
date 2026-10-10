import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Historia Parafii" />
            
            <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-center mb-8 text-stone-900 border-b border-[#cca572]/30 pb-6">
                    Historia Parafii w Olbierzowicach
                </h1>
                
                <article className="bg-white p-8 md:p-12 rounded shadow-sm border-t-4 border-[#cca572] text-stone-700 leading-relaxed text-justify space-y-6">
                    
                    <section>
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Początki parafii</h2>
                        <p>
                            Początki parafii w Olbierzowicach giną w mrokach średniowiecza. Nie zachował się dokument, który pozwalałby jednoznacznie wskazać rok jej powstania. Według tradycji początki wspólnoty sięgają XII wieku. Jest to prawdopodobne, zważywszy na rozwój sieci parafialnej na ziemi sandomierskiej w tym okresie. W średniowieczu Olbierzowice były jednym z ważniejszych ośrodków duszpasterskich na terenie dzisiejszej gminy Klimontów.
                        </p>
                        <p className="mt-4">
                            Pierwsza pewna wzmianka o parafii pochodzi z XIV wieku. Olbierzowice wymieniane są w wykazach świętopietrza z lat 1325–1327, kiedy parafia należała do diecezji krakowskiej i archidiakonatu sandomierskiego. W źródłach z tego okresu pojawia się również pleban olbierzowski. Oznacza to, że już w pierwszej połowie XIV wieku istniała tutaj dobrze zorganizowana wspólnota parafialna.
                        </p>
                        <p className="mt-4">
                            Najstarszym zachowanym dokumentem przechowywanym w Archiwum Diecezjalnym, związanym z parafią, jest akt z 1418 roku. Dotyczy on sporu o wymiar dziesięciny pomiędzy Albertem, plebanem z Olbierzowic, a Mikołajem, właścicielem Jurkowic. W XV wieku parafia obejmowała rozległy obszar. Jan Długosz w swoim monumentalnym dziele Liber beneficiorum dioecesis Cracoviensis wymienia wśród miejscowości należących wówczas do parafii m.in. Olbierzowice, Nawodzice, Jurkowice, Klimontów, Konary, Szymanowice, Pełczyce, Rybnice, Witowice i Nową Wieś. Zasięg ówczesnej parafii pokazuje, jak ważnym ośrodkiem życia religijnego były Olbierzowice.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Dawne świątynie</h2>
                        <p>
                            Pierwszy znany kościół w Olbierzowicach był świątynią drewnianą. Według przekazów wcześniejszy kościół nosił wezwanie Matki Bożej Bolesnej i istniał do połowy XV wieku. W 1468 roku wzniesiono kolejną świątynię – drewniany kościół w stylu gotyku małopolskiego, który przetrwał ponad cztery stulecia, aż do początku XX wieku. Oficjalne materiały Diecezji Sandomierskiej wskazują właśnie rok 1468 jako datę powstania tej gotyckiej, modrzewiowej świątyni.
                        </p>
                        <p className="mt-4">
                            Kościół został zbudowany z drewna modrzewiowego na dębowych przyciesiach. Była to budowla jednoprzestrzenna, z kwadratową nawą o wymiarach około 10,5 × 10,5 metra oraz węższym, trójbocznie zamkniętym prezbiterium. Od północy znajdowała się zakrystia, a do wnętrza prowadziły dwie kruchty.
                        </p>
                        <p className="mt-4">
                            Charakterystycznym elementem świątyni był późnogotycki portal głównego wejścia, bogato zdobiony snycerką i płaskorzeźbami. Dach kościoła był dwuspadowy i kryty gontem, a nad jego bryłą wznosiła się niewielka sygnaturka zakończona krzyżem. Wewnątrz znajdowało się pięć ołtarzy. Ołtarz główny, pochodzący z 1627 roku, reprezentował styl renesansu niemieckiego i zawierał kopię obrazu Bartolomé Estebana Murilla „Matka Boska z Dzieciątkiem”.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Parafia w czasach reformacji</h2>
                        <p>
                            W drugiej połowie XVI wieku, w okresie reformacji, kościół w Olbierzowicach wraz z częścią parafii znalazł się w rękach arian. Sytuacja ta zmieniła się po nabyciu dóbr olbierzowickich przez wojewodę sandomierskiego Jana Zbigniewa Ossolińskiego w 1604 roku.
                        </p>
                        <p className="mt-4">
                            W 1620 roku Ossoliński usunął arian ze swoich dóbr, przywracając świątynię katolikom. Kilkanaście lat później, w 1632 roku, jego syn – Jerzy Ossoliński, kanclerz wielki koronny – przekazał kościół w administrację dominikanom z nowo powstałego klasztoru w Klimontowie. Od tego czasu aż do XIX wieku parafią zarządzali dominikanie. Taki stan trwał do kasaty klasztoru dominikanów w Klimontowie w 1867 roku.
                        </p>
                    </section>

                    <section className="mt-10 overflow-hidden">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Koniec starego kościoła</h2>
                        
                        {/* ZDJĘCIE Z ZEWNĄTRZ - Zmienić nazwę i upewnić się, że plik jest w public/images/ */}
                        <figure className="float-none lg:float-right lg:w-1/2 lg:ml-6 mb-6">
                            <img 
                                src="/images/Historia_1.png" 
                                alt="Stary, modrzewiowy kościół w Olbierzowicach i zwożony kamień na budowę nowego" 
                                className="w-full rounded shadow-md border-4 border-white"
                            />
                            <figcaption className="text-xs text-stone-500 italic mt-2 text-center">
                                Drewniany kościół rozebrany w 1910 r. i materiały przygotowane pod budowę obecnej świątyni.
                            </figcaption>
                        </figure>

                        <p>
                            W XIX wieku stan techniczny drewnianej świątyni stopniowo się pogarszał. Na początku XX wieku konieczne stało się podjęcie decyzji o jej rozbiórce. Już w 1898 roku parafianie jednogłośnie zdecydowali o budowie nowego, murowanego kościoła, który miał zastąpić wielowiekową drewnianą świątynię.
                        </p>
                        <p className="mt-4">
                            W 1903 roku ówczesny proboszcz, ks. Albin Chojko, zamówił projekt u architekta Stefana Lamparskiego. Ostatecznie jednak realizację nowego kościoła powierzono Stefanowi Szyllerowi – jednemu z najwybitniejszych polskich architektów przełomu XIX i XX wieku.
                        </p>
                        <p className="mt-4">
                            W 1909 roku komisja pod kierownictwem Stefana Szyllera oceniła stan starej świątyni jako krytyczny. Zdecydowano o jej rozbiórce, zalecając zachowanie cenniejszych elementów wyposażenia. Drewniany kościół rozebrano w 1910 roku. Z odzyskanego drewna wzniesiono w 1911 roku budynek wikariatu, który służył parafii aż do lat 90. XX wieku.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Budowa obecnego kościoła</h2>
                        <p>
                            Budowę nowej świątyni rozpoczęto 3 maja 1910 roku. W sierpniu tego samego roku biskup sandomierski Marian Józef Ryx dokonał uroczystego poświęcenia kamienia węgielnego. Oficjalne materiały Diecezji Sandomierskiej podają datę 20 sierpnia 1910 roku.
                        </p>
                        <p className="mt-4">
                            Prace postępowały szybko. Jeszcze przed wybuchem I wojny światowej mury doprowadzono do wysokości gzymsów i częściowo przykryto dachówką. Wybuch wojny w 1914 roku przerwał jednak budowę. Wznowiono ją dopiero w 1920 roku z inicjatywy proboszcza ks. Julian Lipińskiego.
                        </p>
                        <p className="mt-4">
                            Uroczysta konsekracja kościoła odbyła się 14 września 1935 roku. Dokonał jej biskup sandomierski Paweł Kubicki. Wraz ze świątynią konsekrowano trzy ołtarze: główny pw. św. Wawrzyńca, ołtarz Matki Bożej w kaplicy bocznej oraz ołtarz z krucyfiksem pochodzącym z Witowic.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Kościół św. Wawrzyńca</h2>
                        <p>
                            Obecna świątynia została wzniesiona w stylu neogotyckim jako monumentalna budowla trójnawowa. Do jej budowy wykorzystano około dwóch milionów cegieł pochodzących z cegielni w Rytwianach. Cokół i dolne partie murów wykonano z granitu, natomiast detale architektoniczne, m.in. odrzwia i wykończenia szkarp, z piaskowca. 
                        </p>
                        <p className="mt-4">
                            Najbardziej charakterystycznym elementem kościoła jest wysoka na 64 metry wieża, mieszcząca dzwonnicę. Dzięki swojej monumentalnej sylwetce świątynia jest widoczna z dużej odległości i należy do najbardziej rozpoznawalnych obiektów sakralnych regionu.
                        </p>
                    </section>

                    <section className="mt-10 overflow-hidden">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Zabytki dawnej świątyni</h2>
                        
                        {/* ZDJĘCIE Z WEWNĄTRZ - Zmienić nazwę i upewnić się, że plik jest w public/images/ */}
                        <figure className="float-none lg:float-left lg:w-5/12 lg:mr-6 mb-6">
                            <img 
                                src="/images/Historia_2.png" 
                                alt="Wnętrze starego kościoła drewnianego przed rozbiórką" 
                                className="w-full rounded shadow-md border-4 border-white grayscale"
                            />
                            <figcaption className="text-xs text-stone-500 italic mt-2 text-center">
                                Wnętrze drewnianej świątyni przed rozbiórką.
                            </figcaption>
                        </figure>

                        <p>
                            Z wyposażenia średniowiecznego kościoła zachowało się do naszych czasów niewiele przedmiotów. W zakrystii znajduje się m.in. malowana szafka na paramenty liturgiczne z 1688 roku oraz barokowy krucyfiks, który pierwotnie znajdował się we dworze w Witowicach.
                        </p>
                        <p className="mt-4">
                            Szczególne miejsce zajmuje późnogotycki obraz tablicowy z około 1510 roku, przedstawiający Chrystusa Bolesnego zwróconego ku Matce Bożej Bolesnej. Obraz przedstawia również portrety fundatorów oraz ich herby – Grzymała i Rawicz. Badania wykazały, że dzieło jest epitafium Jana ze Słupczy i Konar, zmarłego w 1509 roku właściciela miejscowych dóbr. Obecnie obraz znajduje się w zbiorach Muzeum Narodowego w Krakowie.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Kaplica w Nawodzicach</h2>
                        <p>
                            Ważnym miejscem życia religijnego parafii jest również Nawodzice, gdzie znajduje się filialna kaplica pw. Matki Bożej Królowej Polski. Obecna kaplica została wybudowana w 1987 roku dzięki staraniom ówczesnego proboszcza ks. Andrzeja Wołczyńskiego oraz ofiarnej pracy mieszkańców Nawodzic.
                        </p>
                        <p className="mt-4">
                            Historia religijna Nawodzic jest jednak znacznie starsza. Miejscowość ta już w średniowieczu należała do parafii w Olbierzowicach, o czym świadczą zapisy Jana Długosza.
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Parafia w XX i XXI wieku oraz Odnowienie Świątyni</h2>
                        <p>
                            W pierwszej połowie XX wieku parafia obejmowała rozległy obszar i liczyła kilka tysięcy wiernych. W 1929 roku było ich 5367. W kolejnych dziesięcioleciach parafia przechodziła zmiany organizacyjne, jednak niezmiennie pozostawała miejscem modlitwy i życia religijnego.
                        </p>
                        <p className="mt-4">
                            Od 2012 roku wnętrze kościoła poddawane jest gruntownym pracom remontowym i konserwatorskim. Wymieniono okna na aluminiowe i wykonano nowe witraże, odnowiono ołtarze, odmalowano ściany, wykonano nowe dębowe ławki oraz położono granitową posadzkę. Prace prowadzone są etapami i są wyrazem troski kolejnych pokoleń parafian o zachowanie świątyni dla przyszłych pokoleń.
                        </p>
                    </section>

                    <section className="mt-10 bg-stone-50 p-6 rounded border-l-4 border-[#cca572]">
                        <h2 className="text-xl font-bold text-stone-900 uppercase tracking-wide mb-3">Siedem wieków wspólnoty</h2>
                        <p>
                            Historia Olbierzowic to nie tylko historia kolejnych kościołów, proboszczów i wydarzeń zapisanych w dokumentach. To przede wszystkim historia ludzi, którzy przez stulecia tworzyli tę wspólnotę – modlili się w drewnianej świątyni z 1468 roku, budowali obecny kościół, troszczyli się o jego wyposażenie, przekazywali wiarę swoim dzieciom i podejmowali odpowiedzialność za parafię.
                        </p>
                        <p className="mt-4">
                            W 2026 roku parafia pw. św. Wawrzyńca w Olbierzowicach przeżywała jubileusz 700-lecia swojej historii. Dziś parafia pozostaje żywą wspólnotą, której centrum stanowi kościół św. Wawrzyńca.
                        </p>
                        <p className="mt-4 font-bold text-stone-800 italic">
                            Siedem wieków historii zobowiązuje. Przeszłość jest dziedzictwem, teraźniejszość – odpowiedzialnością, a przyszłość – zadaniem kolejnych pokoleń.
                        </p>
                    </section>
                </article>
            </div>
        </ParishLayout>
    );
}