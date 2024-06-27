export type AnswerResponse = {
  skillId: string;
  difficulty_level: string;
  question: string;
  response: {
    response: string;
    rating: number;
  }[];
};

export type Ans<T extends AnswerResponse> = {
  skillId: T['skillId'];
  difficulty_level: T['difficulty_level'];
  question: T['question'];
  response: [
    {
      response: T['response'][number]['response'];
      rating: T['response'][number]['rating'];
    },
  ];
};
