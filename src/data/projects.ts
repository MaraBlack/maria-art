import { Project } from "../model/project.model";

export const projects: Project[] = [
  {
    id: 1,
    code: "001",
    title: "SKETCHBOOK",
    image: "sketchbook.jpg",
    alt: "Small  drawings  in  my sketchbook",
    type: "ART",
    date: "SINCE MAR 2022 ",
    description:
      "A  collection  of  raw  sketches and  ideas, based on sorroundings or pure immagination",
    tools: ["PENCIL", "INK", "PAPER"],
    link: "https://example.com/sketchbook",
  },
  {
    id: 2,
    code: "002",
    title: "DIGITAL",
    image: "digital.jpg",
    alt: "Digital adventure",
    type: "ART",
    date: "SINCE JAN 2017",
    description:
      "A  collection  of  digital drawings, inspired by other artists or pure imagination",
    tools: ["IPAD", "PROCREATE"],
    link: "https://example.com/tokyo",
  },
  {
    id: 3,
    code: "003",
    title: "PHOTOGRAPHY",
    image: "photography.jpg",
    alt: "Photographies  from  traveling",
    type: "TRAVEL",
    date: "SINCE JUL  2024",
    description: "Capturing  moments  from around  the  world",
    tools: ["SMARTPHONE"],
    link: "https://example.com/photography",
  },
];
