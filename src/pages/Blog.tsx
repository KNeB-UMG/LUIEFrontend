import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Pagination, Row, Spin, Typography } from 'antd'
import Poster from '../components/poster/Poster';
import { useNextStepModal } from '../components/steps/NextStepContext';
import { UIViewProps } from '../uiConfig';
import { useNavigation } from '../components/navigation/NavigationContext';
import { NextStepModal } from '../components/steps/NextStepModal';
import { themes } from '../theme';
import StandardSpin from '../components/spin/StandardSpin';

const { Content } = Layout;
const { Title } = Typography;

export default function Blog() {

  const { open, ref } = useNextStepModal();

  const [loading, setLoading] = useState<boolean[]>([true, true, true]);

  const currentStepData: UIViewProps | null = JSON.parse(localStorage.getItem('currentStep') || 'null');

  const { isSidebar, toggleNavigation, theme } = useNavigation();

  useEffect(() => {
    if (currentStepData) {
      if (
        (isSidebar && currentStepData.nav === 'navbar') ||
        (!isSidebar && currentStepData.nav === 'sidebar')
      ) {
        toggleNavigation();
      }

      if (currentStepData.laggs) {
        const loadingDurations = loading.map(() => Math.random() * (6000 - 4000) + 4000);
        const timeouts: NodeJS.Timeout[] = [];

        loadingDurations.forEach((duration, index) => {
          const timeoutId = setTimeout(() => {
            setLoading((prev) => {
              const newLoading = [...prev];
              newLoading[index] = false;
              return newLoading;
            });
          }, duration);
          timeouts.push(timeoutId);
        });

        return () => {
          timeouts.forEach(clearTimeout);
        };
      } else {
        setLoading([false, false, false]);
      }
    }
  }, [currentStepData, isSidebar, toggleNavigation]);

  const culinaryPosts = [
    { title: "Przepis na klasyczne spaghetti", content: "Dowiedz się, jak przygotować idealne spaghetti z sosem pomidorowym.", author: "Magda Kucharz", date: "2024-12-01" },
    { title: "Sekrety idealnego ciasta drożdżowego", content: "Jak osiągnąć puszystość i miękkość w domowym cieście drożdżowym.", author: "Jan Pieczyński", date: "2024-11-28" },
    { title: "Szybkie i zdrowe śniadanie", content: "Pomysły na pełnowartościowe posiłki w 10 minut.", author: "Anna Zdrowa", date: "2024-11-25" },
    { title: "Domowe sushi krok po kroku", content: "Przewodnik po japońskiej sztuce kulinarnej.", author: "Hiroki Yamamoto", date: "2024-11-20" },
    { title: "Jak zrobić doskonałe brownie?", content: "Klasyczny przepis na wilgotne czekoladowe ciasto.", author: "Kasia Czekoladowa", date: "2024-11-15" },
    { title: "10 trików na idealne grillowanie", content: "Zostań mistrzem grilla dzięki tym prostym wskazówkom.", author: "Tomek Grillmaster", date: "2024-11-10" },
    { title: "Pierogi z różnymi farszami", content: "Tradycyjna polska potrawa w nowych odsłonach.", author: "Barbara Pierogowa", date: "2024-11-05" },
    { title: "Desery bez cukru", content: "Zdrowe alternatywy dla słodkości.", author: "Ewa Zdrowa", date: "2024-11-01" },
    { title: "Zupy świata: Pho", content: "Przepis na aromatyczną wietnamską zupę Pho.", author: "Nguyen Thi Hoa", date: "2024-10-28" },
    { title: "Jak zrobić idealne placki ziemniaczane?", content: "Przewodnik po polskim klasyku.", author: "Krzysztof Ziemniak", date: "2024-10-25" },
  ];

  const automotivePosts = [
    { title: "Jak dbać o silnik w zimie", content: "Porady na temat prawidłowej eksploatacji auta w mroźnych miesiącach.", author: "Adam Mechanik", date: "2024-12-01" },
    { title: "Najlepsze opony zimowe 2024", content: "Przegląd opon, które zapewnią bezpieczeństwo na drodze.", author: "Marta Oponka", date: "2024-11-28" },
    { title: "Historia marki Ferrari", content: "Poznaj dzieje jednej z najsłynniejszych marek motoryzacyjnych.", author: "Enzo Auto", date: "2024-11-25" },
    { title: "Jak zmniejszyć spalanie paliwa?", content: "Proste triki na oszczędność.", author: "Tomek Ekonomiczny", date: "2024-11-20" },
    { title: "Poradnik kupna używanego samochodu", content: "Na co zwrócić uwagę przy wyborze auta z drugiej ręki.", author: "Anna Sprytna", date: "2024-11-15" },
    { title: "Elektryki czy hybrydy?", content: "Przegląd technologii napędowych przyszłości.", author: "Olek Ekologiczny", date: "2024-11-10", button: <Button onClick={open} type='primary'>Kliknij mnie</Button> },
    { title: "Top 5 najdroższych samochodów świata", content: "Auta, które są symbolem luksusu.", author: "Lukasz Luksusowy", date: "2024-11-05" },
    { title: "Najlepsze aplikacje dla kierowców", content: "Sprawdź, które aplikacje mogą ułatwić codzienną jazdę.", author: "Darek Mobilny", date: "2024-11-01" },
    { title: "Jakie są różnice między SUV a crossoverem?", content: "Przewodnik po popularnych typach aut.", author: "Ela Autoekspert", date: "2024-10-28" },
    { title: "Zasady jazdy defensywnej", content: "Jak zwiększyć bezpieczeństwo na drodze?", author: "Krzysztof Kierowca", date: "2024-10-25" },
  ];

  const travelPosts = [
    { title: "10 miejsc, które warto odwiedzić w Europie", content: "Przegląd najciekawszych destynacji.", author: "Ewa Podróżniczka", date: "2024-12-01" },
    { title: "Jak tanio podróżować?", content: "Porady dla oszczędnych globtroterów.", author: "Adam Ekonomiczny", date: "2024-11-28" },
    { title: "Przygoda w Azji Południowo-Wschodniej", content: "Co zobaczyć w Tajlandii, Wietnamie i Kambodży?", author: "Magda Daleka", date: "2024-11-25" },
    { title: "Pakowanie na długą podróż", content: "Lista niezbędnych rzeczy do zabrania.", author: "Tomek Minimalista", date: "2024-11-20" },
    { title: "Najlepsze szlaki górskie w Polsce", content: "Od Tatr po Bieszczady – gdzie warto wyruszyć?", author: "Ania Góralka", date: "2024-11-15" },
    { title: "Podróż koleją Transsyberyjską", content: "Niezapomniana wyprawa przez Rosję.", author: "Janek Wschodni", date: "2024-11-10" },
    { title: "Jakie ubezpieczenie turystyczne wybrać?", content: "Poradnik dla podróżników.", author: "Ela Bezpieczna", date: "2024-11-05" },
    { title: "Najpiękniejsze plaże świata", content: "Relaks na Malediwach, Bahamach i Seszelach.", author: "Olek Tropikalny", date: "2024-11-01" },
    { title: "Zimowe atrakcje w Alpach", content: "Od nart po kuligi – co oferują Alpy?", author: "Kasia Narciarka", date: "2024-10-28" },
    { title: "Zwiedzanie USA samochodem", content: "Najlepsze trasy roadtripowe w Stanach Zjednoczonych.", author: "Krzysztof Amerykanista", date: "2024-10-25" },
  ];

  return (
    <>
      <NextStepModal ref={ref} />
      <Content style={{ padding: '20px 50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Blog
          <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Wznajdź i kliknij przycisk na jednym z blogów
          </Title>
        </Title>
        <StandardSpin spinning={loading[0]} theme={theme} >
          <Poster posts={culinaryPosts} />
        </StandardSpin>
        <StandardSpin spinning={loading[1]} theme={theme}>
          <Poster posts={automotivePosts} />
        </StandardSpin>
        <StandardSpin spinning={loading[2]} theme={theme} >
          <Poster posts={travelPosts} />
        </StandardSpin>
      </Content>
    </>
  )
}
