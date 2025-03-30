export type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    profession: string;
    joined: string;
    referredBy?: string;
  };
  
  export const customers: Customer[] = [
    {
      id: "1",
      firstName: "Anna",
      lastName: "Müller",
      profession: "Ärztin",
      joined: "2021-06-01",
    },
    {
      id: "2",
      firstName: "Thomas",
      lastName: "Schmidt",
      profession: "Unternehmer",
      joined: "2021-08-15",
      referredBy: "1",
    },
    {
      id: "3",
      firstName: "Julia",
      lastName: "Klein",
      profession: "Rechtsanwältin",
      joined: "2022-02-10",
      referredBy: "1",
    },
    {
      id: "4",
      firstName: "Lukas",
      lastName: "Becker",
      profession: "Informatiker",
      joined: "2022-05-25",
      referredBy: "2",
    },
    {
      id: "5",
      firstName: "Sophie",
      lastName: "Neumann",
      profession: "Marketing Managerin",
      joined: "2022-07-01",
      referredBy: "2",
    },
    {
      id: "6",
      firstName: "Felix",
      lastName: "Wagner",
      profession: "Architekt",
      joined: "2022-08-15",
      referredBy: "3",
    },
    {
      id: "7",
      firstName: "Laura",
      lastName: "Hartmann",
      profession: "Lehrerin",
      joined: "2022-10-10",
      referredBy: "3",
    },
    {
      id: "8",
      firstName: "David",
      lastName: "Krüger",
      profession: "Ingenieur",
      joined: "2022-11-05",
      referredBy: "4",
    },
    {
      id: "9",
      firstName: "Marie",
      lastName: "Schneider",
      profession: "Designer",
      joined: "2023-01-12",
      referredBy: "5",
    },
    {
      id: "10",
      firstName: "Jan",
      lastName: "Fischer",
      profession: "Bänker",
      joined: "2023-02-22",
      referredBy: "5",
    },
    {
      id: "11",
      firstName: "Nina",
      lastName: "Wolf",
      profession: "Projektmanagerin",
      joined: "2023-03-18",
      referredBy: "6",
    },
    {
      id: "12",
      firstName: "Tobias",
      lastName: "Meier",
      profession: "IT-Berater",
      joined: "2023-05-05",
      referredBy: "6",
    },
    {
      id: "13",
      firstName: "Carla",
      lastName: "Voigt",
      profession: "Juristin",
      joined: "2023-06-20",
      referredBy: "7",
    },
    {
      id: "14",
      firstName: "Leon",
      lastName: "Hofmann",
      profession: "Medizinstudent",
      joined: "2023-07-30",
      referredBy: "8",
    },
    {
      id: "15",
      firstName: "Mira",
      lastName: "Seidel",
      profession: "Startup Gründerin",
      joined: "2023-09-10",
      referredBy: "9",
    },
  ];
  