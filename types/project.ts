export type Technology =
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "android"
  | "ionic"
  | "flutter"
  | "java"
  | "c"
  | "unity";

export type CodingProject = {
  featured?: boolean;
  title: string;
  thumbnail: string;
  description: string;
  link?: string;
  technology?: Technology;
  github?: string;
};
