import type { User, CityEvent, Task, QRChallenge, RankingUser } from '../types';

export const mockUser: User = {
  id: '1',
  firstName: 'Jan',
  lastName: 'Kowalski',
  points: 1250,
  cardNumber: '9900000994779',
  avatar: undefined,
};

export const mockEvents: CityEvent[] = [
  {
    id: '1',
    title: 'Jarmark Bożonarodzeniowy',
    date: '2025-12-15',
    location: 'Manufaktura',
    description: 'Świąteczny jarmark z lokalnymi produktami i atrakcjami',
    points: 50,
  },
  {
    id: '2',
    title: 'Bieg Niepodległości',
    date: '2025-12-08',
    location: 'Park Poniatowskiego',
    description: 'Bieg dla całej rodziny na dystansie 5km',
    points: 100,
  },
  {
    id: '3',
    title: 'Koncert Noworoczny',
    date: '2025-12-31',
    location: 'Filharmonia Łódzka',
    description: 'Wielka Gala Sylwestrowa z orkiestrą symfoniczną',
    points: 75,
  },
  {
    id: '4',
    title: 'Koncert na Piotrkowskiej',
    date: '2025-12-20',
    location: 'Piotrkowska 104',
    description: 'Koncert uliczny z lokalnymi artystami',
    points: 40,
  },
  {
    id: '5',
    title: 'Festiwal Światła',
    date: '2025-12-28',
    location: 'Manufaktura',
    description: 'Wieczorny pokaz iluminacji i instalacji świetlnych',
    points: 60,
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Odwiedź lokalny sklep',
    description: 'Zrób zakupy w lokalnym sklepie i zeskanuj kod QR',
    points: 20,
    completed: false,
    type: 'daily',
  },
  {
    id: '2',
    title: 'Spacer po parku',
    description: 'Przejdź 5km w jednym z parków miejskich',
    points: 30,
    completed: true,
    type: 'daily',
  },
  {
    id: '3',
    title: 'Segreguj odpady',
    description: 'Zeskanuj kod QR przy punkcie segregacji',
    points: 15,
    completed: false,
    type: 'daily',
  },
  {
    id: '4',
    title: 'Weź udział w wydarzeniu',
    description: 'Uczestniczyj w jednym wydarzeniu miejskim',
    points: 100,
    completed: false,
    type: 'weekly',
  },
];

export const mockQRChallenges: QRChallenge[] = [
  {
    id: 'qr-001',
    title: 'Wyzwanie Piotrkowskiej',
    description: 'Zeskanuj wszystkie kody QR na ulicy Piotrkowskiej',
    points: 200,
    location: 'Piotrkowska',
    expiresAt: '2025-12-31',
  },
  {
    id: 'qr-002',
    title: 'Odkryj Manufakturę',
    description: 'Znajdź i zeskanuj 5 kodów QR w Manufakturze',
    points: 150,
    location: 'Manufaktura',
    expiresAt: '2025-12-20',
  },
];

export const mockRanking: RankingUser[] = [
  { id: '1', firstName: 'Anna', lastName: 'Nowak', points: 3500, rank: 1, neighborhood: 'Śródmieście' },
  { id: '2', firstName: 'Piotr', lastName: 'Wiśniewski', points: 3200, rank: 2, neighborhood: 'Bałuty' },
  { id: '3', firstName: 'Maria', lastName: 'Kowalczyk', points: 2800, rank: 3, neighborhood: 'Polesie' },
  { id: '4', firstName: 'Zbigniew', lastName: 'Nowacki', points: 1850, rank: 4, neighborhood: 'Widzew' },
  { id: '5', firstName: 'Małgorzata', lastName: 'Wojciechowska', points: 1620, rank: 5, neighborhood: 'Widzew' },
  { id: '6', firstName: 'Jan', lastName: 'Kowalski', points: 1250, rank: 6, neighborhood: 'Widzew' },
  { id: '7', firstName: 'Katarzyna', lastName: 'Zielińska', points: 1100, rank: 7, neighborhood: 'Górna' },
  { id: '8', firstName: 'Tomasz', lastName: 'Lewandowski', points: 950, rank: 8, neighborhood: 'Śródmieście' },
  { id: '9', firstName: 'Andrzej', lastName: 'Kaczmarek', points: 890, rank: 9, neighborhood: 'Widzew' },
  { id: '10', firstName: 'Ewa', lastName: 'Kamińska', points: 800, rank: 10, neighborhood: 'Bałuty' },
  { id: '11', firstName: 'Joanna', lastName: 'Mazur', points: 720, rank: 11, neighborhood: 'Widzew' },
  { id: '12', firstName: 'Michał', lastName: 'Szymański', points: 650, rank: 12, neighborhood: 'Polesie' },
];

export const neighborhoodRanking = [
  { name: 'Śródmieście', points: 45000, rank: 1 },
  { name: 'Bałuty', points: 42000, rank: 2 },
  { name: 'Polesie', points: 38000, rank: 3 },
  { name: 'Widzew', points: 35000, rank: 4 },
  { name: 'Górna', points: 32000, rank: 5 },
];
