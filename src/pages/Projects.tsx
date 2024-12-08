import React from 'react'; 
import { Content } from 'antd/es/layout/layout';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import Title from 'antd/es/typography/Title';
import ProjectCard from '../components/project/ProjectCard';

export default function Projects() {

  const projects = [
    {
      title: "10 Pomysłów na pierwszy programistyczny projekt",
      image: project1,
      content: "Zastanawiasz się, jak zacząć swoją przygodę z programowaniem? Ten artykuł to idealny przewodnik dla początkujących! Znajdziesz tutaj inspiracje na projekty, które pomogą Ci zbudować solidne fundamenty w kodowaniu. Od prostych aplikacji kalkulatorowych po bardziej zaawansowane menedżery zadań – to wszystko czeka na Ciebie. Nie tylko zdobędziesz praktyczne umiejętności, ale także zwiększysz swoją pewność siebie jako programista.",
      author: "Magda Kodziara",
      date: "2024-12-01"
    },
    {
      title: "Software developing, czy jest?",
      image: project2,
      content: "Zastanawiasz się, co tak naprawdę oznacza bycie software developerem? W tym artykule wyjaśniamy, czym zajmuje się ta profesja, jakie umiejętności są potrzebne i jak można rozpocząć karierę w tej dynamicznie rozwijającej się branży. Dowiesz się, jakie narzędzia i języki programowania są najpopularniejsze, a także poznasz historie sukcesów osób, które zaczynały od zera. To przewodnik zarówno dla tych, którzy myślą o zmianie ścieżki kariery, jak i dla pasjonatów programowania.",
      author: "Jan Developer",
      date: "2024-11-28"
    },
    {
      title: "Najprostrze pomysły na projekt",
      image: project3,
      content: "Zastanawiasz się, jak zacząć swoją przygodę z programowaniem? Ten artykuł to idealny przewodnik dla początkujących! Znajdziesz tutaj inspiracje na projekty, które pomogą Ci zbudować solidne fundamenty w kodowaniu. Od prostych aplikacji kalkulatorowych po bardziej zaawansowane menedżery zadań – to wszystko czeka na Ciebie. Nie tylko zdobędziesz praktyczne umiejętności, ale także zwiększysz swoją pewność siebie jako programista.",
      author: "Anna Scrummowa",
      date: "2024-11-25"
    },
  ];

  return (
    <div>
      <Content style={{ padding: '20px 50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Projekty
        </Title>

        {projects.map(project => {
          return (
            <ProjectCard project={project} />
          )
        })}
      </Content>
    </div>
  )
}
