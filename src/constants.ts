export const FIBONACCI = ['1', '2', '3', '5', '8', '13', '21'];
export const SIMPLE = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

type VotingOption = {
  label: string;
  values: string[];
  example: string;
}

export type VotingOptions = {
  fibonacci: VotingOption;
  simple: VotingOption;
}

export const VOTING_OPTIONS: VotingOptions = {
  fibonacci: {
    label: 'Fibonacci',
    values: FIBONACCI,
    example: FIBONACCI.join(', ')
  },
  simple: {
    label: 'Simple',
    values: SIMPLE,
    example: SIMPLE.join(', '),
  },
}
